import { User } from '../entities/users/user.entity';
import { define, factory } from 'typeorm-seeding';
import Faker, { fake } from 'faker';
import { genSaltSync, hashSync } from 'bcrypt';

define(User, (faker: typeof Faker) => {
  const gender = faker.random.number(1);

  const username = faker.internet.userName();
  const password = '1234';
  const hashedPassword = hashSync(password, genSaltSync(12));

  const user = new User();
  user.username = faker.internet.userName();
  user.hashedPassword = hashedPassword;
  user.email = faker.internet.email();
  user.prefix = 'MR.';
  user.firstname = faker.name.firstName(gender);
  user.lastname = faker.name.lastName(gender);
  user.birthDate = faker.date.past(faker.random.number(18) + 18);
  user.address =
    '254 Phayathai Rd, Wang Mai, Pathum Wan District, Bangkok 10330';
  user.latitude = Number(faker.address.latitude());
  user.longtitude = Number(faker.address.longitude());
  user.telNumber = '0945555555';
  user.vertifyAt = null;
  user.isAdmin = false;
  user.avatarFile = null;
  user.province = '';
  user.tags = [];
  user.jobAnnouncements = [];
  user.files = [];

  return user;
});
