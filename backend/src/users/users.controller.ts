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
    async getProfile(@Request() req) {
        const { hashedPassword, ...output } = await this.service.findById(req.user.id);
        return output;
    }
    
    @Get()
    async index(){
        return this.service.index();
    }

    @Get(':id')
    async findById(@Param('id',new ParseIntPipe()) id: number){
        const { hashedPassword, ...output } = await this.service.findById(id);
        return output;
    }

    @Post()
    @UsePipes(new ValidationPipe({whitelist:true, transform: true}))
    async create(@Body() dto: createUser){
        const { hashedPassword, ...output } = await this.service.create(dto);
        return output;
    }

    @UseGuards(JwtAuthGuard)
    @Patch()
    @UsePipes(new ValidationPipe({whitelist:true, transform: true}))
    update(
        @Request() req, 
        @Body() dto: updateUser,
    ) {
        return this.service.update(req.user,dto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    delete(@Request() req,@Param('id',new ParseIntPipe()) id: number){
        return this.service.delete(req.user,id)
    }

}
