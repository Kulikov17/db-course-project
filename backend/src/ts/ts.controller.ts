import { Controller, Get, Post, Put, Delete, Param, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { TsService } from './ts.service';

@Controller('ts')
export class TsController {

    constructor(private tsService: TsService) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    async create(@Request() req) {
        return await this.tsService.create(req.body, req.user.role)
    }

    @Get('registerNumber/:number')
    @UseGuards(JwtAuthGuard)
    async findOne(@Param('number') registerNumber: string, @Request() req) {
        return await this.tsService.findOne(registerNumber, req.user.role)
    }

    @Put('registerNumber/:number')
    @UseGuards(JwtAuthGuard)
    async update(@Param('number') registerNumber: string, @Request() req) {
        return await this.tsService.update(registerNumber, req.body, req.user.role)
    }

    @Delete('registerNumber/:number')
    @UseGuards(JwtAuthGuard)
    async remove(@Param('number') registerNumber: string, @Request() req) {
        return await this.tsService.remove(registerNumber, req.user.role)
    }
}