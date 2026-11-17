import { describe, it, expect } from 'vitest';
import { steps, validateStep, missionMetadata } from '@/lib/mission';
import { budgetRanges } from '@/config/budget';
describe('Mission registration rules',()=>{
 it('has exactly eight brand steps',()=>expect(steps.brand).toHaveLength(8));
 it('has nine creator steps with avatar selection second',()=>{expect(steps.creator).toHaveLength(9);expect(steps.creator[1]?.key).toBe('avatar_slug');});
 it('requires company, contact, email and phone for brands',()=>expect(steps.brand.filter(s=>s.required).map(s=>s.key)).toEqual(['company','contact_person','email','phone']));
 it('requires private name, avatar, email and phone for creators',()=>expect(steps.creator.filter(s=>s.required).map(s=>s.key)).toEqual(['full_name','avatar_slug','email','phone']));
 it('rejects empty required answers',()=>{for(const s of [...steps.brand,...steps.creator].filter(s=>s.required))expect(validateStep(s,'')).not.toBeNull();});
 it('rejects invalid email addresses',()=>{const s=steps.brand[2];if(!s)throw Error('missing step');expect(validateStep(s,'invalid')).not.toBeNull();expect(validateStep(s,'person@example.com')).toBeNull();});
 it('validates phone country code and number',()=>{const s=steps.brand[3];if(!s)throw Error('missing step');expect(validateStep(s,'+91123')).not.toBeNull();expect(validateStep(s,'+919876543210')).toBeNull();});
 it('accepts link answers without URL format validation',()=>{for(const s of [...steps.creator,...steps.brand].filter(s=>s.kind==='url'))for(const value of ['weclickai.com','18startup.com','www.site.in','instagram.com/name','@name','anything','javascript:alert(1)'])expect(validateStep(s,value)).toBeNull();});
 it('requires a known avatar for new creator missions',()=>{const step=steps.creator[1];if(!step)throw Error('missing avatar');expect(validateStep(step,'ravana')).toBeNull();expect(validateStep(step,'not-real')).not.toBeNull();});
 it('defaults budgets to INR',()=>expect(budgetRanges.filter(v=>v!=='Not sure yet').every(v=>v.includes('₹'))).toBe(true));
 it('captures source and UTM parameters only',()=>expect(missionMetadata('/brands','?utm_source=instagram&utm_campaign=launch&email=private')).toEqual({source_page:'/brands',utm_params:{utm_source:'instagram',utm_campaign:'launch'}}));
});
