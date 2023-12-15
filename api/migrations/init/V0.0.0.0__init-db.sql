DO
$$
    BEGIN
        CREATE USER ${appuser} WITH ENCRYPTED PASSWORD '${apppassword}';
    EXCEPTION
        WHEN DUPLICATE_OBJECT THEN
            RAISE NOTICE 'not creating role -- it already exists';
    END
$$;

GRANT CONNECT ON DATABASE "${appdb}" TO ${appuser};
GRANT USAGE ON SCHEMA public TO ${appuser};
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO ${appuser};
GRANT ALL PRIVILEGES ON SCHEMA public TO ${appuser};
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO ${appuser};
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO ${appuser};
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO ${appuser};
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT USAGE ON SEQUENCES TO ${appuser};