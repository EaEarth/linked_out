import { define, factory } from "typeorm-seeding"
import Faker, {fake} from 'faker';
import { JobApplication } from "../entities/job/jobApplication.entity";

define(JobApplication, (faker: typeof Faker) => {
    const application = new JobApplication()
    var rng = Math.floor(Math.random()*2)
    application.education = rng == 0 ? faker.lorem.paragraph(): "";
    rng = Math.floor(Math.random()*2)
    application.experience = rng == 0 ? faker.lorem.paragraph(): "";
    rng = Math.floor(Math.random()*2)
    application.feedback = rng == 0 ? faker.lorem.paragraph(): "";
    application.status = Math.floor(Math.random()*3)+1

    return application
  })
