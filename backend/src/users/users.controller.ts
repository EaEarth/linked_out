import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post,Request, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
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
    async create(@Body() dto: createUser){
        const { hashedPassword, ...output } = await this.service.create(dto);
        return output;
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    @UsePipes(new ValidationPipe({whitelist:true, transform: true}))
    update(
        @Request() req,
        @Param('id',new ParseIntPipe()) id: number, 
        @Body() dto: updateUser,
    ) {
        return this.service.update(req.user,id,dto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    delete(@Request() req,@Param('id',new ParseIntPipe()) id: number){
        return this.service.delete(req.user,id)
    }

}
