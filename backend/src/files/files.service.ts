import { Injectable, Req, Res, UploadedFile } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { FileItem } from 'src/entities/files/fileItem.entity';
import { User } from 'src/entities/users/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FilesService {
    constructor(
        @InjectRepository(FileItem)
        private readonly repo: Repository<FileItem>,
        private readonly caslAbilityFactory: CaslAbilityFactory
    ){}

    index(user: User): Promise<FileItem[] | undefined> {
        return this.repo.find();
    }

    findById(id: number): Promise<FileItem | undefined> {
        return this.repo.findOne(id);
    }

    findByTitle(title: string): Promise<FileItem | undefined> {
        return this.repo.findOne({title:title});
    }

    createFile(@Req() req,@UploadedFile() file){
        const newFile = new FileItem();
        newFile.title = file.filename;
        newFile.type = file.mimetype;
        newFile.path = `${req.protocol}//${req.headers.host}/api/files/${file.filename}`;

        newFile.owner = req.user;
        console.log(newFile);
        return this.repo.save(newFile);
    }

    serveStatic(file: string, @Res() res){
        res.sendFile(file, {root: "uploads"}, (err:any)=>{
            if (err) {
                res
                  .status(404)
                  .json({
                    status: 404,
                    error: "Bad Request",
                    message: "Image isn't found"
                  })
                  .end();
            }
        });
    }
}
