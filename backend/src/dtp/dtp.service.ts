import { Injectable } from '@nestjs/common';
import { Dtp } from './dtp.entity';
import { Affecteddrivers } from './affecteddrivers.entity';
import { getRepository } from "typeorm";
import { getConnection } from "typeorm";
import {createConnections, createConnection, Connection} from "typeorm";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/index';
import * as path from 'path';
import { from } from 'rxjs';


@Injectable()
export class DtpService {
    /*constructor(@InjectRepository(Dtp) 
        private readonly dtpRepository: Repository<Dtp>) {}*/
    
    constructor() {}

  /*  async getAll(): Promise<Dtp[]> {
        return await this.dtpRepository.find();
    }*/

    async getAll(): Promise<Dtp[]> {
        const connection = await createConnection({
             type: 'postgres',
             port: 5432,
             host: '127.0.0.1',
             database: 'DTP',
             username: "postgres",
             password: 'Dimakrut17',
             entities: [path.join(__dirname, "**/*.entity{.ts,.js}")],
             synchronize: true
        })

        const res = await connection.getRepository(Dtp).createQueryBuilder("dtp")
        .innerJoinAndSelect("dtp.affecteddrivers", "affecteddrivers")
     //   .innerJoinAndSelect("affecteddrivers.ts", "ts")
       // .innerJoinAndSelect("ts.owner", "person.id")
        .innerJoinAndSelect("affecteddrivers.person", "person")
        .innerJoinAndSelect("dtp.dt", "typedtp")
        .getMany()
        await connection.close()
        return res
           

/*
        const res1 = await connection.getRepository(Dtp).createQueryBuilder("dtp")
        .select("*")
        //.innerJoinAndSelect('(' + subquery + ')', "tmp", "tmp.affecteddriversId =  dtp.affecteddriversId")
        .innerJoin("dtp.affecteddrivers", "("+ subquery +")")
        .innerJoin("dtp.dt", "typedtp")
        .getSql()

        console.log(res1)

       const res = await connection.getRepository(Dtp).createQueryBuilder("dtp")
        //.select("*")
        .innerJoinAndSelect("dtp.affecteddrivers", "("+ subquery +")")
        .innerJoinAndSelect("dtp.dt", "typedtp")
        .getMany()
        //console.log(res)
        await connection.close()
        return res*/
    }

   /* async create(newDtp: Dtp): Promise<Dtp> {
        const dtp = this.dtpRepository.create(newDtp);
        return await this.dtpRepository.save(dtp);
    }*/
}