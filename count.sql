-- поиск годов
CREATE OR REPLACE function getMinMaxDateDtp()
returns table (
    minDate CHARACTER VARYING,
	maxDate CHARACTER VARYING
	)
    as $$
    begin
		return query(
		select cast(extract(YEAR from min(dtp."dateDtp")) AS CHARACTER VARYING) AS minDate,
			cast(extract(YEAR from max(dtp."dateDtp")) AS CHARACTER VARYING) AS maxDate
		from dtp
		);
	end;
$$
language 'plpgsql';

-- кол-во пострадавших водителей по дате, и категории для регионов
CREATE OR REPLACE function getCountAffectedDriversWithDateAndCategory(health CHARACTER VARYING, minDate date, maxDate date, category integer)
returns table (
    region CHARACTER VARYING,
    count bigint
	)
    as $$
    begin
    	return query(
   			select dtp."regionDtp" as region, count(*) as countAffectedDrivers
			from dtp join affecteddrivers on affecteddrivers."dtpDtpId" = dtp."dtpId"
			join dtp_dt_typedtp on dtp_dt_typedtp."dtpDtpId"=dtp."dtpId" join typedtp on typedtp.id = dtp_dt_typedtp."typedtpId"
			where affecteddrivers.health = $1 and dtp."dateDtp" >= $2 and dtp."dateDtp" <= $3 and typedtp.id = $4
			group by dtp."regionDtp"
	);
    end;
$$
language 'plpgsql';

-- кол-во пострадавших прочих по дате, и категории для регионов
CREATE OR REPLACE function getCountAffectedOthersWithDateAndCategory(health CHARACTER VARYING, minDate date, maxDate date, category integer)
returns table (
    region CHARACTER VARYING,
    count bigint
	)
    as $$
    begin
    	return query(
   			select dtp."regionDtp" as region, count(*) as countAffectedOthers
			from dtp join affectedothers on affectedothers."dtpDtpId" = dtp."dtpId"
			join dtp_dt_typedtp on dtp_dt_typedtp."dtpDtpId"=dtp."dtpId" join typedtp on typedtp.id = dtp_dt_typedtp."typedtpId"
			where affectedothers.health = $1 and dtp."dateDtp" >= $2 and dtp."dateDtp" <= $3 and typedtp.id = $4
			group by dtp."regionDtp"
	);
    end;
$$
language 'plpgsql';

-- кол-во пострадавших водителей по дате для регионов
CREATE OR REPLACE function getCountAffectedDriversWithDate(health CHARACTER VARYING, minDate date, maxDate date)
returns table (
    region CHARACTER VARYING,
    count bigint
	)
    as $$
    begin
    	return query(
   			select dtp."regionDtp" as region, count(*) as countAffectedDrivers
			from dtp join affecteddrivers on affecteddrivers."dtpDtpId" = dtp."dtpId"
			where affecteddrivers.health = $1 and dtp."dateDtp" >= $2 and dtp."dateDtp" <= $3
			group by dtp."regionDtp"
	);
    end;
$$
language 'plpgsql';


-- кол-во пострадавших прочих по дате для регионов
CREATE OR REPLACE function getCountAffectedOthersWithDate(health CHARACTER VARYING, minDate date, maxDate date)
returns table (
    region CHARACTER VARYING,
    count bigint
	)
    as $$
    begin
    	return query(
   			select dtp."regionDtp" as region, count(*) as countAffectedOthers
			from dtp join affectedothers on affectedothers."dtpDtpId" = dtp."dtpId"
			where affectedothers.health = $1 and dtp."dateDtp" >= $2 and dtp."dateDtp" <= $3
			group by dtp."regionDtp"
	);
    end;
$$
language 'plpgsql';

-- кол-во пострадавших водителей для регионов
CREATE OR REPLACE function getCountAffectedDrivers(health CHARACTER VARYING)
returns table (
    region CHARACTER VARYING,
    count bigint
	)
    as $$
    begin
    	return query(
   			select dtp."regionDtp" as region, count(*) as countAffectedDrivers
			from dtp join affecteddrivers on affecteddrivers."dtpDtpId" = dtp."dtpId"
			where affecteddrivers.health = $1
			group by dtp."regionDtp"
	);
    end;
$$
language 'plpgsql';


