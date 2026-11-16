import { describe, expect, it } from 'vitest';
import { publicCreatorFields, portfolioEmbed, safePortfolio, latestCreators, type PublicCreator } from '@/lib/creators';
import { hireSchema } from '@/lib/hiring';
describe('Public creator safety',()=>{
 it('shows exactly the latest eight creators in descending ID order',()=>{const rows=Array.from({length:12},(_,i)=>({creator_number:i+1,public_id:`JV-${String(i+1).padStart(4,'0')}`} as PublicCreator));expect(latestCreators(rows).map(c=>c.public_id)).toEqual(['JV-0012','JV-0011','JV-0010','JV-0009','JV-0008','JV-0007','JV-0006','JV-0005']);expect(rows[0]?.creator_number).toBe(1);});
 it('projects only the ten approved public fields',()=>expect(publicCreatorFields.split(',')).toEqual(['public_id','creator_number','full_name','city_country','primary_speciality','ai_tools','experience_level','portfolio_link','avatar_url','created_at']));
 it('never projects phone or email',()=>{expect(publicCreatorFields.split(',')).not.toContain('email');expect(publicCreatorFields.split(',')).not.toContain('phone');});
 it('rejects unsafe portfolio links',()=>{expect(safePortfolio('javascript:alert(1)')).toBeNull();expect(safePortfolio('https://example.com')).toBe('https://example.com/');});
 it('embeds only validated YouTube and Vimeo video IDs',()=>{expect(portfolioEmbed('https://youtu.be/dQw4w9WgXcQ')).toBe('https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ');expect(portfolioEmbed('https://vimeo.com/123456')).toBe('https://player.vimeo.com/video/123456');expect(portfolioEmbed('https://vimeo.com.evil.test/123')).toBeNull();});
 it('requires all six brand enquiry answers',()=>{const valid={brand_name:'QA Brand',contact_person:'QA Contact',business_email:'qa@example.com',phone:'+919876543210',project_details:'A product film',budget:'Under ₹1 lakh'};expect(hireSchema.safeParse(valid).success).toBe(true);for(const key of Object.keys(valid))expect(hireSchema.safeParse({...valid,[key]:''}).success).toBe(false);});
});