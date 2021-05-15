import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { DtpService } from './dtp.service';
import { Dtp } from './dtp.entity';
import { Roles } from '../roles.decorator';
import { Reflector } from '@nestjs/core';

@Controller('dtp')
export class DtpController {
    constructor(private dtpService: DtpService,
        private readonly reflector: Reflector) {}

    @Get()
    @Roles('admin','user')
    async findAll() {;
        return await this.dtpService.getAll();
    }

    /*@Post()
    async create(@Body() newDtp: Dtp) {
        return await this.dtpService.create(newDtp);
    }*/
}