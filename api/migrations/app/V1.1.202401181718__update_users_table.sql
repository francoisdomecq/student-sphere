ALTER TABLE users DROP CONSTRAINT users_pk;
ALTER TABLE users DROP COLUMN role;
ALTER TABLE users DROP COLUMN username;
ALTER TABLE users ADD CONSTRAINT users_pk PRIMARY KEY(email);
ALTER TABLE users DROP COLUMN id;