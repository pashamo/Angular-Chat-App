CREATE TABLE
    public.users (
        id uuid not null references auth.users on delete cascade,
        full_name text NULL,
        avatar_url text NULL,
        primary key (id)
    );

ALTER TABLE public.users enable row level security;

CREATE POLICY "Users Access Profile" ON public.users FOR
select
    USING (auth.uid () = id);

CREATE POLICY "Users Update Profile" ON public.users FOR
update USING (auth.uid () = id);


-- Edge function and trigger for automated data entry

CREATE OR REPLACE FUNCTION public.user_profile()
RETURNS TRIGGER AS $$ 
BEGIN 
  INSERT INTO public.users (id, full_name, avatar_url)
  VALUES (
    NEW.id, 
    NEW.raw_user_meta_data ->> 'full_name'::TEXT, 
    NEW.raw_user_meta_data ->> 'avatar_url'::TEXT
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


CREATE TRIGGER create_user_trigger
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE procedure
public.user_profile();