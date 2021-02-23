import { Factory, Seeder } from 'typeorm-seeding'
import { User } from '../entities/users/user.entity'
import { FileItem } from '../entities/files/fileItem.entity';
import { JobAnnouncement } from '../entities/job/jobAnnouncement.entity';
import { Tag } from '../entities/job/tag.entity';
import Faker, {fake} from 'faker';

export class CreateAll implements Seeder {
  
  tagEntity = []
  async run(factory: Factory): Promise<any> {
    for(let i = 0; i< 10 ; i++){
      this.tagEntity.push(await factory(Tag)().create())
    }
    await factory(User)()
      .map(async (user: User) : Promise<User> => {
        const file = await factory(FileItem)().create();
        file.owner = user;
        user.avatarFile = file;
        user.jobAnnouncements = []

        for(let i = 0; i<3; ++i){
          let job = await factory(JobAnnouncement)()
          .map(async (announcement : JobAnnouncement) : Promise<JobAnnouncement> => {
            const nameTag = Math.floor(Math.random()*this.tagEntity.length)
            const nameTag2 = Math.floor(Math.random()*this.tagEntity.length)
            const nameTag3 = Math.floor(Math.random()*this.tagEntity.length)
            announcement.tags.push(this.tagEntity[nameTag])
            if(nameTag !== nameTag2){
              announcement.tags.push(this.tagEntity[nameTag2])
            }
            if(nameTag !== nameTag3 && nameTag2 !== nameTag3){
              announcement.tags.push(this.tagEntity[nameTag3])
            }
            announcement.picture = file
            file.jobAnnouncements = [announcement]
            return announcement
          }).create();
          job.owner = user;
          user.jobAnnouncements.push(job)
        }
        return user;
      })
      .createMany(10);
  };

}
