import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { Tag } from 'src/entities/job/tag.entity';
import { User } from 'src/entities/users/user.entity';
import { FilesService } from 'src/files/files.service';
import { Repository } from 'typeorm';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let repo: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
          useValue: {
            find: jest.fn().mockImplementation((object: any) => {
              Promise.resolve(indexResult);
            }),
            findOne: jest
              .fn()
              .mockImplementation((condition: any, object: object = {}) => {
                var entity = undefined;
                for (let i = 0; i < indexResult.length; ++i) {
                  if (typeof condition == 'number') {
                    if (indexResult[i].id === condition) {
                      entity = indexResult[i];
                    }
                  }
                }
                return Promise.resolve(entity);
              }),
            save: jest.fn().mockImplementation((object: object) => {
              Promise.resolve({ id: 1, ...object });
            }),
          },
        },
        {
          provide: getRepositoryToken(Tag),
          useClass: Repository,
          useValue: {
            save: jest.fn().mockImplementation((object: object) => {
              Promise.resolve({ id: 1, ...object });
            }),
          },
        },
        {
          provide: FilesService,
          useValue: {
            findById: jest.fn().mockImplementation((id: number) => {
              Promise.resolve({
                id: id,
                title: 'default.jpg',
                type: 'image/jpeg',
                path: 'http://localhost:8000/api/files/default_profile_0.jpg',
              });
            }),
          },
        },
        {
          provide: JwtService,
          useValue: {
            verify: jest.fn().mockReturnValue({ sub: 1 }),
          },
        },
        {
          provide: CaslAbilityFactory,
          useValue: {
            createForUser: jest.fn().mockReturnValue({
              can: function (action, any) {
                return true;
              },
            }),
          },
        },
        {
          provide: ConfigService,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repo = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Basic index and get service', () => {
    it('index', async () => {
      expect(await service.index()).toBe(indexResult);
    });
    it('findById', async () => {
      expect(await service.findById(1)).toBe(indexResult[1]);
    });
    it('findByIdUserInfo', async () => {
      expect(await service.findById(2)).toBe(indexResult[2]);
    });
  });

  describe('Create, update, delete', () => {
    it('create user', async () => {
      expect(await service.create(create)).toBe(indexResult);
    });
  });
});

let indexResult = [
  {
    id: 1,
    username: 'Bianka_Schuster',
    hashedPassword:
      '$2b$12$NB/R8XKBpZ4Y01LznpCQn.v1fcvCBAZ8cPMasX5JN.mfNmGt/A06K',
    email: 'Victoria73@hotmail.com',
    prefix: 'MR.',
    firstname: 'Gilda',
    lastname: 'Lueilwitz',
    birthDate: '2021-04-01',
    address: '254 Phayathai Rd, Wang Mai, Pathum Wan District, Bangkok 10330',
    latitude: -23.6604,
    longtitude: -164.5428,
    telNumber: '0945555555',
    vertifyAt: null,
    isAdmin: false,
    province: 'นครปฐม',
    avatarFile: {
      id: 2,
      title: 'models_lavender_granite.fti',
      type: 'image/jpeg',
      path: 'http://localhost:8000/api/files/default_profile_0.jpg',
    },
    tags: [
      {
        id: 2,
        name: 'กฎหมาย',
      },
      {
        id: 5,
        name: 'ออกแบบ',
      },
    ],
  },
  {
    id: 2,
    username: 'Kenyatta_Osinski',
    hashedPassword:
      '$2b$12$toaIGeWsMz5NEAw3LrPqSOtU9s0mBDVrP.emsboI9efZ9E9Nr4Kti',
    email: 'Monte91@hotmail.com',
    prefix: 'MR.',
    firstname: 'Keyshawn',
    lastname: 'Beier',
    birthDate: '2020-09-09',
    address: '254 Phayathai Rd, Wang Mai, Pathum Wan District, Bangkok 10330',
    latitude: -74.3284,
    longtitude: -147.5317,
    telNumber: '0945555555',
    vertifyAt: null,
    isAdmin: false,
    province: 'กรุงเทพมหานคร',
    avatarFile: {
      id: 6,
      title: 'oklahoma_directives_designer.sv4crc',
      type: 'image/jpeg',
      path: 'http://localhost:8000/api/files/default_profile_1.jpg',
    },
    tags: [
      {
        id: 1,
        name: 'IT',
      },
    ],
  },
];

const create = {
  username: 'Kenyatta_Osinski',
  password: '123456',
  email: 'Monte91@hotmail.com',
  prefix: 'MR.',
  firstname: 'Keyshawn',
  lastname: 'Beier',
  birthDate: new Date('2020-09-09'),
  address: '254 Phayathai Rd, Wang Mai, Pathum Wan District, Bangkok 10330',
  latitude: -74.3284,
  longtitude: -147.5317,
  telNumber: '0945555555',
  vertifyAt: null,
  isAdmin: false,
  province: 'กรุงเทพมหานคร',
  tags: ['Testtag1'],
  avatarFileId: 2,
  jobAnnouncement: null,
};

const createOutput = {
  id: 2,
  username: 'Kenyatta_Osinski',
  password: '123456',
  email: 'Monte91@hotmail.com',
  prefix: 'MR.',
  firstname: 'Keyshawn',
  lastname: 'Beier',
  birthDate: '2020-09-09',
  address: '254 Phayathai Rd, Wang Mai, Pathum Wan District, Bangkok 10330',
  latitude: -74.3284,
  longtitude: -147.5317,
  telNumber: '0945555555',
  vertifyAt: null,
  isAdmin: false,
  province: 'กรุงเทพมหานคร',
  tags: [
    {
      id: 1,
      name: 'Testtag1',
    },
  ],
  avatarFile: {
    id: 2,
    title: 'default.jpg',
    type: 'image/jpeg',
    path: 'http://localhost:8000/api/files/default_profile_0.jpg',
  },
};
