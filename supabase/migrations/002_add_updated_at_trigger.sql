-- the function that updates the timestamp
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- the trigger that calls the function on every update
create trigger set_updated_at
before update on applications
for each row
execute function update_updated_at_column();