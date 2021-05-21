import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { DtpService } from './dtp.service';
import { PeopleService } from '../people/people.service';
import { TsService } from '../ts/ts.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('dtp')
export class DtpController {
    constructor(private dtpService: DtpService) {}

    @Get()
    @UseGuards(JwtAuthGuard)
    async findAll(@Request() req) {;
        return await this.dtpService.findAllDtp(req.user.role);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    async create(@Request() req) {
        return await this.dtpService.create(req.body, req.user.role);
    }
}