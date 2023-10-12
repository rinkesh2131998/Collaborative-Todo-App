-- Add function to notify a newly added row
CREATE OR REPLACE FUNCTION notify_todo_inserted()
RETURNS TRIGGER AS
$$
BEGIN
   PERFORM pg_notify('TODO_SAVED', row_to_json(NEW)::text);
   RETURN NULL;
END;
$$
LANGUAGE plpgsql;

-- Trigger for insertion of a row if it doesn't exist
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM   pg_trigger
    WHERE  tgname = 'todo_inserted_trigger'
    ) THEN
    CREATE TRIGGER todo_inserted_trigger
    AFTER INSERT
    ON todo
    FOR EACH ROW
    EXECUTE PROCEDURE notify_todo_inserted();
  END IF;
END $$;

-- add notification for to-do updates.
CREATE OR REPLACE FUNCTION notify_todo_updated()
RETURNS TRIGGER AS
$$
BEGIN
   PERFORM pg_notify('TODO_UPDATED', row_to_json(NEW)::text);
   RETURN NULL;
END;
$$
LANGUAGE plpgsql;

-- Trigger for update of a row if it doesn't exist
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM   pg_trigger
    WHERE  tgname = 'todo_updated_trigger'
    ) THEN
    CREATE TRIGGER todo_updated_trigger
    AFTER UPDATE
    ON todo
    FOR EACH ROW
    EXECUTE PROCEDURE notify_todo_updated();
  END IF;
END $$;



-- Add notification for deleted table rows
CREATE OR REPLACE FUNCTION notify_todo_deleted()
RETURNS TRIGGER AS
$$
BEGIN
   PERFORM pg_notify('TODO_DELETED', row_to_json(OLD)::text);
   RETURN NULL;
END;
$$
LANGUAGE plpgsql;

-- Trigger for deletion of a row if it doesn't exist
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM   pg_trigger
    WHERE  tgname = 'todo_deleted_trigger'
    ) THEN
    CREATE TRIGGER todo_deleted_trigger
    AFTER DELETE
    ON todo
    FOR EACH ROW
    EXECUTE PROCEDURE notify_todo_deleted();
  END IF;
END $$;
