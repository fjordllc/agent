CREATE TABLE IF NOT EXISTS public.docs (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    body TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    user_id INT NOT NULL,
    last_updated_user_id INT
);