-- кол-во пострадавших прочих для регионов
CREATE OR REPLACE function getCountAffectedOthers(health CHARACTER VARYING)
returns table (
    region CHARACTER VARYING,
    count bigint
	)
    as $$
    begin
    	return query(
   			select dtp."regionDtp" as region, count(*) as countAffectedOthers
			from dtp join affectedothers on affectedothers."dtpDtpId" = dtp."dtpId"
			where affectedothers.health = $1
			group by dtp."regionDtp"
	);
    end;
$$
language 'plpgsql';

-- кол-во дтп для регионов
CREATE OR REPLACE function getCountDtp()
returns table (
    region CHARACTER VARYING,
    count bigint
	)
    as $$
    begin
    	return query(
   			select dtp."regionDtp" as region, count(*) as countDtp
			from dtp
			group by dtp."regionDtp"
	);
    end;
$$
language 'plpgsql';

CREATE OR REPLACE function getCountDtpWithDate(minDate date, maxDate date)
returns table (
    region CHARACTER VARYING,
    count bigint
	)
    as $$
    begin
    	return query(
   			select dtp."regionDtp" as region, count(*) as countDtp
			from dtp
			where dtp."dateDtp" >= $1 and dtp."dateDtp" <= $2
			group by dtp."regionDtp"
	);
    end;
$$
language 'plpgsql';



CREATE OR REPLACE function getCountDtpWithDateAndCategory(minDate date, maxDate date, category integer)
returns table (
    region CHARACTER VARYING,
    count bigint
	)
    as $$
    begin
    	return query(
   			select dtp."regionDtp" as region, count(*) as countDtp
			from dtp join dtp_dt_typedtp on dtp_dt_typedtp."dtpDtpId"=dtp."dtpId"
			join typedtp on typedtp.id = dtp_dt_typedtp."typedtpId"
			where dtp."dateDtp" >= $1 and dtp."dateDtp" <= $2 and typedtp.id = $3
			group by dtp."regionDtp"
	);
    end;
$$
language 'plpgsql';




--ГОРОДА

-- кол-во пострадавших водителей по дате, и категории для регионов и города
CREATE OR REPLACE function getCountAffectedDriversWithDateAndCategoryAndCity(health CHARACTER VARYING, minDate date, maxDate date, category integer)
returns table (
    region CHARACTER VARYING,
	city CHARACTER VARYING,
    count bigint
	)
    as $$
    begin
    	return query(
   			select dtp."regionDtp" as region, dtp."cityDtp" as city, count(*) as countAffectedDrivers
			from dtp join affecteddrivers on affecteddrivers."dtpDtpId" = dtp."dtpId"
			join dtp_dt_typedtp on dtp_dt_typedtp."dtpDtpId"=dtp."dtpId" join typedtp on typedtp.id = dtp_dt_typedtp."typedtpId"
			where affecteddrivers.health = $1 and dtp."dateDtp" >= $2 and dtp."dateDtp" <= $3 and typedtp.id = $4
			group by dtp."regionDtp", dtp."cityDtp" 
	);
    end;
$$
language 'plpgsql';

-- кол-во пострадавших прочих по дате, и категории для регионов и городов
CREATE OR REPLACE function getCountAffectedOthersWithDateAndCategoryAndCity(health CHARACTER VARYING, minDate date, maxDate date, category integer)
returns table (
    region CHARACTER VARYING,
	city CHARACTER VARYING,
    count bigint
	)
    as $$
    begin
    	return query(
   			select dtp."regionDtp" as region, dtp."cityDtp" as city, count(*) as countAffectedOthers
			from dtp join affectedothers on affectedothers."dtpDtpId" = dtp."dtpId"
			join dtp_dt_typedtp on dtp_dt_typedtp."dtpDtpId"=dtp."dtpId" join typedtp on typedtp.id = dtp_dt_typedtp."typedtpId"
			where affectedothers.health = $1 and dtp."dateDtp" >= $2 and dtp."dateDtp" <= $3 and typedtp.id = $4
			group by dtp."regionDtp", dtp."cityDtp" 
	);
    end;
$$
language 'plpgsql';

