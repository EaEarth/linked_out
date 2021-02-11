import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/users/user.entity';
import { Repository } from 'typeorm';
import { genSaltSync, hashSync} from "bcrypt";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly repo: Repository<User>
    ){}
    
    findById(id: number): Promise<User | undefined> {
        return this.repo.findOne(id);
    }

    findByUsername(username: string): Promise<User | undefined> {
        return this.repo.findOne({username});
    }

    async create(dto: Omit<User, 'id'>): Promise<User>{
        const user = { ...new User(), ...dto};
        user.hashedPassword = this.hash(dto.hashedPassword);
        return this.repo.save(user);
    }

    async update(id: number,dto: Partial<Omit<User, 'id' | 'password'>>): Promise<User>{
        const user = { ...(await this.repo.findOne(id)), ...dto };
        if (dto.hashedPassword) {
            user.hashedPassword = this.hash(dto.hashedPassword);
        }
        return this.repo.save(user);
    }

    async delete(id: number): Promise<User>{
        const user = await this.repo.findOne(id);
        await this.repo.remove(user);
        return user;
    }

    hash(pwd: string): string{
        const salt: string = genSaltSync(12);
        return hashSync(pwd, salt);
    }
}
