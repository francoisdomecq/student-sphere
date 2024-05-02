ALTER TABLE users
DROP CONSTRAINT users_pk;

ALTER TABLE users
    ADD COLUMN username text,
    ADD COLUMN establishment_id text,
    ADD COLUMN first_name text,
    ADD COLUMN last_name text,
    ADD COLUMN id_role text;

ALTER TABLE users
    ADD CONSTRAINT fk_establishment
        FOREIGN KEY (establishment_id)
            REFERENCES establishments(establishment_id);

ALTER TABLE users
    ADD PRIMARY KEY (username, email, establishment_id);