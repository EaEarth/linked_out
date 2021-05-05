import { define } from "typeorm-seeding";
import Faker, {fake} from 'faker';
import { FileItem } from "../entities/files/fileItem.entity";

define(FileItem, (faker: typeof Faker) => {
    const file = new FileItem();
    file.title = faker.system.fileName('jpeg')
    file.type = "image/jpeg"
    file.path = `${process.env.URL}/api/files/default.jpg`
    
    return file;
})
