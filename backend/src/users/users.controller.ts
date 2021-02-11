import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post,Request, UseGuards } from '@nestjs/common';
import { userInfo } from 'os';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/entities/users/user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly service: UsersService) {}

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return this.service.findById(req.user.id);
    }
    
    @Get(':id')
    findById(@Param('id',new ParseIntPipe()) id: number){
        return this.service.findById(id)
    }

    @Post()
    create(@Body() dto: Omit<User,'id'>){
        return this.service.create(dto);
    }
    
    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    update(
        @Param('id',new ParseIntPipe()) id: number, 
        @Body() dto: Partial<Omit<User,'id'>>,
    ) {
        return this.service.update(id,dto);
    }

    @Delete(':id')
    delete(@Param('id',new ParseIntPipe()) id: number){
        return this.service.delete(id)
    }

}
