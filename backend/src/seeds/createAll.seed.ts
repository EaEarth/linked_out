import { Factory, Seeder } from 'typeorm-seeding'
import { User } from '../entities/users/user.entity'
import { FileItem } from '../entities/files/fileItem.entity';
import { JobAnnouncement } from '../entities/job/jobAnnouncement.entity';
import { Tag } from '../entities/job/tag.entity';
import { JobApplication } from '../entities/job/jobApplication.entity';

export class CreateAll implements Seeder {
  
  tagEntity = [];
  userEntity = [];
  announcementEntity = [];
  async run(factory: Factory): Promise<any> {
    await factory(FileItem)().create()
    for(let i = 0; i< 10 ; i++){
      this.tagEntity.push(await factory(Tag)().create())
    }
    for (let i=0; i<10; i++){
      this.userEntity.push(
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
              this.announcementEntity.push(job)
            }
            return user;
        })
        .create()
      )
    }
    var rng
    for(var i = 0; i<10; i++){
      await factory(JobApplication)()
      .map(async (application : JobApplication) : Promise<JobApplication> => {
        application.applicant = this.userEntity[i];

        rng = Math.floor(Math.random()*2)
        if(i == 0 || rng == 0){
          const file = await factory(FileItem)().create();
          file.owner = this.userEntity[i];
          application.resume = file;
        } else application.resume = null

        rng = Math.floor(Math.random()*2)
        if(i == 0 || rng == 0){
          const file = await factory(FileItem)().create();
          file.owner = this.userEntity[i];
          application.coverLetter = file;
        } else application.coverLetter = null;

        rng = Math.floor(Math.random()*2)
        if(i == 0 || rng == 0){
          const file = await factory(FileItem)().create();
          file.owner = this.userEntity[i];
          application.transcript = file;
        }else application.transcript = null;
        
        rng = Math.floor(Math.random()*this.announcementEntity.length)
        if(rng == i) rng = (i+1)%this.announcementEntity.length;
        application.jobAnnouncement = this.announcementEntity[rng];

        return application
      }).create()
    }

    await factory(User)().create({isAdmin:true});
  };

}
