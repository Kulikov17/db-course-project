import { Injectable } from '@nestjs/common';
import { Dtp } from './entities/dtp.entity';
import {Connection, createConnection } from "typeorm";
import * as path from 'path';
import {  CreateAffectedDtpDto, CreateDtpDto } from './dto/create-dtp';
import { CreateAffectedDriversDto } from './dto/create-affecteddrivers';
import { CreateAffectedOthersDto } from './dto/create-affectedothers';
import { ConfigService } from 'src/config.service';
import { PeopleService } from 'src/people/people.service';
import { TsService } from 'src/ts/ts.service';
import { AffectedDrivers } from './entities/affecteddrivers.entity';
import { AffectedOthers } from './entities/affectedothers.entity';
import { FindFullInfoDtpDto } from './dto/find-full-info-dtp';
import { FullInfoDtpCountDto } from './dto/full-info-count';
import { MapDataDto } from './dto/map-data';
import { People } from 'src/people/entities/people.entity';
import { UpdateDescriptionDto } from './dto/update-description';


@Injectable()
export class DtpService {

    constructor(private configs: ConfigService,
        private people: PeopleService,
        private ts: TsService) {}

    
    public async CreateDtpDtoClientConvertToCreateAffectedDriversDto(source: CreateAffectedDtpDto, role: string): Promise<CreateAffectedDriversDto>  {
        const findPerson = await this.people.findOne(source. passport, role);
        const findTs = await this.ts.findOne(source.registernumber, role);
        const target = new CreateAffectedDriversDto();
        target.dtp = source.dtpId;
        target.type = source.type;
        target.person = findPerson.id;
        target.ts = findTs.id;
        target.health = source.health;
        target.guilt = source.guilt
        return target;
    }

    public async CreateDtpDtoClientConvertToCreateAffectedOthersDto(source: CreateAffectedDtpDto, role: string): Promise<CreateAffectedOthersDto>  {
        const findPerson = await this.people.findOne(source.passport, role);
        const target = new CreateAffectedDriversDto();
        target.dtp = source.dtpId;
        target.type = source.type;
        target.person = findPerson.id;
        target.health = source.health;
        target.guilt = source.guilt
        return target;
    }

    async create(newDtp: CreateDtpDto, role: string): Promise<Dtp> {
        const connection = await this.configs.getConnection(role);
        let res;
        try {
            const repositoryDtp = connection.getRepository(Dtp);
            const dtp = repositoryDtp.create(newDtp);
            res = await repositoryDtp.save(dtp);    
        }
        finally {
            await connection.close();
        }

        return res;
    }

    async createAffectedDrivers(newAffectedClient: CreateAffectedDtpDto[], role: string): Promise<AffectedDrivers[]> {
        let affectedDrivers = [];
     
        for (let i = 0; i < newAffectedClient.length; i++) {
            affectedDrivers.push(await this.CreateDtpDtoClientConvertToCreateAffectedDriversDto(newAffectedClient[i], role));
        }

        console.log(affectedDrivers);
        const connection = await this.configs.getConnection(role);
        let res;
        try {
            const repositoryAffectedDrivers = connection.getRepository(AffectedDrivers);
            let affDrivers = repositoryAffectedDrivers.create(affectedDrivers);
            res = await repositoryAffectedDrivers.save(affDrivers); 
        }
        finally {
            await connection.close();
        }

        return res;
    }

    async createAffectedOthers(newAffectedClient: CreateAffectedDtpDto[], role: string): Promise<AffectedDrivers[]> {
        let affectedOthers = [];
     
        for (let i = 0; i < newAffectedClient.length; i++) {
            affectedOthers.push(await this.CreateDtpDtoClientConvertToCreateAffectedOthersDto(newAffectedClient[i], role));
        }

        console.log(affectedOthers);
        const connection = await this.configs.getConnection(role);
        let res;
        try {
            const repositoryAffectedDrivers = connection.getRepository(AffectedOthers);
            let affOthers = repositoryAffectedDrivers.create(affectedOthers);
            res = await repositoryAffectedDrivers.save(affOthers); 
        }
        finally {
            await connection.close();
        }

        return res;
    }

    async findAllAffectedDrivers(role: string): Promise<FindFullInfoDtpDto[]> {
        const connection = await this.configs.getConnection(role);
        let res;
        try {
            res = await connection.getRepository(Dtp).createQueryBuilder("dtp")
            .innerJoinAndSelect("dtp.affecteddrivers", "affecteddrivers")
            .innerJoinAndSelect("affecteddrivers.person", "people")
            .innerJoinAndSelect("dtp.dt", "typedtp")
            .getMany()
        }
        finally {
            await connection.close();
        }
        return res;
    }

