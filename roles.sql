select * from pg_user;
select * from pg_roles;

create role only_read;
GRANT select on dtp to only_read;

GRANT only_read TO reader;


select pg_has_role('postgres', 'postgres');


create user reader with password 'reader'
create user editor with password 'editor'

GRANT select on dtp to reader
REVOKE select on dtp FROM reader;

drop user reader;

select * from dtp
insert into dtp values (10, 2, 'крушение', '1998-06-17', '21:50')

set role reader
set role postgres