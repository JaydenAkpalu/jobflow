-- =====================
-- Applications Table
-- =====================
create table applications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) not null,
  company_name text not null,
  job_title text not null,
  job_url text,
  location text,
  status text not null default 'applied' check (status in ('applied', 'interview', 'offer', 'rejected', 'ghosted')),
  applied_date date not null default current_date,
  notes text,
  resume_path text,
  resume_filename text,
  cover_letter_path text,
  cover_letter_filename text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- =====================
-- RLS Policies
-- =====================
create policy "Users can view own applications"
on applications for select
using (auth.uid() = user_id);

create policy "Users can insert own applications"
on applications for insert
with check (auth.uid() = user_id);

create policy "Users can update own applications"
on applications for update
using (auth.uid() = user_id);

create policy "Users can delete own applications"
on applications for delete
using (auth.uid() = user_id);

-- =====================
-- Storage Policies
-- =====================
create policy "Users can upload own files"
on storage.objects for insert
to authenticated
with check (bucket_id = 'application-files' AND auth.uid()::text = (storage.foldername(name))[1]);

create policy "Users can read own files"
on storage.objects for select
to authenticated
using (bucket_id = 'application-files' AND auth.uid()::text = (storage.foldername(name))[1]);

create policy "Users can delete own files"
on storage.objects for delete
to authenticated
using (bucket_id = 'application-files' AND auth.uid()::text = (storage.foldername(name))[1]);