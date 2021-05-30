import { Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
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
        return await this.dtpService.find(req.user.role);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    async findOneById(@Param('id') id: number, @Request() req) {
        return await this.dtpService.findById(id, req.user.role)
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

    @Get('count/dtp')
    async findCountDtp(@Request() req) {;
        return await this.dtpService.findCountDtp('читатель');
    }

    @Get('count/affdrivers/die')
    async findCountAffectedDriversDie(@Request() req) {
        return await this.dtpService.findCountAffectedDriversDie('читатель');
    }

    @Get('count/affdrivers/hurt')
    async findCountAffectedDriversHurt(@Request() req) {
        return await this.dtpService.findCountAffectedDriversHurt('читатель');
    }

    @Get('count/affothers/die')
    async findCountAffectedOthersDie(@Request() req) {
        return await this.dtpService.findCountAffectedOthersDie('читатель');
    }

    @Get('count/affothers/hurt')
    async findCountAffectedOthersHurt(@Request() req) {
        return await this.dtpService.findCountAffectedOthersHurt('читатель');
    }

    @Post('count/dtp/date')
    async findCountDtpDate(@Request() req) {
        return await this.dtpService.findCountDtpWithDate(req.body, 'читатель');
    }

    @Post('count/affdrivers/date/die')
    async findCountAffectedDriversDieDate(@Request() req) {
        return await this.dtpService.findCountAffectedDriversDieWithDate(req.body, 'читатель');
    }

    @Post('count/affdrivers/date/hurt')
    async findCountAffectedDriversHurtDate(@Request() req) {
        return await this.dtpService.findCountAffectedDriversHurtWithDate(req.body, 'читатель');
    }

    @Post('count/affothers/date/die')
    async findCountAffectedOthersDieDate(@Request() req) {
        return await this.dtpService.findCountAffectedOthersDieWithDate(req.body, 'читатель');
    }

    @Post('count/affothers/date/hurt')
    async findCountAffectedOthersHurtDate(@Request() req) {
        return await this.dtpService.findCountAffectedOthersHurtWithDate(req.body,'читатель');
    }

    @Post('count/dtp/dateandcategory')
    async findCountDtpDateAndCategory(@Request() req) {
        return await this.dtpService.findCountDtpWithDateCategory(req.body, 'читатель');
    }

    
    @Post('count/affdrivers/dateandcategory/die')
    async findCountAffectedDriversDieDateAndCategory(@Request() req) {
        return await this.dtpService.findCountAffectedDriversDieWithDateCategory(req.body, 'читатель');
    }

    @Post('count/affdrivers/dateandcategory/hurt')
    async findCountAffectedDriversHurtDateAndCategory(@Request() req) {
        return await this.dtpService.findCountAffectedDriversHurtWithDateCategory(req.body,'читатель');
    }

    @Post('count/affothers/dateandcategory/die')
    async findCountAffectedOthersDieDateAndCategory(@Request() req) {
        return await this.dtpService.findCountAffectedOthersDieWithDateCategory(req.body, 'читатель');
    }

    @Post('count/affothers/dateandcategory/hurt')
    async findCountAffectedOthersHurtDateAndCategory(@Request() req) {
        return await this.dtpService.findCountAffectedOthersHurtWithDateCategory(req.body, 'читатель');
    }

    @Get('count/dtp/city')
    async findCountDtpWithCity(@Request() req) {
        return await this.dtpService.findCountDtpWithCity('читатель');
    }

    @Get('count/affdrivers/city/die')
    async findCountAffectedDriversDieWithCity(@Request() req) {
        return await this.dtpService.findCountAffectedDriversDieWithCity('читатель');
    }

    @Get('count/affdrivers/city/hurt')
    async findCountAffectedDriversHurtWithCity(@Request() req) {
        return await this.dtpService.findCountAffectedDriversHurtWithCity('читатель');
    }

    @Get('count/affothers/city/die')
    async findCountAffectedOthersDieWithCity(@Request() req) {
        return await this.dtpService.findCountAffectedOthersDieWithCity('читатель');
    }

    @Get('count/affothers/city/hurt')
    async findCountAffectedOthersHurtWithCity(@Request() req) {
        return await this.dtpService.findCountAffectedOthersHurtWithCity('читатель');
    }

    @Post('count/dtp/city/date')
    async findCountDtpDateWithCity(@Request() req) {
        return await this.dtpService.findCountDtpWithDateAndCity(req.body, 'читатель');
    }

    @Get('date/info')
    async findDtpDate(@Request() req) {
        return await this.dtpService.findDtpDate('читатель');
    }

    @Post('count/affdrivers/city/date/die')
    async findCountAffectedDriversDieDateWithCity(@Request() req) {
        return await this.dtpService.findCountAffectedDriversDieWithDateAndCity(req.body, 'читатель');
    }

    @Post('count/affdrivers/city/date/hurt')
    async findCountAffectedDriversHurtDateWithCity(@Request() req) {
        return await this.dtpService.findCountAffectedDriversHurtWithDateAndCity(req.body, 'читатель');
    }

    @Post('count/affothers/city/date/die')
    async findCountAffectedOthersDieDateWithCity(@Request() req) {
        return await this.dtpService.findCountAffectedOthersDieWithDateAndCity(req.body, 'читатель');
    }

    @Post('count/affothers/city/date/hurt')
    async findCountAffectedOthersHurtDateWithCity(@Request() req) {
        return await this.dtpService.findCountAffectedOthersHurtWithDateAndCity(req.body,'читатель');
    }

    @Post('count/dtp/city/dateandcategory')
    async findCountDtpDateAndCategoryWithCity(@Request() req) {
        return await this.dtpService.findCountDtpWithDateCategoryAndCity(req.body, 'читатель');
    }

    
    @Post('count/affdrivers/city/dateandcategory/die')
    async findCountAffectedDriversDieDateAndCategoryWithCity(@Request() req) {
        return await this.dtpService.findCountAffectedDriversDieWithDateCategoryAndCity(req.body, 'читатель');
    }

    @Post('count/affdrivers/city/dateandcategory/hurt')
    async findCountAffectedDriversHurtDateAndCategoryWithCity(@Request() req) {
        return await this.dtpService.findCountAffectedDriversHurtWithDateCategoryAndCity(req.body,'читатель');
    }

    @Post('count/affothers/city/dateandcategory/die')
    async findCountAffectedOthersDieDateAndCategoryWithCity(@Request() req) {
        return await this.dtpService.findCountAffectedOthersDieWithDateCategoryAndCity(req.body, 'читатель');
    }

    @Post('count/affothers/city/dateandcategory/hurt')
    async findCountAffectedOthersHurtDateAndCategoryWithCity(@Request() req) {
        return await this.dtpService.findCountAffectedOthersHurtWithDateCategoryAndCity(req.body, 'читатель');
    }
}