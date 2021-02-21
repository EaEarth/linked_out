import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/users/user.entity';
import { Repository } from 'typeorm';
import { genSaltSync, hashSync} from "bcrypt";
import { createUser } from './dto/create-user.dto';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { Action } from 'src/policies/action.enum';
import { FilesService } from 'src/files/files.service';
import { FileItem } from 'src/entities/files/fileItem.entity';
import { updateUser } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly repo: Repository<User>,
        private readonly filesService: FilesService,
        private readonly caslAbilityFactory: CaslAbilityFactory
    ){}

    async index(): Promise<any> {
        return this.repo.find({relations:["avatarFile"]});
    }
    
    async findById(id: number): Promise<User | undefined> {
        return this.repo.findOne(id,{relations:["avatarFile"]});
    }

    findByUsername(username: string): Promise<User | undefined> {
        return this.repo.findOne({username},{relations:["avatarFile"]});
    }

    async create({password,...dto}: Omit<createUser, 'id'>): Promise<User>{
        const user = { ...new User(), ...dto};
        if (dto.avatarFileId) {
            user.avatarFile = await this.filesService.findById(dto.avatarFileId)
        }
        user.hashedPassword = this.hash(password);
        return this.repo.save(user);
    }

    async update(user: User,{id,...dto}: updateUser): Promise<User>{
        const ability = this.caslAbilityFactory.createForUser(user);
        if(id){
            if(!ability.can(Action.Manage,'all')) throw new UnauthorizedException();
        }
        else {
            id = user.id;
        }
        const updatedUser = { ...(await this.repo.findOne(id)), ...dto };
        if(updatedUser == undefined) throw new NotFoundException();
        if(!ability.can(Action.Update,updatedUser) && !(updatedUser.id == user.id)) throw new UnauthorizedException();
        if (dto.password) {
            updatedUser.hashedPassword = this.hash(dto.password);
        }
        if (dto.avatarFileId) {
            updatedUser.avatarFile = await this.filesService.findById(dto.avatarFileId)
        }
        return this.repo.save(updatedUser);
    }

    async delete(user: User,id: number): Promise<User>{
        const ability = this.caslAbilityFactory.createForUser(user);
        const deleteUser = await this.repo.findOne(id);
        if(deleteUser == undefined) throw new NotFoundException();
        if(!ability.can(Action.Delete,deleteUser)) throw new UnauthorizedException();

        deleteUser.jobAnnouncements = null;
        deleteUser.avatarFile = null;
        this.repo.save(deleteUser);
        
        return this.repo.remove(deleteUser);
    }

    hash(pwd: string): string{
        const salt: string = genSaltSync(12);
        return hashSync(pwd, salt);
    }
}
