CREATE TABLE
    public.chat (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        created_at timestamp DEFAULT NOW (),
        chat_text TEXT NULL,
        editable boolean DEFAULT false,
        sender uuid NOT NULL,
        
        CONSTRAINT fk_sender
            FOREIGN KEY (sender)
            REFERENCES public.users(id) 
            ON UPDATE CASCADE 
            ON DELETE CASCADE
    );

ALTER TABLE public.chat enable row level security;

CREATE POLICY "Delete by id"
ON "public"."chat"
AS PERMISSIVE
FOR DELETE
to authenticated
using (auth.uid() = sender);

CREATE POLICY "Insert by id"
ON "public"."chat"
AS PERMISSIVE
FOR INSERT
to authenticated
WITH CHECK (sender = auth.uid());

CREATE POLICY "Read by id"
ON "public"."chat"
AS PERMISSIVE
FOR SELECT
to authenticated
using (true);

CREATE POLICY "Update by id"
ON "public"."chat"
AS PERMISSIVE
FOR UPDATE
to authenticated
using (auth.uid() = sender);