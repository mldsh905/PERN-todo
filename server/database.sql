create database perntodo;
create table todo(
    todo_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    description varchar(300) not null ,
    ts timestamp without time zone default (now() at time zone 'utc')
)