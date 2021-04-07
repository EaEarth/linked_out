import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/users/user.entity';
import { Repository } from 'typeorm';
import { genSaltSync, hashSync } from "bcrypt";
import { createUser } from './dto/create-user.dto';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { Action } from 'src/policies/action.enum';
import { FilesService } from 'src/files/files.service';
import { updateUser } from './dto/update-user.dto';
import { Tag } from 'src/entities/job/tag.entity';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly repo: Repository<User>,
        @InjectRepository(Tag)
        private readonly tagRepo: Repository<Tag>,
        private readonly filesService: FilesService,
        private readonly caslAbilityFactory: CaslAbilityFactory,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService

    ) { }

    public async getUserFromAuthenticationToken(token: string) {
        const tokenArr = token.split('.')
        tokenArr.splice(3,tokenArr.length-3)
        const payload = this.jwtService.verify(tokenArr.join('.'), {
            secret: 'secretSuperMysteriesConfidentialHiddenConcealedDarknessKey'
        });
        if (payload.sub) {
            return this.findById(payload.sub);
        }
    }

    async index(): Promise<any> {
        return this.repo.find({ relations: ["avatarFile", "tags"] });
    }

    async findById(id: number): Promise<User | undefined> {
        return this.repo.findOne(id, { relations: ["avatarFile", "tags"] });
    }

    async findUserById(id: number): Promise<User | undefined> {
        return this.repo.findOne(id);
    }

    async findByUsername(username: string): Promise<User | undefined> {
        return this.repo.findOne({ username }, { relations: ["avatarFile", "tags"] });
    }

    async create({ password, tags, ...dto }: Omit<createUser, 'id'>): Promise<User> {
        const user = { ...new User(), ...dto };
        if (dto.avatarFileId) {
            user.avatarFile = await this.filesService.findById(dto.avatarFileId)
        }
        user.hashedPassword = this.hash(password);
        tags = [...new Set(tags)];
        var tagEntitys = []
        for (var i = 0; i < tags.length; i++) {
            var tagEntity = await this.tagRepo.findOne({ where: { name: tags[i] } });
            if (tagEntity === undefined) {
                tagEntity = { ...new Tag(), ...{ name: tags[i] } };
                await this.tagRepo.save(tagEntity)
                tagEntitys.push(tagEntity)
            }
            else {
                tagEntitys.push(tagEntity)
            }
        }
        user.tags = tagEntitys
        return this.repo.save(user);
    }

    async update(user: User, { tags, ...dto }: updateUser): Promise<User> {
        const ability = this.caslAbilityFactory.createForUser(user);
        const id = dto.id || user.id

        const updatedUser = { ...(await this.repo.findOne(id)), ...dto };
        if (updatedUser == undefined) throw new NotFoundException();

        if (!ability.can(Action.Update, updatedUser) && !(updatedUser.id == user.id)) throw new UnauthorizedException();
        if (dto.password) {
            updatedUser.hashedPassword = this.hash(dto.password);
        }
        if (dto.avatarFileId) {
            updatedUser.avatarFile = await this.filesService.findById(dto.avatarFileId)
        }
        tags = [...new Set(tags)];
        var tagEntitys = []
        for (var i = 0; i < tags.length; i++) {
            var tagEntity = await this.tagRepo.findOne({ where: { name: tags[i] } });
            if (tagEntity === undefined) {
                tagEntity = { ...new Tag(), ...{ name: tags[i] } };
                await this.tagRepo.save(tagEntity)
                tagEntitys.push(tagEntity)
            }
            else {
                tagEntitys.push(tagEntity)
            }
        }
        updatedUser.tags = tagEntitys;
        return this.repo.save(updatedUser);
    }

    async delete(user: User, id: number): Promise<User> {
        const ability = this.caslAbilityFactory.createForUser(user);
        const deleteUser = await this.repo.findOne(id);
        if (deleteUser == undefined) throw new NotFoundException();
        if (!ability.can(Action.Delete, deleteUser)) throw new UnauthorizedException();

        deleteUser.jobAnnouncements = null;
        deleteUser.avatarFile = null;
        this.repo.save(deleteUser);

        return this.repo.remove(deleteUser);
    }

    hash(pwd: string): string {
        const salt: string = genSaltSync(12);
        return hashSync(pwd, salt);
    }
}
