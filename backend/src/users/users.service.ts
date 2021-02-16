import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/users/user.entity';
import { Repository } from 'typeorm';
import { genSaltSync, hashSync} from "bcrypt";
import { createUser } from './dto/create-user.dto';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { Action } from 'src/policies/action.enum';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly repo: Repository<User>,
        private readonly caslAbilityFactory: CaslAbilityFactory
    ){}
    
    findById(id: number): Promise<User | undefined> {
        return this.repo.findOne(id);
    }

    findByUsername(username: string): Promise<User | undefined> {
        return this.repo.findOne({username});
    }

    async create(dto: Omit<createUser, 'id'>): Promise<User>{
        const user = { ...new User(), ...dto};
        user.hashedPassword = this.hash(dto.hashedPassword);
        return this.repo.save(user);
    }

    async update(user: User,id: number,dto: Partial<Omit<User, 'id' | 'password'>>): Promise<User>{
        const updatedUser = { ...(await this.repo.findOne(id)), ...dto };
        const ability = this.caslAbilityFactory.createForUser(user);
        if(updatedUser == undefined) throw new NotFoundException();
        if(!ability.can(Action.Update,updatedUser) && !(updatedUser.id == user.id)) throw new UnauthorizedException();
        if (dto.hashedPassword) {
            updatedUser.hashedPassword = this.hash(dto.hashedPassword);
        }
        return this.repo.save(updatedUser);
    }

    async delete(user: User,id: number): Promise<User>{
        const ability = this.caslAbilityFactory.createForUser(user);
        const deleteUser = await this.repo.findOne(id);
        if(deleteUser == undefined) throw new NotFoundException();
        if(!ability.can(Action.Update,deleteUser)) throw new UnauthorizedException();

        deleteUser.jobAnnouncements = [];
        this.repo.save(deleteUser);
        
        await this.repo.remove(user);
        return user;
    }

    hash(pwd: string): string{
        const salt: string = genSaltSync(12);
        return hashSync(pwd, salt);
    }
}
