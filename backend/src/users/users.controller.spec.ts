import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Repository } from 'typeorm';
import { User } from '../entities/users/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { isEmail } from 'class-validator';
import { createUser } from './dto/create-user.dto';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            get: jest.fn(() => {
              username: 'test';
            }),
            index: jest.fn().mockReturnValue(Promise.resolve(indexResult)),
            findById: jest.fn().mockImplementation((id:number) => {
              return Promise.resolve({id:id, hashedPassword:'testHashed', email:'test@email.com'})
            }),
            create: jest.fn().mockImplementation((dto) =>{
              return Promise.resolve({id:99, ...dto})
            }),
            update: jest.fn().mockImplementation((user,dto) => {
              return Promise.resolve({id:user.id, ...dto})
            }),
            delete: jest.fn().mockImplementation((user,id) => {
              return Promise.resolve({id:id})
            }),
          }
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  describe('Basic index and get API', () => {

    it('Indexing should return array of users', async () => {
      expect(await controller.index()).toBe(indexResult);
      expect(service.index).toHaveBeenCalled();
    });

    it('Getting User profile', async () => {
      expect(await (await controller.getProfile({user:{id:10}})).id).toBe(10);
    })

    it('Getting User by ID', async () => {
      expect(await (await controller.findById(20)).id).toBe(20);
    })

  });

  describe('Create, Update, Delete User API', () => {
    
    it('Create User', async () => {
      let { hashedPassword,...expectedDto} = createDto
      expect(await (await controller.create(createDto))).toStrictEqual({id:99,...expectedDto});
    })

    it('Update User', async () => {
      expect((await controller.update({ user: { id: 25 } }, updatedDto))).toStrictEqual(updatedDto);
    })

    it('Delete User', async () => {
      expect((await controller.delete({ user: { id: 25 } }, 25)).id).toBe(25)
    })

  });

  it('Controller is defined', () => {
    expect(controller).toBeDefined();
  });
});

let createDto = {
  "username": "test13",
  "password": "1234",
  "hashedPassword": "1234",
  "email": "puttipat1.ketpuponp@gmail.com",
  "prefix": "MR.",
  "firstname": "Puttipat",
  "lastname": "Ketpupong",
  "birthDate": null,
  "address": "Home",
  "latitude": 12.22,
  "longtitude": 13.11,
  "telNumber": "0945476905",
  "avatarFileId": null,
  "province": "กรุงเทพ",
  "vertifyAt": null,
  "isAdmin": false,
  "tags": [],
  "jobAnnouncement": []
}

let updatedDto = {
  "id": 25,
  "username": "test13",
  "password": "12345678",
  "hashedPassword": "12345678",
  "email": "puttipat1.ketpuponp@gmail.com",
  "prefix": "MR.",
  "firstname": "Puttipat",
  "lastname": "Ketpupong",
  "birthDate": null,
  "address": "Home",
  "latitude": 12.22,
  "longtitude": 13.11,
  "telNumber": "0945476905",
  "avatarFileId": null,
  "province": "กรุงเทพ",
  "vertifyAt": null,
  "isAdmin": false,
  "tags": [],
  "jobAnnouncement": []
}

let indexResult = [
  {
    "id": 1,
    "username": "Bianka_Schuster",
    "hashedPassword": "$2b$12$NB/R8XKBpZ4Y01LznpCQn.v1fcvCBAZ8cPMasX5JN.mfNmGt/A06K",
    "email": "Victoria73@hotmail.com",
    "prefix": "MR.",
    "firstname": "Gilda",
    "lastname": "Lueilwitz",
    "birthDate": "2021-04-01",
    "address": "254 Phayathai Rd, Wang Mai, Pathum Wan District, Bangkok 10330",
    "latitude": -23.6604,
    "longtitude": -164.5428,
    "telNumber": "0945555555",
    "vertifyAt": null,
    "isAdmin": false,
    "province": "นครปฐม",
    "avatarFile": {
      "id": 2,
      "title": "models_lavender_granite.fti",
      "type": "image/jpeg",
      "path": "http://localhost:8000/api/files/default_profile_0.jpg"
    },
    "tags": [
      {
        "id": 2,
        "name": "กฎหมาย"
      },
      {
        "id": 5,
        "name": "ออกแบบ"
      }
    ]
  },
  {
    "id": 2,
    "username": "Kenyatta_Osinski",
    "hashedPassword": "$2b$12$toaIGeWsMz5NEAw3LrPqSOtU9s0mBDVrP.emsboI9efZ9E9Nr4Kti",
    "email": "Monte91@hotmail.com",
    "prefix": "MR.",
    "firstname": "Keyshawn",
    "lastname": "Beier",
    "birthDate": "2020-09-09",
    "address": "254 Phayathai Rd, Wang Mai, Pathum Wan District, Bangkok 10330",
    "latitude": -74.3284,
    "longtitude": -147.5317,
    "telNumber": "0945555555",
    "vertifyAt": null,
    "isAdmin": false,
    "province": "กรุงเทพมหานคร",
    "avatarFile": {
      "id": 6,
      "title": "oklahoma_directives_designer.sv4crc",
      "type": "image/jpeg",
      "path": "http://localhost:8000/api/files/default_profile_1.jpg"
    },
    "tags": [
      {
        "id": 1,
        "name": "IT"
      }
    ]
  }
]