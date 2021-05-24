import { Controller, Get, Post, Put, Delete, Param, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PeopleService } from './people.service';

@Controller('people')
export class PeopleController {

    constructor(private peopleService: PeopleService) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    async create(@Request() req) {
        return await this.peopleService.create(req.body, req.user.role)
    }

    @Get('passport/:number')
    @UseGuards(JwtAuthGuard)
    async findOne(@Param('number') passportNumber: string, @Request() req) {
        return await this.peopleService.findOne(passportNumber, req.user.role)
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    async findOneById(@Param('id') id: number, @Request() req) {
        return await this.peopleService.findOneById(id, req.user.role)
    }

    @Get('die/passport/:number')
    @UseGuards(JwtAuthGuard)
    async findOneDied(@Param('number') passportNumber: string, @Request() req) {
        return await this.peopleService.findOneDied(passportNumber, req.user.role)
    }


    @Put('passport/:number')
    @UseGuards(JwtAuthGuard)
    async update(@Param('number') passportNumber: string, @Request() req) {
        return await this.peopleService.update(passportNumber, req.body, req.user.role)
    }


    @Delete('passport/:number')
    @UseGuards(JwtAuthGuard)
    async remove(@Param('number') passportNumber: string, @Request() req) {
        return await this.peopleService.remove(passportNumber, req.user.role)
    }
}