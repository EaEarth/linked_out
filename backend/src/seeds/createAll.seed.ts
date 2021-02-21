import { Factory, Seeder } from 'typeorm-seeding'
import { Connection } from 'typeorm'
import { User } from '../entities/users/user.entity'
import { FileItem } from '../entities/files/fileItem.entity';

export class CreateAll implements Seeder {
  async run(factory: Factory): Promise<any> {
    await factory(User)()
      .map(async (user: User) : Promise<any> => {
        const file = await factory(FileItem)().create();
        file.owner = user;
        user.avatarFile = file;
        return user;
      })
      .createMany(10);
  };

}
