import { describe,it,expect } from 'vitest';
import { avatars,avatarCategories,getAvatar } from '@/data/avatars';
describe('Mythic identities',()=>{
 it('has all 69 unique characters across the requested categories',()=>{expect(avatars).toHaveLength(69);expect(new Set(avatars.map(a=>a.slug)).size).toBe(69);expect(avatarCategories.map(c=>avatars.filter(a=>a.category===c).length)).toEqual([10,8,10,9,6,6,4,4,10,2]);});
 it('defaults existing unassigned creators to Explorer',()=>{expect(getAvatar(null).name).toBe('Explorer');expect(getAvatar('ravana').name).toBe('Ravana');});
});