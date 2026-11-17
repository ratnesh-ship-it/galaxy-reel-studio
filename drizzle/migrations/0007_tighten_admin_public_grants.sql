REVOKE SELECT,UPDATE,DELETE ON public.creator_registrations,public.brand_registrations,public.hire_requests FROM anon;
GRANT INSERT ON public.creator_registrations,public.brand_registrations,public.hire_requests TO anon;
GRANT ALL ON public.admin_users,public.admin_activity TO service_role;