import { HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '../config.service';
import { PeopleService } from '../people/people.service';
import { Ts } from './entities/ts.entity';
import { CreateTsDtoClient, CreateTsDtoServer } from './dto/create-ts';
import { UpdateTsDtoClient, UpdateTsDtoServer } from './dto/update-ts';
import { TsDto } from './dto/ts';
import { HttpException } from '@nestjs/common';

@Injectable()
export class TsService {

    constructor(private configs: ConfigService,
         private people: PeopleService) {}

    public TsConvertToTsDto(source: Ts, ownerpassport: String): TsDto {
        const target = new TsDto();
        target.id = source.id;
        target.type = source.type;
        target.brand = source.brand;
        target.model = source.model;
        target.color = source.color;
        target.registernumber = source.registernumber;
        target.ownerpassport = ownerpassport;
        return target;
    }

    public async CreateTsDtoClientConvertToCreateTsDtoServer(source: CreateTsDtoClient, role: string): Promise<CreateTsDtoServer> {
        const findPerson = await this.people.findOne(source.ownerpassport, role);
        const target = new CreateTsDtoServer();
        target.type = source.type
        target.brand = source.brand
        target.model = source.model
        target.color = source.color
        target.registernumber = source.registernumber
        target.owner = findPerson.id
        return target;
    }

    public async UpdateTsDtoClientConvertToUpdateTsDtoServer(source: UpdateTsDtoClient, role: string): Promise<UpdateTsDtoServer> {
        const findPerson = await this.people.findOne(source.ownerpassport, role);
        const target = new CreateTsDtoServer();
        target.type = source.type
        target.brand = source.brand
        target.model = source.model
        target.color = source.color
        target.registernumber = source.registernumber
        target.owner = findPerson.id
        return target;
    }

    async create(newTs: CreateTsDtoClient, role: string): Promise<Ts> {
        const newTsServer = await this.CreateTsDtoClientConvertToCreateTsDtoServer(newTs, role); 
        
        const connection = await this.configs.getConnection(role);

        let res;
        try {
            const repositoryTs = connection.getRepository(Ts);
            const ts = repositoryTs.create(newTsServer);
            res = await repositoryTs.save(ts);
            if (res.id == null) {
                throw new HttpException('ТС с таким регистрационным номером уже существует!', HttpStatus.FORBIDDEN);
            } 
        }
        finally {
            await connection.close();
        }

        return res;
    }

    async findOne(findRegisterNumber: string, role: string): Promise<TsDto> {
        const connection = await this.configs.getConnection(role);

        let res;
        try {
            const repositoryTs = connection.getRepository(Ts);
            res = await repositoryTs.findOne({registernumber: findRegisterNumber });
        }
        finally {
            await connection.close();
            if (res) {
                const findPerson = await this.people.findOneById(res.owner, role);
                res = this.TsConvertToTsDto(res, findPerson.passport);
            }
        }

        return res;
    }


    async update(findRegisterNumber: string, updateTs: UpdateTsDtoClient,  role: string): Promise<Ts> {
        const updateTsServer = await this.UpdateTsDtoClientConvertToUpdateTsDtoServer(updateTs, role);
        console.log(updateTsServer);

        const connection = await this.configs.getConnection(role);
        let res;
        try {
            const repositoryTs = connection.getRepository(Ts);
            let findTs = await repositoryTs.findOne({registernumber: findRegisterNumber });
            const checkId = findTs.id;
            findTs.type = updateTsServer.type;
            findTs.brand = updateTsServer.brand;
            findTs.model = updateTsServer.model;
            findTs.color = updateTsServer.color;
            findTs.registernumber = updateTsServer.registernumber;
            findTs.owner = updateTsServer.owner
            res = await repositoryTs.save(findTs);
            res = await repositoryTs.findOne({id: checkId });
            
            if (res.registernumber != updateTsServer.registernumber) {
                    throw new HttpException('ТС с таким регистрационным номером уже существует!', HttpStatus.FORBIDDEN);
            }             
        }
        finally {
            await connection.close();
        }

        return res;
    }

    async remove(findRegisterNumber: string, role: string): Promise<Ts> {
        const connection = await this.configs.getConnection(role);

        let res;
        try {
            const repositoryTs = connection.getRepository(Ts);
            let findTs  = await repositoryTs.findOne({registernumber: findRegisterNumber });
            res = await repositoryTs.remove(findTs);
        }
        finally {
            await connection.close();
        }

        return res;
    }
}
