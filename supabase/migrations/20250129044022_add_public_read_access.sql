CREATE POLICY "Public read access" 
ON public.companies
FOR SELECT 
USING (true);
