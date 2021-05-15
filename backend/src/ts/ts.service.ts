import { Injectable } from '@nestjs/common';
import { ConfigService } from '../config.service';
import { PeopleService } from '../people/people.service';
import { Ts } from './entities/ts.entity';
import { CreateTsDtoClient, CreateTsDtoServer } from './dto/create-ts';
import { UpdateTsDtoClient, UpdateTsDtoServer } from './dto/update-ts';
import { ConversionService } from '@fabio.formosa/metamorphosis-nest';
import { TsDto } from './dto/ts';

@Injectable()
export class TsService {

    constructor(private configs: ConfigService,
         private people: PeopleService) {}

    public TsConvertToTsDto(source: Ts, ownerPassport: String): TsDto {
        const target = new TsDto();
        target.type = source.type;
        target.brand = source.brand;
        target.model = source.model;
        target.color = source.model;
        target.registerNumber = source.registerNumber;
        target.ownerPassport = ownerPassport;
        return target;
    }

    public async CreateTsDtoClientConvertToCreateTsDtoServer(source: CreateTsDtoClient, role: string): Promise<CreateTsDtoServer> {
        const findPerson = await this.people.findOne(source.ownerPassport, role);
        const target = new CreateTsDtoServer();
        target.type = source.type
        target.brand = source.brand
        target.model = source.model
        target.color = source.color
        target.registerNumber = source.registerNumber
        target.owner = findPerson.id
        return target;
    }

    public async UpdateTsDtoClientConvertToUpdateTsDtoServer(source: UpdateTsDtoClient, role: string): Promise<UpdateTsDtoServer> {
        const findPerson = await this.people.findOne(source.ownerPassport, role);
        const target = new CreateTsDtoServer();
        target.type = source.type.toString();
        target.brand = source.brand.toString();
        target.model = source.model.toString();
        target.color = source.color.toString();
        target.registerNumber = source.registerNumber.toString();
        target.owner = findPerson.id
        return target;
    }

    async create(newTs: CreateTsDtoClient, role: string): Promise<Ts> {
        
        console.log(newTs);
        const newTsServer = await this.CreateTsDtoClientConvertToCreateTsDtoServer(newTs, role); 
        
        const connection = await this.configs.getConnection(role);

        let res;
        try {
            const repositoryTs = connection.getRepository(Ts);
            const ts = repositoryTs.create(newTsServer);
            res = await repositoryTs.save(ts); 
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
            res = await repositoryTs.findOne({registerNumber: findRegisterNumber });
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
        const connection = await this.configs.getConnection(role);
        const updateTsServer = await this.UpdateTsDtoClientConvertToUpdateTsDtoServer(updateTs, role);

        let res;
        try {
            const repositoryTs = connection.getRepository(Ts);
            let findTs = await repositoryTs.findOne({registerNumber: findRegisterNumber });
            findTs.type = updateTsServer.type;
            findTs.brand = updateTsServer.brand;
            findTs.model = updateTsServer.model;
            findTs.color = updateTsServer.color;
            findTs.registerNumber = updateTsServer.registerNumber;
            findTs.owner = updateTsServer.owner
            res = await repositoryTs.save(findTs); 
            
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
            let findTs  = await repositoryTs.findOne({registerNumber: findRegisterNumber });
            res = await repositoryTs.remove(findTs);
        }
        finally {
            await connection.close();
        }

        return res;
    }
}
