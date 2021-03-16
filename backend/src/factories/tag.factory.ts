import { define } from 'typeorm-seeding';
import Faker, { fake } from 'faker';
import { Tag } from '../entities/job/tag.entity';

define(Tag, (faker: typeof Faker) => {
  const tag = new Tag();
  tag.name = faker.name.jobTitle();

  return tag;
});
