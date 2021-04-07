import { define } from 'typeorm-seeding';
import Faker, { fake } from 'faker';
import { JobAnnouncement } from '../entities/job/jobAnnouncement.entity';

define(JobAnnouncement, (faker: typeof Faker) => {
  const province = [
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
  const announcement = new JobAnnouncement();
  announcement.address =
    '254 Phayathai Rd, Wang Mai, Pathum Wan District, Bangkok 10330';
  announcement.amountRequired = faker.random.number(10000);
  announcement.company = faker.company.companyName();
  announcement.description = faker.lorem.sentence();
  announcement.isPublished = true;
  // announcement.isPublished = faker.random.boolean();
  announcement.lowerBoundSalary = faker.random.number(10000);
  announcement.upperBoundSalary =
    faker.random.number(10000) + announcement.lowerBoundSalary;
  announcement.province = province[Math.floor(Math.random() * province.length)];
  announcement.title = faker.random.words();
  announcement.tags = [];

  return announcement;
});
