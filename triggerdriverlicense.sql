-- Создание человека
CREATE FUNCTION trigger_create_person () RETURNS trigger AS 
$$
	BEGIN
 	if (NEW.driverlicense is NOT NULL) then 
		if (SELECT date_part('year',age(NEW.birthdate)) >= 16)  then
		    if ((SELECT count(*) from people where people.driverlicense = NEW.driverlicense) > 0) then
				return NULL;
			else
    			return NEW;
			end if;
		else
			return NULL;
		end if;
	else
	   return NEW;
    end if;
END;
$$ LANGUAGE  plpgsql;

CREATE TRIGGER createPerson
BEFORE INSERT ON people FOR EACH ROW
EXECUTE PROCEDURE trigger_create_person ()

-- Обновление данных о человеке
CREATE FUNCTION trigger_update_person () RETURNS trigger AS 
$$
	BEGIN
 	if (NEW.driverlicense is NOT NULL) then 
		if (SELECT date_part('year',age(NEW.birthdate)) >= 16)  then
		    if ((SELECT count(*) from people where people.driverlicense = NEW.driverlicense and people.id <> NEW.id) > 0) then
				return OLD;
			else
    			return NEW;
			end if;
		else
			return OLD;
		end if;
	else
	   return NEW;
    end if;
END;
$$ LANGUAGE  plpgsql;


CREATE TRIGGER updatePerson
BEFORE UPDATE ON people FOR EACH ROW
EXECUTE PROCEDURE trigger_update_person ()

INSERT INTO people VALUES (46, 'Куликов', 'Дмитрий', 'Алексеевич', 'муж', '2021-02-08', '89121358556', '8912358516');

INSERT INTO ts VALUES (1, 'гужевая повозка', NULL, NULL, NULL, NULL, NULL); 
INSERT INTO ts VALUES (2, 'велосипед', NULL, NULL, NULL, NULL, NULL); 

CREATE FUNCTION trigger_create_ts () RETURNS trigger AS 
$$
	BEGIN
		if ((SELECT count(*) from ts where ts.registernumber = NEW.registernumber) > 0) then
			return NULL;
		else
    		return NEW;
		end if;
END;
$$ LANGUAGE  plpgsql;

CREATE TRIGGER createTs
BEFORE INSERT ON ts FOR EACH ROW
EXECUTE PROCEDURE trigger_create_ts ()


CREATE FUNCTION trigger_update_ts () RETURNS trigger AS 
$$
	BEGIN
		if ((SELECT count(*) from ts where ts.registernumber = NEW.registernumber and ts.id <> NEW.id) > 0) then
			return OLD;
		else
    		return NEW;
		end if;
END;
$$ LANGUAGE  plpgsql;

CREATE TRIGGER updateTs
BEFORE UPDATE ON ts FOR EACH ROW
EXECUTE PROCEDURE trigger_update_ts ()


CREATE FUNCTION trigger_delete_user () RETURNS trigger AS 
$$
	BEGIN
		if (OLd.role = 'администратор' and (SELECT count(*) from users where users.role = 'администратор') = 1) then
			return null;
		else
    		return OLD;
		end if;
END;
$$ LANGUAGE  plpgsql;


CREATE TRIGGER deleteUser
BEFORE DELETE ON users FOR EACH ROW
EXECUTE PROCEDURE trigger_delete_user ()

CREATE FUNCTION trigger_update_user () RETURNS trigger AS 
$$
BEGIN
	if (OLD.role = 'администратор') then
		if (NEW.role <> 'администратор' and (SELECT count(*) from users where users.role = 'администратор') < 2) then
			return null;
		else
			return NEW;
		end if;
	else
		return NEW;
	end if;
END;

$$ LANGUAGE  plpgsql;


CREATE TRIGGER updateUser
BEFORE UPDATE ON users FOR EACH ROW
EXECUTE PROCEDURE trigger_update_user ()

DELETE from users
WHERE id = 69;