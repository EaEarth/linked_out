import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post,Request, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { userInfo } from 'os';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/entities/users/user.entity';
import { createUser } from './dto/create-user.dto';
import { updateUser } from './dto/update-user.dto';
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
    @UsePipes(new ValidationPipe({whitelist:true, transform: true}))
    create(@Body() dto: createUser){
        console.log(dto);
        return this.service.create(dto);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    @UsePipes(new ValidationPipe({whitelist:true, transform: true}))
    update(
        @Param('id',new ParseIntPipe()) id: number, 
        @Body() dto: updateUser,
    ) {
        return this.service.update(id,dto);
    }

    @Delete(':id')
    delete(@Param('id',new ParseIntPipe()) id: number){
        return this.service.delete(id)
    }

}
