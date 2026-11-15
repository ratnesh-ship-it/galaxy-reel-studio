CREATE TABLE public.brand_registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company text NOT NULL, contact_person text NOT NULL, email text NOT NULL, phone text NOT NULL,
  website text, industry text, create_types text[] NOT NULL DEFAULT '{}', budget text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.brand_registrations TO anon, authenticated;
GRANT ALL ON public.brand_registrations TO service_role;
ALTER TABLE public.brand_registrations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit brand registration" ON public.brand_registrations FOR INSERT TO anon, authenticated
  WITH CHECK (length(company) BETWEEN 1 AND 200 AND length(email) BETWEEN 3 AND 255 AND length(contact_person) BETWEEN 1 AND 200 AND length(phone) BETWEEN 3 AND 50);

CREATE TABLE public.creator_registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL, email text NOT NULL, phone text NOT NULL, location text, portfolio_url text,
  speciality text, tools text[] NOT NULL DEFAULT '{}', experience text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.creator_registrations TO anon, authenticated;
GRANT ALL ON public.creator_registrations TO service_role;
ALTER TABLE public.creator_registrations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit creator registration" ON public.creator_registrations FOR INSERT TO anon, authenticated
  WITH CHECK (length(full_name) BETWEEN 1 AND 200 AND length(email) BETWEEN 3 AND 255 AND length(phone) BETWEEN 3 AND 50);