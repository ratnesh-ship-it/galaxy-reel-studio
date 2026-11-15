ALTER TABLE public.brand_registrations ADD COLUMN mission_code text, ADD COLUMN source_page text, ADD COLUMN utm_params jsonb DEFAULT '{}'::jsonb;
ALTER TABLE public.creator_registrations ADD COLUMN mission_code text, ADD COLUMN source_page text, ADD COLUMN utm_params jsonb DEFAULT '{}'::jsonb;
CREATE UNIQUE INDEX brand_mission_code_unique ON public.brand_registrations(mission_code);
CREATE UNIQUE INDEX creator_mission_code_unique ON public.creator_registrations(mission_code);
GRANT INSERT ON public.brand_registrations, public.creator_registrations TO anon, authenticated;
GRANT ALL ON public.brand_registrations, public.creator_registrations TO service_role;