import { describe, it, expect } from 'vitest';
import { steps, validateStep, missionMetadata } from '@/lib/mission';
import { budgetRanges } from '@/config/budget';
describe('Mission registration rules',()=>{
 it('has exactly eight brand steps',()=>expect(steps.brand).toHaveLength(8));
 it('has exactly eight creator steps',()=>expect(steps.creator).toHaveLength(8));
 it('requires company, contact, email and phone for brands',()=>expect(steps.brand.filter(s=>s.required).map(s=>s.key)).toEqual(['company','contact_person','email','phone']));
 it('requires name, email and phone for creators',()=>expect(steps.creator.filter(s=>s.required).map(s=>s.key)).toEqual(['full_name','email','phone']));
 it('rejects empty required answers',()=>{for(const s of [...steps.brand,...steps.creator].filter(s=>s.required))expect(validateStep(s,'')).not.toBeNull();});
 it('rejects invalid email addresses',()=>{const s=steps.brand[2];if(!s)throw Error('missing step');expect(validateStep(s,'invalid')).not.toBeNull();expect(validateStep(s,'person@example.com')).toBeNull();});
 it('validates phone country code and number',()=>{const s=steps.brand[3];if(!s)throw Error('missing step');expect(validateStep(s,'+91123')).not.toBeNull();expect(validateStep(s,'+919876543210')).toBeNull();});
 it('accepts full portfolio URLs and rejects unsafe protocols',()=>{const s=steps.creator[4];if(!s)throw Error('missing step');for(const url of ['https://youtube.com/watch?v=1','https://vimeo.com/1','https://instagram.com/example','https://behance.net/example','https://drive.google.com/file/d/1'])expect(validateStep(s,url)).toBeNull();expect(validateStep(s,'javascript:alert(1)')).not.toBeNull();});
 it('defaults budgets to INR',()=>expect(budgetRanges.filter(v=>v!=='Not sure yet').every(v=>v.includes('₹'))).toBe(true));
 it('captures source and UTM parameters only',()=>expect(missionMetadata('/brands','?utm_source=instagram&utm_campaign=launch&email=private')).toEqual({source_page:'/brands',utm_params:{utm_source:'instagram',utm_campaign:'launch'}}));
});
