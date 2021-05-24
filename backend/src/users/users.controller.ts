import { Controller, Post, Delete, UseGuards, Request, Param, Put, Get } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UsersService } from './users.service';


@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) {}

    @Get()
    @UseGuards(JwtAuthGuard)
    async find() {
        return await this.usersService.find();
    }

    @Get('/:username')
    @UseGuards(JwtAuthGuard)
    async findOne(@Param('username') username: string) {
        return await this.usersService.findOneByUsername(username);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    async create(@Request() req) {
        return await this.usersService.create(req.body)
    }

    @Put('resetpassword/:username')
    @UseGuards(JwtAuthGuard)
    async resetPassword(@Param('username') username: string) {
        return await this.usersService.resetPassword(username);
    }

    @Put('updatepassword')
    @UseGuards(JwtAuthGuard)
    async updatePassword(@Request() req) {
        return await this.usersService.updatePassword(req.body);
    }

    @Put('setrole')
    @UseGuards(JwtAuthGuard)
    async setRole(@Request() req) {
        return await this.usersService.setRole(req.body);
    }

    @Delete(':username')
    @UseGuards(JwtAuthGuard)
    async remove(@Param('username') username: string) {
        return await this.usersService.remove(username)
    }
}
