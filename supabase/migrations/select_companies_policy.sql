CREATE POLICY "Select companies policy" 
ON public.companies
FOR SELECT 
USING (true);

GRANT SELECT ON ALL TABLES IN SCHEMA "public" TO authenticated;
