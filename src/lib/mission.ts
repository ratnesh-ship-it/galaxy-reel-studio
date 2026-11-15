import { z } from 'zod';
import { isValidPhoneNumber } from 'libphonenumber-js';
import { budgetRanges } from '@/config/budget';
import { createOptions, specialities, experienceLevels } from '@/config/forms';
export type MissionPath = 'brand' | 'creator';
export type Answers = Record<string, string | string[]>;
export type MissionStep = { key: string; question: string; label: string; kind: 'text' | 'email' | 'phone' | 'url' | 'single' | 'multi' | 'tools'; required?: boolean; options?: string[] };
export const industries = ['Fashion', 'Beauty', 'FMCG', 'Tech', 'Real Estate', 'Education', 'Healthcare', 'Food & Beverage', 'Automotive', 'Other'];
export const toolSuggestions = ['Runway', 'Kling', 'Sora', 'Veo', 'Midjourney', 'Pika', 'Luma', 'Higgsfield', 'ElevenLabs', 'Suno', 'Other'];
export const experienceDescriptions = ['Starting your creative journey.', 'Building skills and a portfolio.', 'Delivering client-ready projects.', 'Leading advanced creative productions.'];
export const steps: Record<MissionPath, MissionStep[]> = {
 brand: [
 {key:'company',question:"What's your company or brand name?",label:'Company / Brand Name',kind:'text',required:true},
 {key:'contact_person',question:'Who should our creators talk to?',label:'Contact Person',kind:'text',required:true},
 {key:'email',question:'Your business email?',label:'Business Email',kind:'email',required:true},
 {key:'phone',question:'Phone / WhatsApp?',label:'Phone / WhatsApp',kind:'phone',required:true},
 {key:'website',question:'Where can we see your brand?',label:'Website / Social Media',kind:'url'},
 {key:'industry',question:'Which industry are you in?',label:'Industry',kind:'single',options:industries},
 {key:'create_types',question:'What do you want to create?',label:'What you want to create',kind:'multi',options:createOptions},
 {key:'budget',question:'Estimated project budget?',label:'Estimated project budget',kind:'single',options:budgetRanges}],
 creator: [
 {key:'full_name',question:"What's your full name?",label:'Full Name',kind:'text',required:true},
 {key:'email',question:'Your email address?',label:'Email Address',kind:'email',required:true},
 {key:'phone',question:'Phone / WhatsApp?',label:'Phone / WhatsApp',kind:'phone',required:true},
 {key:'location',question:'Where are you based?',label:'City / Country',kind:'text'},
 {key:'portfolio_url',question:'Share your portfolio or showreel',label:'Portfolio / Showreel Link',kind:'url'},
 {key:'speciality',question:"What's your primary speciality?",label:'Primary speciality',kind:'single',options:specialities},
 {key:'tools',question:'Which AI tools do you use?',label:'AI Tools',kind:'tools',options:toolSuggestions},
 {key:'experience',question:'Your experience level?',label:'Experience level',kind:'single',options:experienceLevels}]
};
export function validateStep(step: MissionStep, value: string | string[] | undefined): string | null {
 if(step.kind === 'multi' || step.kind === 'tools') {
  const result = z.array(z.string().trim().min(1).max(40)).max(20).safeParse(value ?? []);
  return result.success ? null : 'Use up to 20 tags, each under 40 characters.';
 }
 const text = typeof value === 'string' ? value.trim() : '';
 let schema = z.string().max(step.kind === 'url' ? 500 : 200);
 if(step.required) schema = schema.min(1, 'This field is required.');
 const result = schema.safeParse(text);
 if(!result.success) return result.error.issues[0]?.message ?? 'Please check your answer.';
 if(!text) return null;
 if(step.kind === 'email' && !z.string().email().safeParse(text).success) return 'Enter a valid email address.';
 if(step.kind === 'phone' && !isValidPhoneNumber(text)) return 'Enter a valid phone number with country code.';
 if(step.kind === 'url') { try { const url = new URL(text); if(!['https:', 'http:'].includes(url.protocol)) return 'Use a https:// or http:// link.'; } catch { return 'Enter a full link, starting with https://.'; } }
 return null;
}
export function missionCode(path: MissionPath) { return `JV-${path === 'brand' ? 'BRD' : 'CRT'}-${crypto.randomUUID().slice(0,8).toUpperCase()}`; }
export function domain(value: string) { try { return new URL(value).hostname.replace(/^www\./,''); } catch { return ''; } }
export function missionMetadata(source: string, search: string) { const utm: Record<string,string> = {}; new URLSearchParams(search).forEach((v,k) => { if(k.startsWith('utm_')) utm[k] = v.slice(0,300); }); return {source_page:source,utm_params:utm}; }
