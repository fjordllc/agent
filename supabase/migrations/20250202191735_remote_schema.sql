drop policy "Authenticated users can access table data" on "public"."companies";

drop policy "Select companies policy" on "public"."companies";

drop policy "Allow select for all authenticated users" on "public"."users";

alter table "public"."companies" add column "updated_at" timestamp without time zone default now();

alter table "public"."companies" add column "user_id" uuid;

alter table "public"."companies" alter column "created_at" set default now();

alter table "public"."companies" alter column "created_at" drop not null;

alter table "public"."companies" alter column "created_at" set data type timestamp without time zone using "created_at"::timestamp without time zone;

alter table "public"."companies" alter column "id" set generated always;

create policy "select_companies_policy"
on "public"."companies"
as permissive
for select
to authenticated
using (true);


create policy "Allow select for all authenticated users"
on "public"."users"
as permissive
for select
to authenticated
using ((auth.uid() = id));



