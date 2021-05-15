DROP TABLE IF EXISTS people CASCADE;
DROP TABLE IF EXISTS dtp CASCADE;
DROP TABLE IF EXISTS typedtp CASCADE;


CREATE TABLE IF NOT EXISTS people
(
    id_person SERIAL PRIMARY KEY,
    person_name CHARACTER VARYING(64) NOT NULL
);

INSERT INTO people VALUES (1, 'Куликов')
INSERT INTO people VALUES (2, 'Маркеев')
INSERT INTO people VALUES (3, 'Спирин')

CREATE TABLE IF NOT EXISTS typedtp
(
    id_typedtp SERIAL PRIMARY KEY,
	description CHARACTER VARYING(256)
);

INSERT INTO typedtp VALUES (1, 'Столкновение')
INSERT INTO typedtp VALUES (2, 'Крушение')

CREATE TABLE IF NOT EXISTS dtp
(
    id_dtp SERIAL PRIMARY KEY,
    --id_person INT NOT NULL REFERENCES people(id_person),
	city_dtp CHARACTER VARYING(64) not null
);

INSERT INTO dtp VALUES (1, 'Москва')
INSERT INTO dtp VALUES (2, 'Рязань')
INSERT INTO dtp VALUES (3, 'Саранск')

INSERT INTO dtp VALUES (1, 1, 'Москва')
INSERT INTO dtp VALUES (2, 1, 'Москва')
INSERT INTO dtp VALUES (3, 3, 'Москва')
INSERT INTO dtp VALUES (4, 3, 'Рязань')
INSERT INTO dtp VALUES (5, 2, 'Саранск')


CREATE TABLE IF NOT EXISTS dt
(
    id_dtp INT NOT NULL REFERENCES dtp(id_dtp),
	id_typedtp INT NOT NULL REFERENCES typedtp(id_typedtp)
);

INSERT INTO dt VALUES (1, 1)
INSERT INTO dt VALUES (1, 2)
INSERT INTO dt VALUES (2, 1)
INSERT INTO dt VALUES (3, 2)
INSERT INTO dt VALUES (4, 2)
INSERT INTO dt VALUES (5, 1)
INSERT INTO dt VALUES (5, 2)

select * from people
select * from dtp
select * from dt

select * 
from dtp join 
(
	select *
	from dt join
	typedtp on dt.id_typedtp = typedtp.id_typedtp
) as typedtp_info on dtp.id_dtp = typedtp_info.id_dtp