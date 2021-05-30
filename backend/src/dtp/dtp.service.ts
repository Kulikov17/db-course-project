import { Injectable } from '@nestjs/common';
import { Dtp } from './entities/dtp.entity';
import {Connection, createConnection, ReturningStatementNotSupportedError } from "typeorm";
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
import { MapDataDto, MapDataFindDto, CountDataDto, MinMaxDateDtp } from './dto/map-data';
import { People } from 'src/people/entities/people.entity';
import { UpdateDescriptionDto } from './dto/update-description';
import { isAbstractType } from 'graphql';
import { Observable } from 'rxjs';
import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'node:constants';


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

    async find(role: string): Promise<Dtp[]> {
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
            .getMany()

            find = await connection.getRepository(Dtp)
            .createQueryBuilder("dtp")
            .innerJoinAndSelect("dtp.affecteddrivers", "affecteddrivers")
            .leftJoinAndSelect("dtp.affectedothers", "affectedothers")
            .innerJoinAndSelect("affectedothers.person", "people")
            .innerJoinAndSelect("dtp.dt", "typedtp")
            .getMany()

            
            for(let i = 0; i < res.length; i++) {
                if (res[i].affectedothers.length > 0) {
                    for (let j = 0; j < find.length; j++) {
                        if (res[i].dtpId == find[j].dtpId) {
                            res[i].affectedothers = find[j].affectedothers;
                            break;
                        }
                    }
                }
            }

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

            if (find) {
                res.affectedothers = find.affectedothers;
            }
        }
        finally {
            await connection.close();
        }

        return res;
    }


    async findCountDtp(role: string): Promise<MapDataFindDto[]> {
        const connection = await this.configs.getConnection(role);
        let res: MapDataFindDto[];
        try {
            res = await connection.createQueryRunner().query("select * from getCountDtp()");
        }
        finally {
            await connection.close();
        }

        return res;
    }

    async findCountAffectedDriversDie(role: string): Promise<MapDataFindDto[]> {
        const connection = await this.configs.getConnection(role);
        let res: MapDataFindDto[];
        try {
            res = await connection.createQueryRunner().query("select * from getCountAffectedDrivers('погиб')");
        }
        finally {
            await connection.close();
        }

        return res;
    }

    async findCountAffectedDriversHurt(role: string): Promise<MapDataFindDto[]> {
        const connection = await this.configs.getConnection(role);
        let res: MapDataFindDto[];
        try {
            res = await connection.createQueryRunner().query("select * from getCountAffectedDrivers('ранен')");
        }
        finally {
            await connection.close();
        }

        return res;
    }

    async findCountAffectedOthersDie(role: string): Promise<MapDataFindDto[]> {
        const connection = await this.configs.getConnection(role);
        let res: MapDataFindDto[];
        try {
            res = await connection.createQueryRunner().query("select * from getCountAffectedOthers('погиб')");
        }
        finally {
            await connection.close();
        }

        return res;
    }

    async findCountAffectedOthersHurt(role: string): Promise<MapDataFindDto[]> {
        const connection = await this.configs.getConnection(role);
        let res: MapDataFindDto[];
        try {
            res = await connection.createQueryRunner().query("select * from getCountAffectedOthers('ранен')");
        }
        finally {
            await connection.close();
        }

        return res;
    }

    async findCountDtpWithDate(findCount: CountDataDto, role: string): Promise<MapDataFindDto[]> {
        const connection = await this.configs.getConnection(role);
        let res: MapDataFindDto[];
        try {
            res = await connection.createQueryRunner().query("select * from getCountDtpWithDate('"+findCount.mindate +"','"+findCount.maxdate+"')");
        }
        finally {
            await connection.close();
        }

        return res;
    }

    async findCountAffectedDriversDieWithDate(findCount: CountDataDto, role: string): Promise<MapDataFindDto[]> {
        const connection = await this.configs.getConnection(role);
        let res: MapDataFindDto[];
        try {
            res = await connection.createQueryRunner().query("select * from getCountAffectedDriversWithDate('погиб','"+findCount.mindate +"','"+findCount.maxdate+"')");
        }
        finally {
            await connection.close();
        }

        return res;
    }

    async findCountAffectedDriversHurtWithDate(findCount: CountDataDto, role: string): Promise<MapDataFindDto[]> {
        const connection = await this.configs.getConnection(role);
        let res: MapDataFindDto[];
        try {
            res = await connection.createQueryRunner().query("select * from getCountAffectedDriversWithDate('ранен','"+findCount.mindate +"','"+findCount.maxdate+"')");
        }
        finally {
            await connection.close();
        }

        return res;
    }

    async findCountAffectedOthersDieWithDate(findCount: CountDataDto, role: string): Promise<MapDataFindDto[]> {
        const connection = await this.configs.getConnection(role);
        let res: MapDataFindDto[];
        try {
            res = await connection.createQueryRunner().query("select * from getCountAffectedOthersWithDate('погиб','"+findCount.mindate +"','"+findCount.maxdate+"')");
        }
        finally {
            await connection.close();
        }

        return res;
    }

    async findCountAffectedOthersHurtWithDate(findCount: CountDataDto, role: string): Promise<MapDataFindDto[]> {
        const connection = await this.configs.getConnection(role);
        let res: MapDataFindDto[];
        try {
            res = await connection.createQueryRunner().query("select * from getCountAffectedOthersWithDate('ранен','"+findCount.mindate +"','"+findCount.maxdate+"')");
        }
        finally {
            await connection.close();
        }

        return res;
    }

    async findCountDtpWithDateCategory(findCount: CountDataDto, role: string): Promise<MapDataFindDto[]> {
        const connection = await this.configs.getConnection(role);
        let res: MapDataFindDto[];
        try {
            res = await connection.createQueryRunner().query("select * from getCountDtpWithDateAndCategory('"+findCount.mindate +"','"+findCount.maxdate+"',"+findCount.categoryid+")");
        }
        finally {
            await connection.close();
        }

        return res;
    }

    
    async findCountAffectedDriversDieWithDateCategory(findCount: CountDataDto, role: string): Promise<MapDataFindDto[]> {
        const connection = await this.configs.getConnection(role);
        let res: MapDataFindDto[];
        try {
            res = await connection.createQueryRunner().query("select * from getCountAffectedDriversWithDateAndCategory('погиб','"+findCount.mindate +"','"+findCount.maxdate+"',"+findCount.categoryid+")");
        }
        finally {
            await connection.close();
        }

        return res;
    }

    async findCountAffectedDriversHurtWithDateCategory(findCount: CountDataDto, role: string): Promise<MapDataFindDto[]> {
        const connection = await this.configs.getConnection(role);
        let res: MapDataFindDto[];
        try {
            res = await connection.createQueryRunner().query("select * from getCountAffectedDriversWithDateAndCategory('ранен','"+findCount.mindate +"','"+findCount.maxdate+"',"+findCount.categoryid+")");
        }
        finally {
            await connection.close();
        }

        return res;
    }

    async findCountAffectedOthersDieWithDateCategory(findCount: CountDataDto, role: string): Promise<MapDataFindDto[]> {
        const connection = await this.configs.getConnection(role);
        let res: MapDataFindDto[];
        try {
            res = await connection.createQueryRunner().query("select * from getCountAffectedOthersWithDateAndCategory('погиб','"+findCount.mindate +"','"+findCount.maxdate+"',"+findCount.categoryid+")");
        }
        finally {
            await connection.close();
        }

        return res;
    }

    async findCountAffectedOthersHurtWithDateCategory(findCount: CountDataDto, role: string): Promise<MapDataFindDto[]> {
        const connection = await this.configs.getConnection(role);
        let res: MapDataFindDto[];
        try {
            res = await connection.createQueryRunner().query("select * from getCountAffectedOthersWithDateAndCategory('ранен','"+findCount.mindate +"','"+findCount.maxdate+"',"+findCount.categoryid+")");
        }
        finally {
            await connection.close();
        }

        return res;
    }


    async findCountDtpWithCity(role: string): Promise<MapDataFindDto[]> {
        const connection = await this.configs.getConnection(role);
        let res: MapDataFindDto[];
        try {
            res = await connection.createQueryRunner().query("select * from getCountDtpWithCity()");
        }
        finally {
            await connection.close();
        }

        return res;
    }

    async findCountAffectedDriversDieWithCity(role: string): Promise<MapDataFindDto[]> {
        const connection = await this.configs.getConnection(role);
        let res: MapDataFindDto[];
        try {
            res = await connection.createQueryRunner().query("select * from getCountAffectedDriversWithCity('погиб')");
        }
        finally {
            await connection.close();
        }

        return res;
    }

    async findCountAffectedDriversHurtWithCity(role: string): Promise<MapDataFindDto[]> {
        const connection = await this.configs.getConnection(role);
        let res: MapDataFindDto[];
        try {
            res = await connection.createQueryRunner().query("select * from getCountAffectedDriversWithCity('ранен')");
        }
        finally {
            await connection.close();
        }

        return res;
    }

    async findCountAffectedOthersDieWithCity(role: string): Promise<MapDataFindDto[]> {
        const connection = await this.configs.getConnection(role);
        let res: MapDataFindDto[];
        try {
            res = await connection.createQueryRunner().query("select * from getCountAffectedOthersWithCity('погиб')");
        }
        finally {
            await connection.close();
        }

        return res;
    }

    async findCountAffectedOthersHurtWithCity(role: string): Promise<MapDataFindDto[]> {
        const connection = await this.configs.getConnection(role);
        let res: MapDataFindDto[];
        try {
            res = await connection.createQueryRunner().query("select * from getCountAffectedOthersWithCity('ранен')");
        }
        finally {
            await connection.close();
        }

        return res;
    }

    async findCountDtpWithDateAndCity(findCount: CountDataDto, role: string): Promise<MapDataFindDto[]> {
        const connection = await this.configs.getConnection(role);
        let res: MapDataFindDto[];
        try {
            res = await connection.createQueryRunner().query("select * from getCountDtpWithCityAndDate('"+findCount.mindate +"','"+findCount.maxdate+"')");
        }
        finally {
            await connection.close();
        }

        return res;
    }

    async findCountAffectedDriversDieWithDateAndCity(findCount: CountDataDto, role: string): Promise<MapDataFindDto[]> {
        const connection = await this.configs.getConnection(role);
        let res: MapDataFindDto[];
        try {
            res = await connection.createQueryRunner().query("select * from getCountAffectedDriversWithDateAndCity('погиб','"+findCount.mindate +"','"+findCount.maxdate+"')");
        }
        finally {
            await connection.close();
        }

        return res;
    }

    async findCountAffectedDriversHurtWithDateAndCity(findCount: CountDataDto, role: string): Promise<MapDataFindDto[]> {
        const connection = await this.configs.getConnection(role);
        let res: MapDataFindDto[];
        try {
            res = await connection.createQueryRunner().query("select * from getCountAffectedDriversWithDateAndCity('ранен','"+findCount.mindate +"','"+findCount.maxdate+"')");
        }
        finally {
            await connection.close();
        }

        return res;
    }

    async findCountAffectedOthersDieWithDateAndCity(findCount: CountDataDto, role: string): Promise<MapDataFindDto[]> {
        const connection = await this.configs.getConnection(role);
        let res: MapDataFindDto[];
        try {
            res = await connection.createQueryRunner().query("select * from getCountAffectedOthersWithDateAndCity('погиб','"+findCount.mindate +"','"+findCount.maxdate+"')");
        }
        finally {
            await connection.close();
        }

        return res;
    }

    async findCountAffectedOthersHurtWithDateAndCity(findCount: CountDataDto, role: string): Promise<MapDataFindDto[]> {
        const connection = await this.configs.getConnection(role);
        let res: MapDataFindDto[];
        try {
            res = await connection.createQueryRunner().query("select * from getCountAffectedOthersWithDateAndCity('ранен','"+findCount.mindate +"','"+findCount.maxdate+"')");
        }
        finally {
            await connection.close();
        }

        return res;
    }

    async findCountDtpWithDateCategoryAndCity(findCount: CountDataDto, role: string): Promise<MapDataFindDto[]> {
        const connection = await this.configs.getConnection(role);
        let res: MapDataFindDto[];
        try {
            res = await connection.createQueryRunner().query("select * from getCountDtpWithCityAndDateAndCategory('"+findCount.mindate +"','"+findCount.maxdate+"',"+findCount.categoryid+")");
        }
        finally {
            await connection.close();
        }

        return res;
    }

    
    async findCountAffectedDriversDieWithDateCategoryAndCity(findCount: CountDataDto, role: string): Promise<MapDataFindDto[]> {
        const connection = await this.configs.getConnection(role);
        let res: MapDataFindDto[];
        try {
            res = await connection.createQueryRunner().query("select * from getCountAffectedDriversWithDateAndCategoryAndCity('погиб','"+findCount.mindate +"','"+findCount.maxdate+"',"+findCount.categoryid+")");
        }
        finally {
            await connection.close();
        }

        return res;
    }

    async findCountAffectedDriversHurtWithDateCategoryAndCity(findCount: CountDataDto, role: string): Promise<MapDataFindDto[]> {
        const connection = await this.configs.getConnection(role);
        let res: MapDataFindDto[];
        try {
            res = await connection.createQueryRunner().query("select * from getCountAffectedDriversWithDateAndCategoryAndCity('ранен','"+findCount.mindate +"','"+findCount.maxdate+"',"+findCount.categoryid+")");
        }
        finally {
            await connection.close();
        }

        return res;
    }

    async findCountAffectedOthersDieWithDateCategoryAndCity(findCount: CountDataDto, role: string): Promise<MapDataFindDto[]> {
        const connection = await this.configs.getConnection(role);
        let res: MapDataFindDto[];
        try {
            res = await connection.createQueryRunner().query("select * from getCountAffectedOthersWithDateAndCategoryAndCity('погиб','"+findCount.mindate +"','"+findCount.maxdate+"',"+findCount.categoryid+")");
        }
        finally {
            await connection.close();
        }

        return res;
    }

    async findCountAffectedOthersHurtWithDateCategoryAndCity(findCount: CountDataDto, role: string): Promise<MapDataFindDto[]> {
        const connection = await this.configs.getConnection(role);
        let res: MapDataFindDto[];
        try {
            res = await connection.createQueryRunner().query("select * from getCountAffectedOthersWithDateAndCategoryAndCity('ранен','"+findCount.mindate +"','"+findCount.maxdate+"',"+findCount.categoryid+")");
        }
        finally {
            await connection.close();
        }

        return res;
    }

    async findDtpDate(role: string): Promise<MinMaxDateDtp> {
        const connection = await this.configs.getConnection(role);
        let res: MinMaxDateDtp;
        try {
            res = await connection.createQueryRunner().query("select * from getMinMaxDateDtp()");
        }
        finally {
            await connection.close();
        }

        return res;
    }
    

    async updateDescription(id: number, data: UpdateDescriptionDto, role: string): Promise<Dtp> {
        const connection = await this.configs.getConnection(role);
  
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