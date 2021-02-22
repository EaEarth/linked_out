import { define } from "typeorm-seeding";
import Faker, {fake} from 'faker';
import { JobAnnouncement } from "../entities/job/jobAnnouncement.entity";

define(JobAnnouncement, (faker: typeof Faker) => {
    const announcement = new JobAnnouncement();
    announcement.address = "254 Phayathai Rd, Wang Mai, Pathum Wan District, Bangkok 10330"
    announcement.amountRequired= faker.random.number(10000)
    announcement.company = faker.company.companyName()
    announcement.description = faker.lorem.sentence()
    announcement.isPublished = faker.random.boolean()
    announcement.lowerBoundSalary = faker.random.number(10000)
    announcement.upperBoundSalary = faker.random.number(10000) + announcement.lowerBoundSalary
    announcement.province = faker.address.state()
    announcement.title = faker.random.words()
    announcement.tags = []
    
    return announcement;
})
