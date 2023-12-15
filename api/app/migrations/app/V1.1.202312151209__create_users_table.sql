create table if not exists users
(
    id       text not null
    constraint users_pk
    primary key,
    username text,
    password text,
    email    text,
    role     text
);
