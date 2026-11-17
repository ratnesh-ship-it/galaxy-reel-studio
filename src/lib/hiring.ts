import { z } from 'zod';
import { isValidPhoneNumber } from 'libphonenumber-js';
import { budgetRanges } from '@/config/budget';
export const hireSchema=z.object({brand_name:z.string().trim().min(1).max(200),contact_person:z.string().trim().min(1).max(200),business_email:z.string().email().max(200),phone:z.string().refine(isValidPhoneNumber,'Enter a valid phone number with country code.'),website:z.string().optional(),project_details:z.string().trim().min(1).max(5000),budget:z.enum(budgetRanges as [string,...string[]])});