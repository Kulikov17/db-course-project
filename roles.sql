select * from pg_user;
select * from pg_roles;

create user reader with password 'reader'
create user editor with password 'editor'

drop user reader;
drop user editor;

create role only_read;
drop role only_read;
GRANT select on dtp to only_read;
GRANT select on affecteddrivers to only_read;
GRANT select on affectedothers to only_read;
GRANT select on dtp_dt_typedtp to only_read;
GRANT select on people to only_read;
GRANT select on ts to only_read;
GRANT select on users to only_read
GRANT select on typedtp to only_read;

REVOKE select on dtp from only_read;
REVOKE select on affecteddrivers from only_read;
REVOKE select on affectedothers from only_read;
REVOKE select on dtp_dt_typedtp from only_read;
REVOKE select on people from only_read;
REVOKE select on ts from only_read;
REVOKE select on typedtp from only_read;
REVOKE select on users from only_read;

GRANT only_read TO reader;

create role only_editor;
drop role only_editor;

GRANT select on dtp to only_editor;
GRANT select on affecteddrivers to only_editor;
GRANT select on affectedothers to only_editor;
GRANT select on dtp_dt_typedtp to only_editor;
GRANT select on people to only_editor;
GRANT select on ts to only_editor;
GRANT select on typedtp to only_editor;

GRANT insert on dtp to only_editor;
GRANT insert on affecteddrivers to only_editor;
GRANT insert on affectedothers to only_editor;
GRANT insert on dtp_dt_typedtp to only_editor;
GRANT insert on people to only_editor;
GRANT insert on ts to only_editor;

GRANT delete on dtp to only_editor;
GRANT delete on affecteddrivers to only_editor;
GRANT delete on affectedothers to only_editor;
GRANT delete on dtp_dt_typedtp to only_editor;
GRANT delete on people to only_editor;
GRANT delete on ts to only_editor;

GRANT update on dtp to only_editor;
GRANT update on affecteddrivers to only_editor;
GRANT update on affectedothers to only_editor;
GRANT update on dtp_dt_typedtp to only_editor;
GRANT update on people to only_editor;
GRANT update on ts to only_editor;

GRANT only_editor TO editor;

GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO editor;
select pg_has_role('postgres', 'postgres');


select * from dtp
select * from typedtp
insert into dtp values (5, '1998-06-17', '21:50', 'Республика Мордовия', 'Саранск', 'дурачки')

set role only_read
set role postgres