    async findAllAffectedOthers(role: string): Promise<FindFullInfoDtpDto[]> {
        const connection = await this.configs.getConnection(role);
        let res;
        try {
            res = await connection.getRepository(Dtp).createQueryBuilder("dtp")
            .innerJoinAndSelect("dtp.affectedothers", "affectedothers")
            .innerJoinAndSelect("affectedothers.person", "people")
            .innerJoinAndSelect("dtp.dt", "typedtp")
            .getMany()
        }
        finally {
            await connection.close();
        }
        return res;
    }

    async find(role: string): Promise<Dtp[]> {
        const connection = await this.configs.getConnection(role);
  
        let res;
        try {
            res = await connection.getRepository(Dtp)
            .createQueryBuilder("dtp")
            .innerJoinAndSelect("dtp.dt", "typedtp")
            .getMany()
        }
        finally {
            await connection.close();
        }
  
        return res;
    }

    async findById(id: number, role: string): Promise<Dtp> {
        const connection = await this.configs.getConnection(role);

        let res, find;
        try {
            res = await connection.getRepository(Dtp)
            .createQueryBuilder("dtp")
            .innerJoinAndSelect("dtp.affecteddrivers", "affecteddrivers")
            .innerJoinAndSelect("affecteddrivers.ts", "ts")
            .innerJoinAndSelect("affecteddrivers.person", "people")
            .leftJoinAndSelect("dtp.affectedothers", "affectedothers")
            .innerJoinAndSelect("dtp.dt", "typedtp")
            .where('dtp.dtpId = :id', { id })
            .getOne()

            find = await connection.getRepository(Dtp)
            .createQueryBuilder("dtp")
            .innerJoinAndSelect("dtp.affecteddrivers", "affecteddrivers")
            .leftJoinAndSelect("dtp.affectedothers", "affectedothers")
            .innerJoinAndSelect("affectedothers.person", "people")
            .innerJoinAndSelect("dtp.dt", "typedtp")
            .where('dtp.dtpId = :id', { id })
            .getOne()

            res.affectedothers = find.affectedothers;
        }
        finally {
            await connection.close();
        }

        return res;
    }

    async findAllInfoByRegion(role: string) : Promise<MapDataDto>{
        const connection = await this.configs.getConnection(role);
        let res:MapDataDto;
        try {
            await connection.createQueryRunner().query("select * from getCountDtp()").then((resp:any ) => {
                res.countDtp = resp;
            });
            await connection.createQueryRunner().query("select * from getCountAffectedDrivers('ранен')").then((resp:any ) => {
                res.affecteddrivershurt = resp;
            });
            await connection.createQueryRunner().query("select * from getCountAffectedDrivers('погиб')").then((resp:any ) => {
                res.affecteddriversdie = resp;
            });
            await connection.createQueryRunner().query("select * from getCountAffectedOthers('ранен')").then((resp:any ) => {
                res.affectedothershurt = resp;
            });
            await connection.createQueryRunner().query("select * from getCountAffectedOthersDie('погиб')").then((resp:any ) => {
                res.affectedothersdie = resp;
            });
        }
        finally {
            await connection.close();
            
        }
        return res;
    }

    async updateDescription(id: number, data: UpdateDescriptionDto, role: string): Promise<Dtp> {
        const connection = await this.configs.getConnection(role);
  
        console.log(data);
        let res;
        try {
            const repositoryDtp = connection.getRepository(Dtp);
            let find = await repositoryDtp.findOne({dtpId: id});
            find.descriptionDtp = data.description;
            res = await repositoryDtp.save(find);
        }
        finally {
            await connection.close();
        }
        
        return res;
      }

    async remove(id: number, role: string): Promise<Dtp> {
        const connection = await this.configs.getConnection(role);

        let res, find;
        try {
            const repositoryDtp = connection.getRepository(Dtp);
            res = await repositoryDtp.findOne({dtpId: id});

            const repositoryAffectedDrivers = connection.getRepository(AffectedDrivers);
            find = await repositoryAffectedDrivers.findOne({dtp: res});
            if (find)
                await repositoryAffectedDrivers.remove(find);

            const repositoryAffectedOthers = connection.getRepository(AffectedOthers);
            find = await repositoryAffectedOthers.findOne({dtp: res});
            if (find)
                await repositoryAffectedOthers.remove(find);
;
            await repositoryDtp.remove(res);
        }
        finally {
            await connection.close();
        }

        return res;
    }
}