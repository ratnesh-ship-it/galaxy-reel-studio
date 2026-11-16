import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  maybeSingle: vi.fn(), sign: vi.fn(), bucket: vi.fn(), filters: vi.fn(),
}));
vi.mock('@tanstack/react-start', () => ({
  createServerFn: () => ({ inputValidator: (validate: (input: unknown) => unknown) => ({
    handler: (fn: (args: { data: unknown }) => unknown) => (args: { data: unknown }) => fn({ data: validate(args.data) }),
  }) }),
}));
vi.mock('@supabase/supabase-js', () => ({ createClient: () => ({
  from: () => ({ select: () => ({ eq: (...args: unknown[]) => {
    mocks.filters(...args);
    return { eq: (...args: unknown[]) => { mocks.filters(...args); return { maybeSingle: mocks.maybeSingle }; } };
  } }) }),
}) }));
vi.mock('@/integrations/supabase/client.server', () => ({ supabaseAdmin: { storage: {
  from: (bucket: string) => { mocks.bucket(bucket); return { createSignedUrl: mocks.sign }; },
} } }));
import { getCreatorAvatar } from '@/lib/creator-avatar.functions';

describe('Restricted public avatar signing', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubEnv('SUPABASE_URL', 'https://internal.example');
    vi.stubEnv('SUPABASE_PUBLISHABLE_KEY', 'sb_publishable_test');
    vi.stubEnv('VITE_SUPABASE_URL', 'https://public.example');
  });
  it('rejects paths and extra fields instead of signing caller-selected files', async () => {
    await expect(async () => getCreatorAvatar({ data: { publicId: '../private.png' } })).rejects.toThrow();
    await expect(async () => getCreatorAvatar({ data: { publicId: 'JV-0001', path: 'private.png' } } as never)).rejects.toThrow();
    expect(mocks.sign).not.toHaveBeenCalled();
  });
  it('does not sign hidden, missing, or photoless profiles', async () => {
    for (const result of [{ data: null, error: null }, { data: { avatar_url: null }, error: null }, { data: null, error: {} }]) {
      mocks.maybeSingle.mockResolvedValueOnce(result);
      expect(await getCreatorAvatar({ data: { publicId: 'JV-0001' } })).toBeNull();
    }
    expect(mocks.filters).toHaveBeenCalledWith('is_visible', true);
    expect(mocks.sign).not.toHaveBeenCalled();
  });
  it('signs only the database-linked photo for five minutes on the browser origin', async () => {
    mocks.maybeSingle.mockResolvedValue({ data: { avatar_url: 'approved.png' }, error: null });
    mocks.sign.mockResolvedValue({ data: { signedUrl: 'https://internal.example/storage/v1/object/sign/creator-avatars/approved.png?token=test' }, error: null });
    expect(await getCreatorAvatar({ data: { publicId: 'JV-0001' } })).toBe('https://public.example/storage/v1/object/sign/creator-avatars/approved.png?token=test');
    expect(mocks.filters).toHaveBeenCalledWith('public_id', 'JV-0001');
    expect(mocks.bucket).toHaveBeenCalledWith('creator-avatars');
    expect(mocks.sign).toHaveBeenCalledWith('approved.png', 300);
  });
});