
create table if not exists student (id serial primary key, name varchar, location varchar);

-- Below is remote wrapper configuration for shards

-- Setup built in foreign data wrapper
create extension postgres_fdw;

-- Create servers "proxies" for remote databases
create server remote_server_1 foreign data wrapper postgres_fdw options (host 'shard_1', port '5432' , dbname 'postgres');

create server remote_server_2 foreign data wrapper postgres_fdw options (host 'shard_2', port '5432' , dbname 'postgres');

-- Create user mappings for local user to remote shard user with username and password
create user mapping for postgres server remote_server_1 options (user 'postgres', password 'postgres');

create user mapping for postgres server remote_server_2 options (user 'postgres', password 'postgres');

-- Create local new schemas for 2 shards
create schema shard_1_schema;
create schema shard_2_schema;

-- Import schema 1 from remote database shard 1 into local newly created
import foreign schema public
from server remote_server_1
into shard_1_schema;

-- Import schema 2 from remote database shard 2 into local newly created
import foreign schema public
from server remote_server_2
into shard_2_schema;

-- Create foreign tables for using proxying queries to remote shards.
create foreign table student_shard_1 (check(location='london')) inherits(student) server remote_server_1;
create foreign table student_shard_2 (check(location='london')) inherits(student) server remote_server_2;