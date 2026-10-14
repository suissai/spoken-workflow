CREATE TABLE public.early_access_requests (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 name text NOT NULL CHECK (char_length(name) BETWEEN 2 AND 100),
 email text NOT NULL CHECK (char_length(email) <= 254),
 business text NOT NULL CHECK (char_length(business) BETWEEN 2 AND 120),
 segment text NOT NULL CHECK (segment IN ('commerce','professional','services','health')),
 language text NOT NULL CHECK (language IN ('pt','en')),
 consent boolean NOT NULL CHECK (consent = true),
 request_type text NOT NULL DEFAULT 'early_access' CHECK (request_type IN ('early_access','demo')),
 created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.early_access_requests TO anon, authenticated;
GRANT ALL ON public.early_access_requests TO service_role;
ALTER TABLE public.early_access_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Visitors may submit consented requests" ON public.early_access_requests FOR INSERT TO anon, authenticated WITH CHECK (consent = true);