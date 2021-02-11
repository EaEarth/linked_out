import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

//export type User = any;

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly repo: Repository<User>,
    ){}
    
    findOne(inusername: string): Promise<User | undefined> {
        return this.repo.findOne({username: inusername});
    }

}