-- кол-во пострадавших водителей по дате для регионов и городов
CREATE OR REPLACE function getCountAffectedDriversWithDateAndCity(health CHARACTER VARYING, minDate date, maxDate date)
returns table (
    region CHARACTER VARYING,
	city CHARACTER VARYING,
    count bigint
	)
    as $$
    begin
    	return query(
   			select dtp."regionDtp" as region, dtp."cityDtp" as city, count(*) as countAffectedDrivers
			from dtp join affecteddrivers on affecteddrivers."dtpDtpId" = dtp."dtpId"
			where affecteddrivers.health = $1 and dtp."dateDtp" >= $2 and dtp."dateDtp" <= $3
			group by dtp."regionDtp", dtp."cityDtp"
	);
    end;
$$
language 'plpgsql';

-- кол-во пострадавших прочих по дате для регионов и городов
CREATE OR REPLACE function getCountAffectedOthersWithDateAndCity(health CHARACTER VARYING, minDate date, maxDate date)
returns table (
    region CHARACTER VARYING,
	city CHARACTER VARYING,
    count bigint
	)
    as $$
    begin
    	return query(
   			select dtp."regionDtp" as region, dtp."cityDtp" as city, count(*) as countAffectedOthers
			from dtp join affectedothers on affectedothers."dtpDtpId" = dtp."dtpId"
			where affectedothers.health = $1 and dtp."dateDtp" >= $2 and dtp."dateDtp" <= $3
			group by dtp."regionDtp", dtp."cityDtp"
	);
    end;
$$
language 'plpgsql';

-- кол-во пострадавших водителей для регионов и городов
CREATE OR REPLACE function getCountAffectedDriversWithCity(health CHARACTER VARYING)
returns table (
    region CHARACTER VARYING,
	city CHARACTER VARYING,
    count bigint
	)
    as $$
    begin
    	return query(
   			select dtp."regionDtp" as region, dtp."cityDtp" as city, count(*) as countAffectedDrivers
			from dtp join affecteddrivers on affecteddrivers."dtpDtpId" = dtp."dtpId"
			where affecteddrivers.health = $1
			group by dtp."regionDtp", dtp."cityDtp"
	);
    end;
$$
language 'plpgsql';

-- кол-во пострадавших прочих для регионов и городов
CREATE OR REPLACE function getCountAffectedOthersWithCity(health CHARACTER VARYING)
returns table (
    region CHARACTER VARYING,
	city CHARACTER VARYING,
    count bigint
	)
    as $$
    begin
    	return query(
   			select dtp."regionDtp" as region, dtp."cityDtp" as city, count(*) as countAffectedOthers
			from dtp join affectedothers on affectedothers."dtpDtpId" = dtp."dtpId"
			where affectedothers.health = $1
			group by dtp."regionDtp", dtp."cityDtp"
	);
    end;
$$
language 'plpgsql';

-- кол-во дтп для регионов и городов
CREATE OR REPLACE function getCountDtpWithCity()
returns table (
    region CHARACTER VARYING,
	city CHARACTER VARYING,
    count bigint
	)
    as $$
    begin
    	return query(
   			select dtp."regionDtp" as region, dtp."cityDtp" as city, count(*) as countDtp
			from dtp
			group by dtp."regionDtp", dtp."cityDtp"
	);
    end;
$$
language 'plpgsql';


CREATE OR REPLACE function getCountDtpWithCityAndDate(minDate date, maxDate date)
returns table (
    region CHARACTER VARYING,
	city CHARACTER VARYING,
    count bigint
	)
    as $$
    begin
    	return query(
   			select dtp."regionDtp" as region, dtp."cityDtp" as city, count(*) as countDtp
			from dtp
			where dtp."dateDtp" >= $1 and dtp."dateDtp" <= $2
			group by dtp."regionDtp", dtp."cityDtp"
	);
    end;
$$
language 'plpgsql';


CREATE OR REPLACE function getCountDtpWithCityAndDateAndCategory(minDate date, maxDate date, category integer)
returns table (
    region CHARACTER VARYING,
	city CHARACTER VARYING,
    count bigint
	)
    as $$
    begin
    	return query(
   			select dtp."regionDtp" as region, dtp."cityDtp" as city, count(*) as countDtp
			from dtp join dtp_dt_typedtp on dtp_dt_typedtp."dtpDtpId"=dtp."dtpId"
			join typedtp on typedtp.id = dtp_dt_typedtp."typedtpId"
			where dtp."dateDtp" >= $1 and dtp."dateDtp" <= $2 and typedtp.id = $3
			group by dtp."regionDtp", dtp."cityDtp"
	);
    end;
$$
language 'plpgsql';
