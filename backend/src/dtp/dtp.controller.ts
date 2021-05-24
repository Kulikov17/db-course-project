import { Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { DtpService } from './dtp.service';
import { PeopleService } from '../people/people.service';
import { TsService } from '../ts/ts.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('dtp')
export class DtpController {
    constructor(private dtpService: DtpService) {}

    @Get('countregion')
    async findAllInfo(@Request() req) {;
        return await this.dtpService.findAllInfoByRegion('администратор');
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    async findAll(@Request() req) {;
        return await this.dtpService.find(req.user.role);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    async findOneById(@Param('id') id: number, @Request() req) {
        return await this.dtpService.findById(id, req.user.role)
    }

    @Get('affecteddrivers')
    @UseGuards(JwtAuthGuard)
    async findAllAffectedDrivers(@Request() req) {;
        return await this.dtpService.findAllAffectedDrivers(req.user.role);
    }

    @Get('affectedothers')
    @UseGuards(JwtAuthGuard)
    async findAllAffectedOthers(@Request() req) {;
        return await this.dtpService.findAllAffectedOthers(req.user.role);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    async create(@Request() req) {
        return await this.dtpService.create(req.body, req.user.role);
    }

    @Post('affecteddrivers')
    @UseGuards(JwtAuthGuard)
    async createAffectedDrivers(@Request() req) {
        return await this.dtpService.createAffectedDrivers(req.body, req.user.role);
    }

    @Post('affectedothers')
    @UseGuards(JwtAuthGuard)
    async createAffectedOthers(@Request() req) {
        return await this.dtpService.createAffectedOthers(req.body, req.user.role);
    }

    @Put('description/:id')
    @UseGuards(JwtAuthGuard)
    async updateDescription(@Param('id') id: number, @Request() req) {
        return await this.dtpService.updateDescription(id, req.body, req.user.role)
    }


    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    async remove(@Param('id') id: number, @Request() req) {
        return await this.dtpService.remove(id, req.user.role)
    }
}