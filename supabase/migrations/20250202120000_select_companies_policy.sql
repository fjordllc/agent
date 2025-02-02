CREATE POLICY "Select companies policy" 
ON public.companies
FOR SELECT 
USING (true);

GRANT SELECT ON ALL TABLES IN SCHEMA "public" TO authenticated;

-- Public read access は不要なので削除
drop policy if exists "Public read access" on "public"."companies";