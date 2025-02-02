CREATE POLICY "Public read access" 
ON public.companies
FOR SELECT 
USING (true);

GRANT SELECT, INSERT, UPDATE ON ALL TABLES IN SCHEMA "public" TO authenticated;
