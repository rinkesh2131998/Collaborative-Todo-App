-- Add function to notify a newly added row
CREATE OR REPLACE FUNCTION notify_todo_saved()
RETURNS TRIGGER AS
$$
BEGIN
   PERFORM pg_notify('TODO_SAVED', row_to_json(NEW)::text);
   RETURN NULL;
END;
$$
LANGUAGE plpgsql;

-- Add trigger for insert or update if it doesn't exist
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM   pg_trigger
    WHERE  tgname = 'todo_saved_trigger'
    ) THEN
    CREATE TRIGGER todo_saved_trigger
    AFTER INSERT OR UPDATE
    ON todo
    FOR EACH ROW
    EXECUTE PROCEDURE notify_todo_saved();
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
