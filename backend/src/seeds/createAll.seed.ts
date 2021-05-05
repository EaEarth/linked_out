import { Factory, Seeder } from 'typeorm-seeding'
import { User } from '../entities/users/user.entity'
import { FileItem } from '../entities/files/fileItem.entity';
import { JobAnnouncement } from '../entities/job/jobAnnouncement.entity';
import { Tag } from '../entities/job/tag.entity';
import { JobApplication } from '../entities/job/jobApplication.entity';
import { ChatRoom } from '../entities/chats/chatRoom.entity';
import { Message } from '../entities/chats/message.entity';
import { PaymentSlip } from '../entities/payment/paymentSlip.entity';

export class CreateAll implements Seeder {
  //cross-env ENV=value ENV=value yarn seed:run
  tagEntity = [];
  userEntity = [];
  announcementEntity = [];
  async run(factory: Factory): Promise<any> {
    let f = await factory(FileItem)().create()
    for(let i = 0; i< 10 ; i++){
      if(f.id == 1) {
        this.tagEntity.push(await factory(Tag)().create({ name:initialTags[i] }))
      }
      else this.tagEntity.push(await factory(Tag)().create())
    }
    let qrCodePaymentFile = await factory(FileItem)().create({title:"qr_code_payment",path:`${process.env.URL}/api/files/qr_code_payment.jpg`});
    for (let i=0; i<10; i++){
      this.userEntity.push(
        await factory(User)()
          .map(async (user: User) : Promise<User> => {
            const file = await factory(FileItem)().create({ path:`${process.env.URL}/api/files/default_profile_${i%5}.jpg`});
            file.owner = user;
            user.avatarFile = file;
            user.jobAnnouncements = []
            user.tags = []
            user.paymentSlips = []

            // newly added
            if(i<5) user.province = 'กรุงเทพมหานคร'
            else user.province = provinces[Math.floor(Math.random()*provinces.length)]
            if(i<5){
              user.tags.push(this.tagEntity[0])
            }
            else{
              const idxTag = Math.floor(Math.random()*this.tagEntity.length)
              const idxTag2 = Math.floor(Math.random()*this.tagEntity.length)
              const idxTag3 = Math.floor(Math.random()*this.tagEntity.length)
              user.tags.push(this.tagEntity[idxTag])
              if(idxTag !== idxTag2){
                user.tags.push(this.tagEntity[idxTag2])
              }
              if(idxTag !== idxTag3 && idxTag2 !== idxTag3){
                user.tags.push(this.tagEntity[idxTag3])
              }
            }

            for(let j = 0; j<3; ++j){
              let job = await factory(JobAnnouncement)()
              .map(async (announcement : JobAnnouncement) : Promise<JobAnnouncement> => {
                let nameTag;
                if(i>5) {
                  nameTag = 0
                  announcement.province = 'กรุงเทพมหานคร'
                }
                else nameTag = Math.floor(Math.random()*this.tagEntity.length)
                const nameTag2 = Math.floor(Math.random()*this.tagEntity.length)
                const nameTag3 = Math.floor(Math.random()*this.tagEntity.length)
                announcement.tags.push(this.tagEntity[nameTag])
                if(nameTag !== nameTag2){
                  announcement.tags.push(this.tagEntity[nameTag2])
                }
                if(nameTag !== nameTag3 && nameTag2 !== nameTag3){
                  announcement.tags.push(this.tagEntity[nameTag3])
                }
                var nPic = 5
                var rng = Math.floor(Math.random()*nPic)
                const fileAnnounce = await factory(FileItem)().create({ path:`${process.env.URL}/api/files/default_announcement_${rng%nPic}.jpg`});
                announcement.picture = fileAnnounce
                fileAnnounce.jobAnnouncements = [announcement]
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
      for (var j = 0; j<2; j++){
        await factory(ChatRoom)()
        .map(async (chatRoom: ChatRoom) : Promise<ChatRoom> => {
          chatRoom.messages = [];

          const message = await factory(Message)({
            sender:this.userEntity[i]
          }).create();
          chatRoom.messages.push(message);

          const message2 = await factory(Message)({
            sender:this.userEntity[(i+1+j)%this.userEntity.length]
          }).create();
          chatRoom.messages.push(message2);

          chatRoom.jobAnnouncement = this.announcementEntity[i*3];
          chatRoom.recruiter = this.userEntity[i];
          chatRoom.applicant = this.userEntity[(i+1+j)%this.userEntity.length];
          return chatRoom;
        }).create()
      }
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
      for(let k =0; k<3;k++){
        await factory(PaymentSlip)()
        .map(async (slip: PaymentSlip) : Promise<PaymentSlip> =>{
          slip.payer = this.userEntity[i]
          slip.qrCodeFile = qrCodePaymentFile
          return slip
        }).create()
      }
    }

    // Creating Admin and job to mock only 'กรุงเทพมหานคร'
    await factory(User)().create({isAdmin:true});
  };

}

const initialTags = [
  'IT',
  'กฎหมาย',
  'การตลาด',
  'ช่างเทคนิค',
  'ออกแบบ',
  'ประสานงานทั่วไป',
  'การเงิน-ธนาคาร',
  'บริการลูกค้า',
  'บัญชี',
  'แม่บ้าน'
]

const provinces = [
  'นครราชสีมา',
  'เชียงใหม่',
  'กาญจนบุรี',
  'ตาก',
  'อุบลราชธานี',
  'สุราษฎร์ธานี',
  'ชัยภูมิ',
  'แม่ฮ่องสอน',
  'เพชรบูรณ์',
  'ลำปาง',
  'อุดรธานี',
  'เชียงราย',
  'น่าน',
  'เลย',
  'ขอนแก่น',
  'พิษณุโลก',
  'บุรีรัมย์',
  'นครศรีธรรมราช',
  'สกลนคร',
  'นครสวรรค์',
  'ศรีสะเกษ',
  'กำแพงเพชร',
  'ร้อยเอ็ด',
  'สุรินทร์',
  'อุตรดิตถ์',
  'สงขลา',
  'สระแก้ว',
  'กาฬสินธุ์',
  'อุทัยธานี',
  'สุโขทัย',
  'แพร่',
  'ประจวบคีรีขันธ์',
  'จันทบุรี',
  'พะเยา',
  'เพชรบุรี',
  'ลพบุรี',
  'ชุมพร',
  'นครพนม',
  'สุพรรณบุรี',
  'ฉะเชิงเทรา',
  'มหาสารคาม',
  'ราชบุรี',
  'ตรัง',
  'ปราจีนบุรี',
  'กระบี่',
  'พิจิตร',
  'ยะลา',
  'ลำพูน',
  'นราธิวาส',
  'ชลบุรี',
  'มุกดาหาร',
  'บึงกาฬ',
  'พังงา',
  'ยโสธร',
  'หนองบัวลำภู',
  'สระบุรี',
  'ระยอง',
  'พัทลุง',
  'ระนอง',
  'อำนาจเจริญ',
  'หนองคาย',
  'ตราด',
  'พระนครศรีอยุธยา',
  'สตูล',
  'ชัยนาท',
  'นครปฐม',
  'นครนายก',
  'ปัตตานี',
  'กรุงเทพมหานคร',
  'ปทุมธานี',
  'สมุทรปราการ',
  'อ่างทอง',
  'สมุทรสาคร',
  'สิงห์บุรี',
  'นนทบุรี',
  'ภูเก็ต',
  'สมุทรสงคราม',
];
