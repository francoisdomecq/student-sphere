create table if not exists establishments
(
    id       uuid not null
    constraint establishments_pk
    primary key,
    establishment_name text,
    establishment_type text,
    establishment_city_name text,
    establishment_postal_code text
);
