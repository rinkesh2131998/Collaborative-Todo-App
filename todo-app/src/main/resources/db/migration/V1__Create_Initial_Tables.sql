CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS todo (
    todo_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    version INTEGER DEFAULT 1 NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    status VARCHAR NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
)