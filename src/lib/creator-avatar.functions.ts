import { createServerFn } from '@tanstack/react-start';
import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';
import type { Database } from '@/integrations/supabase/types';

// Public display capability: callers supply a creator ID, never a storage path.
export const getCreatorAvatar = createServerFn({ method: 'GET' })
  .inputValidator((input: unknown) => z.object({ publicId: z.string().regex(/^JV-\d{4,10}$/) }).strict().parse(input))
  .handler(async ({ data }): Promise<string | null> => {
    const key = process.env['SUPABASE_PUBLISHABLE_KEY'];
    const url = process.env['SUPABASE_URL'];
    if (!key || !url) return null;
    const publicClient = createClient<Database>(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
      global: { fetch: (input, init) => {
        const headers = new Headers(init?.headers);
        if (key.startsWith('sb_') && headers.get('Authorization') === `Bearer ${key}`) headers.delete('Authorization');
        headers.set('apikey', key);
        return fetch(input, { ...init, headers });
      } },
    });
    const { data: creator, error } = await publicClient.from('public_creators')
      .select('avatar_url').eq('public_id', data.publicId).eq('is_visible', true).maybeSingle();
    if (error || !creator?.avatar_url) return null;
    // RLS-approved visible profile authorizes this exact photo, not arbitrary files.
    const { supabaseAdmin } = await import('@/integrations/supabase/client.server');
    const signed = await supabaseAdmin.storage.from('creator-avatars').createSignedUrl(creator.avatar_url, 300);
    if (signed.error || !signed.data?.signedUrl) return null;
    const browserBase = import.meta.env['VITE_SUPABASE_URL'];
    if (!browserBase) return null;
    const signedUrl = new URL(signed.data.signedUrl);
    return `${browserBase.replace(/\/$/, '')}${signedUrl.pathname}${signedUrl.search}`;
  });