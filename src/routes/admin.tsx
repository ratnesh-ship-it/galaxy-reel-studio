import { createFileRoute } from '@tanstack/react-router';
import { AdminLogin } from '@/components/admin/AdminLogin';
import { adminHead } from '@/components/admin/AdminShell';
export const Route=createFileRoute('/admin')({head:()=>adminHead('Sign in'),component:AdminLogin});
