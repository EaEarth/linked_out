---
id: ChatRoom
title: ChatRoom
---

## `POST` api/chat/chat-room

---

**Description**

```js
Create a new chat room
```

**Guard**

```js
["JwtAuthGuard"];
```

**Parameters**

```js
Body
{
    "applicantId": "required | number",
    "jobAnnouncementId": "required | number"
}
```

**Response**

```json
{
  "id": "chat room id",
  "recruiter": {
    "id": "userId",
    "username": "username",
    "hashedPassword": "hashedPassword",
    "email": "email",
    "prefix": "prefix",
    "firstname": "firstName",
    "lastname": "lastName",
    "birthDate": "birthDate",
    "address": "address",
    "latitude": "latitude",
    "longtitude": "longtitude",
    "telNumber": "telNumber",
    "vertifyAt": "vertifyAt",
    "isAdmin": "isAdmin",
    "avatarFile": {
      "id": "file id",
      "title": "title e.g. 2021-02-16T14:37:16.624Z.png",
      "type": "file type e.g. image/png",
      "path": "file path e.g. http://localhost:3000/api/files/2021-02-16T14:37:16.624Z.png"
    }
  },
  "applicant": {
    "id": "userId",
    "username": "username",
    "hashedPassword": "hashedPassword",
    "email": "email",
    "prefix": "prefix",
    "firstname": "firstName",
    "lastname": "lastName",
    "birthDate": "birthDate",
    "address": "address",
    "latitude": "latitude",
    "longtitude": "longtitude",
    "telNumber": "telNumber",
    "vertifyAt": "vertifyAt",
    "isAdmin": "isAdmin",
    "avatarFile": {
      "id": "file id",
      "title": "title e.g. 2021-02-16T14:37:16.624Z.png",
      "type": "file type e.g. image/png",
      "path": "file path e.g. http://localhost:3000/api/files/2021-02-16T14:37:16.624Z.png"
    }
  }
}
```

---

## `GET` api/chat/index

---

**Description**

```js
Get all chat rooms
```

**Response**

```json
[
  {
    "id": "chat room id",
    "recruiter": {
      "id": "userId",
      "username": "username",
      "hashedPassword": "hashedPassword",
      "email": "email",
      "prefix": "prefix",
      "firstname": "firstName",
      "lastname": "lastName",
      "birthDate": "birthDate",
      "address": "address",
      "latitude": "latitude",
      "longtitude": "longtitude",
      "telNumber": "telNumber",
      "vertifyAt": "vertifyAt",
      "isAdmin": "isAdmin",
      "avatarFile": {
        "id": "file id",
        "title": "title e.g. 2021-02-16T14:37:16.624Z.png",
        "type": "file type e.g. image/png",
        "path": "file path e.g. http://localhost:3000/api/files/2021-02-16T14:37:16.624Z.png"
      }
    },
    "applicant": {
      "id": "userId",
      "username": "username",
      "hashedPassword": "hashedPassword",
      "email": "email",
      "prefix": "prefix",
      "firstname": "firstName",
      "lastname": "lastName",
      "birthDate": "birthDate",
      "address": "address",
      "latitude": "latitude",
      "longtitude": "longtitude",
      "telNumber": "telNumber",
      "vertifyAt": "vertifyAt",
      "isAdmin": "isAdmin",
      "avatarFile": {
        "id": "file id",
        "title": "title e.g. 2021-02-16T14:37:16.624Z.png",
        "type": "file type e.g. image/png",
        "path": "file path e.g. http://localhost:3000/api/files/2021-02-16T14:37:16.624Z.png"
      }
    },
    "jobAnnouncement" : {
      "id": "announcementId",
      "title": "announcement title",
      "description": "announcement description",
      "company": "company",
      "lowerBoundSalary": "lowerBoundSalary",
      "upperBoundSalary": "upperBoundSalary",
      "province": "province",
      "isPublished": "isPublished",
      "address": "address",
      "amountRequired": "amountRequired",
      "createdAt": "createdAt",
      "updatedAt": "updatedAt",
      "deletedAt": "deletedAt"
    }
  },
  ...
]
```

---

## `GET` api/chat/index/chat-room/:id

---

**Description**

```js
Get a chat room by its id
```

**Parameters**

```js
Path Variable
[
    "id" : "required | Integer" // chat room id
]
```

**Response**

```json
{
  "id": "chat room id",
  "recruiter": {
    "id": "userId",
    "username": "username",
    "hashedPassword": "hashedPassword",
    "email": "email",
    "prefix": "prefix",
    "firstname": "firstName",
    "lastname": "lastName",
    "birthDate": "birthDate",
    "address": "address",
    "latitude": "latitude",
    "longtitude": "longtitude",
    "telNumber": "telNumber",
    "vertifyAt": "vertifyAt",
    "isAdmin": "isAdmin",
    "avatarFile": {
      "id": "file id",
      "title": "title e.g. 2021-02-16T14:37:16.624Z.png",
      "type": "file type e.g. image/png",
      "path": "file path e.g. http://localhost:3000/api/files/2021-02-16T14:37:16.624Z.png"
    }
  },
  "applicant": {
    "id": "userId",
    "username": "username",
    "hashedPassword": "hashedPassword",
    "email": "email",
    "prefix": "prefix",
    "firstname": "firstName",
    "lastname": "lastName",
    "birthDate": "birthDate",
    "address": "address",
    "latitude": "latitude",
    "longtitude": "longtitude",
    "telNumber": "telNumber",
    "vertifyAt": "vertifyAt",
    "isAdmin": "isAdmin",
    "avatarFile": {
      "id": "file id",
      "title": "title e.g. 2021-02-16T14:37:16.624Z.png",
      "type": "file type e.g. image/png",
      "path": "file path e.g. http://localhost:3000/api/files/2021-02-16T14:37:16.624Z.png"
    }
  },
  "jobAnnouncement": {
    "id": "announcementId",
    "title": "announcement title",
    "description": "announcement description",
    "company": "company",
    "lowerBoundSalary": "lowerBoundSalary",
    "upperBoundSalary": "upperBoundSalary",
    "province": "province",
    "isPublished": "isPublished",
    "address": "address",
    "amountRequired": "amountRequired",
    "createdAt": "createdAt",
    "updatedAt": "updatedAt",
    "deletedAt": "deletedAt"
  }
}
```

---

## `GET` api/chat/index/recruiter/chat-room

---

**Description**

```js
Get all chat rooms in which current user has role as recruiter
```

**Guard**

```js
["JwtAuthGuard"];
```

**Response**

```json
[
    {
        "id": "chat room id",
        "recruiter": {
            "id": "userId",
            "username": "username",
            "hashedPassword": "hashedPassword",
            "email": "email",
            "prefix": "prefix",
            "firstname": "firstName",
            "lastname": "lastName",
            "birthDate": "birthDate",
            "address": "address",
            "latitude": "latitude",
            "longtitude": "longtitude",
            "telNumber": "telNumber",
            "vertifyAt": "vertifyAt",
            "isAdmin": "isAdmin",
            "avatarFile": {
            "id": "file id",
            "title": "title e.g. 2021-02-16T14:37:16.624Z.png",
            "type": "file type e.g. image/png",
            "path": "file path e.g. http://localhost:3000/api/files/2021-02-16T14:37:16.624Z.png"
            }
        },
        "applicant": {
            "id": "userId",
            "username": "username",
            "hashedPassword": "hashedPassword",
            "email": "email",
            "prefix": "prefix",
            "firstname": "firstName",
            "lastname": "lastName",
            "birthDate": "birthDate",
            "address": "address",
            "latitude": "latitude",
            "longtitude": "longtitude",
            "telNumber": "telNumber",
            "vertifyAt": "vertifyAt",
            "isAdmin": "isAdmin",
            "avatarFile": {
            "id": "file id",
            "title": "title e.g. 2021-02-16T14:37:16.624Z.png",
            "type": "file type e.g. image/png",
            "path": "file path e.g. http://localhost:3000/api/files/2021-02-16T14:37:16.624Z.png"
            }
        },
        "jobAnnouncement" : {
            "id": "announcementId",
            "title": "announcement title",
            "description": "announcement description",
            "company": "company",
            "lowerBoundSalary": "lowerBoundSalary",
            "upperBoundSalary": "upperBoundSalary",
            "province": "province",
            "isPublished": "isPublished",
            "address": "address",
            "amountRequired": "amountRequired",
            "createdAt": "createdAt",
            "updatedAt": "updatedAt",
            "deletedAt": "deletedAt"
        }
    },
    ...
]
```

---

## `GET` api/chat/index/applicant/chat-room

---

**Description**

```js
Get all chat rooms in which current user has role as applicant
```

**Guard**

```js
["JwtAuthGuard"];
```

**Response**

```json
[
    {
        "id": "chat room id",
        "recruiter": {
            "id": "userId",
            "username": "username",
            "hashedPassword": "hashedPassword",
            "email": "email",
            "prefix": "prefix",
            "firstname": "firstName",
            "lastname": "lastName",
            "birthDate": "birthDate",
            "address": "address",
            "latitude": "latitude",
            "longtitude": "longtitude",
            "telNumber": "telNumber",
            "vertifyAt": "vertifyAt",
            "isAdmin": "isAdmin",
            "avatarFile": {
            "id": "file id",
            "title": "title e.g. 2021-02-16T14:37:16.624Z.png",
            "type": "file type e.g. image/png",
            "path": "file path e.g. http://localhost:3000/api/files/2021-02-16T14:37:16.624Z.png"
            }
        },
        "applicant": {
            "id": "userId",
            "username": "username",
            "hashedPassword": "hashedPassword",
            "email": "email",
            "prefix": "prefix",
            "firstname": "firstName",
            "lastname": "lastName",
            "birthDate": "birthDate",
            "address": "address",
            "latitude": "latitude",
            "longtitude": "longtitude",
            "telNumber": "telNumber",
            "vertifyAt": "vertifyAt",
            "isAdmin": "isAdmin",
            "avatarFile": {
            "id": "file id",
            "title": "title e.g. 2021-02-16T14:37:16.624Z.png",
            "type": "file type e.g. image/png",
            "path": "file path e.g. http://localhost:3000/api/files/2021-02-16T14:37:16.624Z.png"
            }
        },
        "jobAnnouncement" : {
            "id": "announcementId",
            "title": "announcement title",
            "description": "announcement description",
            "company": "company",
            "lowerBoundSalary": "lowerBoundSalary",
            "upperBoundSalary": "upperBoundSalary",
            "province": "province",
            "isPublished": "isPublished",
            "address": "address",
            "amountRequired": "amountRequired",
            "createdAt": "createdAt",
            "updatedAt": "updatedAt",
            "deletedAt": "deletedAt"
        }
    },
    ...
]
```

---

## `GET` api/chat/index/member/chat-room

---

**Description**

```js
Get all chat rooms in which current user has role as applicant or recruiter
```

**Guard**

```js
["JwtAuthGuard"];
```

**Response**

```json
{
  "chat" :
    [
        {
            "id": "chat room id",
            "recruiter": {
                "id": "userId",
                "username": "username",
                "hashedPassword": "hashedPassword",
                "email": "email",
                "prefix": "prefix",
                "firstname": "firstName",
                "lastname": "lastName",
                "birthDate": "birthDate",
                "address": "address",
                "latitude": "latitude",
                "longtitude": "longtitude",
                "telNumber": "telNumber",
                "vertifyAt": "vertifyAt",
                "isAdmin": "isAdmin",
                "avatarFile": {
                "id": "file id",
                "title": "title e.g. 2021-02-16T14:37:16.624Z.png",
                "type": "file type e.g. image/png",
                "path": "file path e.g. http://localhost:3000/api/files/2021-02-16T14:37:16.624Z.png"
                }
            },
            "applicant": {
                "id": "userId",
                "username": "username",
                "hashedPassword": "hashedPassword",
                "email": "email",
                "prefix": "prefix",
                "firstname": "firstName",
                "lastname": "lastName",
                "birthDate": "birthDate",
                "address": "address",
                "latitude": "latitude",
                "longtitude": "longtitude",
                "telNumber": "telNumber",
                "vertifyAt": "vertifyAt",
                "isAdmin": "isAdmin",
                "avatarFile": {
                "id": "file id",
                "title": "title e.g. 2021-02-16T14:37:16.624Z.png",
                "type": "file type e.g. image/png",
                "path": "file path e.g. http://localhost:3000/api/files/2021-02-16T14:37:16.624Z.png"
                }
            }
        },
        ...
  ],
  "user": {
      "id": "current user id",
      "username": "current username",
      "isAdmin": false
  }
}
```

---

## `GET` api/chat/index/job-announcement/:id/chat-room

---

**Description**

```js
Get all chat rooms which belong to specified job announcement
```

**Guard**

```js
["JwtAuthGuard"];
```

**Parameters**

```js
Path Variable
[
    "id" : "required | Integer" // job announcement id
]
```

**Response**

```json
[
    {
        "id": "chat room id",
        "jobAnnouncement" : {
            "id": "announcementId",
            "title": "announcement title",
            "description": "announcement description",
            "company": "company",
            "lowerBoundSalary": "lowerBoundSalary",
            "upperBoundSalary": "upperBoundSalary",
            "province": "province",
            "isPublished": "isPublished",
            "address": "address",
            "amountRequired": "amountRequired",
            "createdAt": "createdAt",
            "updatedAt": "updatedAt",
            "deletedAt": "deletedAt"
        },
        "recruiter": {
            "id": "userId",
            "username": "username",
            "hashedPassword": "hashedPassword",
            "email": "email",
            "prefix": "prefix",
            "firstname": "firstName",
            "lastname": "lastName",
            "birthDate": "birthDate",
            "address": "address",
            "latitude": "latitude",
            "longtitude": "longtitude",
            "telNumber": "telNumber",
            "vertifyAt": "vertifyAt",
            "isAdmin": "isAdmin",
            "avatarFile": {
            "id": "file id",
            "title": "title e.g. 2021-02-16T14:37:16.624Z.png",
            "type": "file type e.g. image/png",
            "path": "file path e.g. http://localhost:3000/api/files/2021-02-16T14:37:16.624Z.png"
            }
        },
        "applicant": {
            "id": "userId",
            "username": "username",
            "hashedPassword": "hashedPassword",
            "email": "email",
            "prefix": "prefix",
            "firstname": "firstName",
            "lastname": "lastName",
            "birthDate": "birthDate",
            "address": "address",
            "latitude": "latitude",
            "longtitude": "longtitude",
            "telNumber": "telNumber",
            "vertifyAt": "vertifyAt",
            "isAdmin": "isAdmin",
            "avatarFile": {
            "id": "file id",
            "title": "title e.g. 2021-02-16T14:37:16.624Z.png",
            "type": "file type e.g. image/png",
            "path": "file path e.g. http://localhost:3000/api/files/2021-02-16T14:37:16.624Z.png"
            }
        }
    },
    ...
]
```

---

## `DELETE` api/chat/chat-room/:id

---

**Description**

```js
Delete chat room by its id
```

**Parameters**

```js
Path Variable
[
    "id" : "required | Integer" // chat room id
]
```

**Response**

```json
{
  "id": "chat room id",
  "recruiter": {
    "id": "userId",
    "username": "username",
    "hashedPassword": "hashedPassword",
    "email": "email",
    "prefix": "prefix",
    "firstname": "firstName",
    "lastname": "lastName",
    "birthDate": "birthDate",
    "address": "address",
    "latitude": "latitude",
    "longtitude": "longtitude",
    "telNumber": "telNumber",
    "vertifyAt": "vertifyAt",
    "isAdmin": "isAdmin",
    "avatarFile": {
      "id": "file id",
      "title": "title e.g. 2021-02-16T14:37:16.624Z.png",
      "type": "file type e.g. image/png",
      "path": "file path e.g. http://localhost:3000/api/files/2021-02-16T14:37:16.624Z.png"
    }
  },
  "applicant": {
    "id": "userId",
    "username": "username",
    "hashedPassword": "hashedPassword",
    "email": "email",
    "prefix": "prefix",
    "firstname": "firstName",
    "lastname": "lastName",
    "birthDate": "birthDate",
    "address": "address",
    "latitude": "latitude",
    "longtitude": "longtitude",
    "telNumber": "telNumber",
    "vertifyAt": "vertifyAt",
    "isAdmin": "isAdmin",
    "avatarFile": {
      "id": "file id",
      "title": "title e.g. 2021-02-16T14:37:16.624Z.png",
      "type": "file type e.g. image/png",
      "path": "file path e.g. http://localhost:3000/api/files/2021-02-16T14:37:16.624Z.png"
    }
  }
}
```

---

# PAGINATE VERSION

---

## `GET` api/chat/paginate/index

---

**Description**

```js
Get all paginate chat rooms
```

**Response**

```json
{
  "items" : [
    {
      "id": "chat room id",
      "recruiter": {
        "id": "userId",
        "username": "username",
        "hashedPassword": "hashedPassword",
        "email": "email",
        "prefix": "prefix",
        "firstname": "firstName",
        "lastname": "lastName",
        "birthDate": "birthDate",
        "address": "address",
        "latitude": "latitude",
        "longtitude": "longtitude",
        "telNumber": "telNumber",
        "vertifyAt": "vertifyAt",
        "isAdmin": "isAdmin",
        "avatarFile": {
          "id": "file id",
          "title": "title e.g. 2021-02-16T14:37:16.624Z.png",
          "type": "file type e.g. image/png",
          "path": "file path e.g. http://localhost:3000/api/files/2021-02-16T14:37:16.624Z.png"
        }
      },
      "applicant": {
        "id": "userId",
        "username": "username",
        "hashedPassword": "hashedPassword",
        "email": "email",
        "prefix": "prefix",
        "firstname": "firstName",
        "lastname": "lastName",
        "birthDate": "birthDate",
        "address": "address",
        "latitude": "latitude",
        "longtitude": "longtitude",
        "telNumber": "telNumber",
        "vertifyAt": "vertifyAt",
        "isAdmin": "isAdmin",
        "avatarFile": {
          "id": "file id",
          "title": "title e.g. 2021-02-16T14:37:16.624Z.png",
          "type": "file type e.g. image/png",
          "path": "file path e.g. http://localhost:3000/api/files/2021-02-16T14:37:16.624Z.png"
        }
      },
      "jobAnnouncement" : {
        "id": "announcementId",
        "title": "announcement title",
        "description": "announcement description",
        "company": "company",
        "lowerBoundSalary": "lowerBoundSalary",
        "upperBoundSalary": "upperBoundSalary",
        "province": "province",
        "isPublished": "isPublished",
        "address": "address",
        "amountRequired": "amountRequired",
        "createdAt": "createdAt",
        "updatedAt": "updatedAt",
        "deletedAt": "deletedAt"
      }
    },
    ...
  ],
  "meta": {
        "totalItems": "The total amount of SomeEntity matching the filter conditions",
        "itemCount": "The length of items array (i.e., the amount of items on this page)",
        "itemsPerPage": "The requested items per page (i.e., the limit parameter)",
        "totalPages": "The total amount of pages (based on the limit)",
        "currentPage": "The current page this paginator 'points' to (i.e., the page parameter)"
    },
    "links": {
        "first": "A URL for the first page to call | '' (blank) if no route is defined e.g. http://localhost:8000/api/chat/paginate/index?limit=10",
        "previous": "A URL for the previous page to call | '' (blank) if no previous to call",
        "next": "A URL for the next page to call | '' (blank) if no page to call",
        "last": "A URL for the last page to call | '' (blank) if no route is defined e.g. http://localhost:8000/api/chat/paginate/index?page=5&limit=10"
    }
}
```

---

## `GET` api/chat/paginate/index/recruiter/chat-room

---

**Description**

```js
Get all paginate chat rooms in which current user has role as recruiter
```

**Guard**

```js
["JwtAuthGuard"];
```

**Response**

```json
{
  "items": [
      {
          "id": "chat room id",
          "recruiter": {
              "id": "userId",
              "username": "username",
              "hashedPassword": "hashedPassword",
              "email": "email",
              "prefix": "prefix",
              "firstname": "firstName",
              "lastname": "lastName",
              "birthDate": "birthDate",
              "address": "address",
              "latitude": "latitude",
              "longtitude": "longtitude",
              "telNumber": "telNumber",
              "vertifyAt": "vertifyAt",
              "isAdmin": "isAdmin",
              "avatarFile": {
              "id": "file id",
              "title": "title e.g. 2021-02-16T14:37:16.624Z.png",
              "type": "file type e.g. image/png",
              "path": "file path e.g. http://localhost:3000/api/files/2021-02-16T14:37:16.624Z.png"
              }
          },
          "applicant": {
              "id": "userId",
              "username": "username",
              "hashedPassword": "hashedPassword",
              "email": "email",
              "prefix": "prefix",
              "firstname": "firstName",
              "lastname": "lastName",
              "birthDate": "birthDate",
              "address": "address",
              "latitude": "latitude",
              "longtitude": "longtitude",
              "telNumber": "telNumber",
              "vertifyAt": "vertifyAt",
              "isAdmin": "isAdmin",
              "avatarFile": {
                "id": "file id",
                "title": "title e.g. 2021-02-16T14:37:16.624Z.png",
                "type": "file type e.g. image/png",
                "path": "file path e.g. http://localhost:3000/api/files/2021-02-16T14:37:16.624Z.png"
              },
          },
          "jobAnnouncement" : {
              "id": "announcementId",
              "title": "announcement title",
              "description": "announcement description",
              "company": "company",
              "lowerBoundSalary": "lowerBoundSalary",
              "upperBoundSalary": "upperBoundSalary",
              "province": "province",
              "isPublished": "isPublished",
              "address": "address",
              "amountRequired": "amountRequired",
              "createdAt": "createdAt",
              "updatedAt": "updatedAt",
              "deletedAt": "deletedAt"
          }
      },
      ...
  ],
   "meta": {
        "totalItems": "The total amount of SomeEntity matching the filter conditions",
        "itemCount": "The length of items array (i.e., the amount of items on this page)",
        "itemsPerPage": "The requested items per page (i.e., the limit parameter)",
        "totalPages": "The total amount of pages (based on the limit)",
        "currentPage": "The current page this paginator 'points' to (i.e., the page parameter)"
    },
    "links": {
        "first": "A URL for the first page to call | '' (blank) if no route is defined e.g. http://localhost:8000/api/chat/paginate/index/recruiter/chat-room?limit=10",
        "previous": "A URL for the previous page to call | '' (blank) if no previous to call",
        "next": "A URL for the next page to call | '' (blank) if no page to call",
        "last": "A URL for the last page to call | '' (blank) if no route is defined e.g. http://localhost:8000/api/chat/paginate/index/recruiter/chat-room?page=5&limit=10"
    }
}
```

---

## `GET` api/chat/paginate/index/applicant/chat-room

---

**Description**

```js
Get all paginate chat rooms in which current user has role as applicant
```

**Guard**

```js
["JwtAuthGuard"];
```

**Response**

```json
{
  "items": [
      {
          "id": "chat room id",
          "recruiter": {
              "id": "userId",
              "username": "username",
              "hashedPassword": "hashedPassword",
              "email": "email",
              "prefix": "prefix",
              "firstname": "firstName",
              "lastname": "lastName",
              "birthDate": "birthDate",
              "address": "address",
              "latitude": "latitude",
              "longtitude": "longtitude",
              "telNumber": "telNumber",
              "vertifyAt": "vertifyAt",
              "isAdmin": "isAdmin",
              "avatarFile": {
              "id": "file id",
              "title": "title e.g. 2021-02-16T14:37:16.624Z.png",
              "type": "file type e.g. image/png",
              "path": "file path e.g. http://localhost:3000/api/files/2021-02-16T14:37:16.624Z.png"
              }
          },
          "applicant": {
              "id": "userId",
              "username": "username",
              "hashedPassword": "hashedPassword",
              "email": "email",
              "prefix": "prefix",
              "firstname": "firstName",
              "lastname": "lastName",
              "birthDate": "birthDate",
              "address": "address",
              "latitude": "latitude",
              "longtitude": "longtitude",
              "telNumber": "telNumber",
              "vertifyAt": "vertifyAt",
              "isAdmin": "isAdmin",
              "avatarFile": {
                "id": "file id",
                "title": "title e.g. 2021-02-16T14:37:16.624Z.png",
                "type": "file type e.g. image/png",
                "path": "file path e.g. http://localhost:3000/api/files/2021-02-16T14:37:16.624Z.png"
              }
          },
          "jobAnnouncement" : {
              "id": "announcementId",
              "title": "announcement title",
              "description": "announcement description",
              "company": "company",
              "lowerBoundSalary": "lowerBoundSalary",
              "upperBoundSalary": "upperBoundSalary",
              "province": "province",
              "isPublished": "isPublished",
              "address": "address",
              "amountRequired": "amountRequired",
              "createdAt": "createdAt",
              "updatedAt": "updatedAt",
              "deletedAt": "deletedAt"
          },
      },
      ...
  ],
   "meta": {
        "totalItems": "The total amount of SomeEntity matching the filter conditions",
        "itemCount": "The length of items array (i.e., the amount of items on this page)",
        "itemsPerPage": "The requested items per page (i.e., the limit parameter)",
        "totalPages": "The total amount of pages (based on the limit)",
        "currentPage": "The current page this paginator 'points' to (i.e., the page parameter)"
    },
    "links": {
        "first": "A URL for the first page to call | '' (blank) if no route is defined e.g. http://localhost:8000/api/chat/paginate/index/applicant/chat-room?limit=10",
        "previous": "A URL for the previous page to call | '' (blank) if no previous to call",
        "next": "A URL for the next page to call | '' (blank) if no page to call",
        "last": "A URL for the last page to call | '' (blank) if no route is defined e.g. http://localhost:8000/api/chat/paginate/index/applicant/chat-room?page=5&limit=10"
    }
}
```

---

## `GET` api/chat/paginate/index/member/chat-room

---

**Description**

```js
Get all paginate chat rooms in which current user has role as applicant or recruiter
```

**Guard**

```js
["JwtAuthGuard"];
```

**Response**

```json
{
  "chat": {
    "items": [
        {
            "id": "chat room id",
            "recruiter": {
                "id": "userId",
                "username": "username",
                "hashedPassword": "hashedPassword",
                "email": "email",
                "prefix": "prefix",
                "firstname": "firstName",
                "lastname": "lastName",
                "birthDate": "birthDate",
                "address": "address",
                "latitude": "latitude",
                "longtitude": "longtitude",
                "telNumber": "telNumber",
                "vertifyAt": "vertifyAt",
                "isAdmin": "isAdmin",
                "avatarFile": {
                "id": "file id",
                "title": "title e.g. 2021-02-16T14:37:16.624Z.png",
                "type": "file type e.g. image/png",
                "path": "file path e.g. http://localhost:3000/api/files/2021-02-16T14:37:16.624Z.png"
                }
            },
            "applicant": {
                "id": "userId",
                "username": "username",
                "hashedPassword": "hashedPassword",
                "email": "email",
                "prefix": "prefix",
                "firstname": "firstName",
                "lastname": "lastName",
                "birthDate": "birthDate",
                "address": "address",
                "latitude": "latitude",
                "longtitude": "longtitude",
                "telNumber": "telNumber",
                "vertifyAt": "vertifyAt",
                "isAdmin": "isAdmin",
                "avatarFile": {
                  "id": "file id",
                  "title": "title e.g. 2021-02-16T14:37:16.624Z.png",
                  "type": "file type e.g. image/png",
                  "path": "file path e.g. http://localhost:3000/api/files/2021-02-16T14:37:16.624Z.png"
                }
            },
            "jobAnnouncement" : {
                "id": "announcementId",
                "title": "announcement title",
                "description": "announcement description",
                "company": "company",
                "lowerBoundSalary": "lowerBoundSalary",
                "upperBoundSalary": "upperBoundSalary",
                "province": "province",
                "isPublished": "isPublished",
                "address": "address",
                "amountRequired": "amountRequired",
                "createdAt": "createdAt",
                "updatedAt": "updatedAt",
                "deletedAt": "deletedAt"
            },
        },
        ...
    ],
    "meta": {
          "totalItems": "The total amount of SomeEntity matching the filter conditions",
          "itemCount": "The length of items array (i.e., the amount of items on this page)",
          "itemsPerPage": "The requested items per page (i.e., the limit parameter)",
          "totalPages": "The total amount of pages (based on the limit)",
          "currentPage": "The current page this paginator 'points' to (i.e., the page parameter)"
      },
      "links": {
          "first": "A URL for the first page to call | '' (blank) if no route is defined e.g. http://localhost:8000/api/chat/paginate/index/member/chat-room?limit=10",
          "previous": "A URL for the previous page to call | '' (blank) if no previous to call",
          "next": "A URL for the next page to call | '' (blank) if no page to call",
          "last": "A URL for the last page to call | '' (blank) if no route is defined e.g. http://localhost:8000/api/chat/paginate/index/member/chat-room?page=5&limit=10"
      }
  },
  "user": {
      "id": 14,
      "username": "test3",
      "isAdmin": false
  }
}
```

---

## `GET` api/chat/paginate/index/job-announcement/:id/chat-room

---

**Description**

```js
Get all paginate chat rooms from specified job announcement.
```

**Guard**

```js
["JwtAuthGuard"];
```

**Parameters**

```js
Path Variable
[
    "id" : "required | Integer" // job announcement id
]
```

**Response**

```json
{
  "items": [
      {
          "id": "chat room id",
          "jobAnnouncement" : {
              "id": "announcementId",
              "title": "announcement title",
              "description": "announcement description",
              "company": "company",
              "lowerBoundSalary": "lowerBoundSalary",
              "upperBoundSalary": "upperBoundSalary",
              "province": "province",
              "isPublished": "isPublished",
              "address": "address",
              "amountRequired": "amountRequired",
              "createdAt": "createdAt",
              "updatedAt": "updatedAt",
              "deletedAt": "deletedAt"
          },
          "recruiter": {
              "id": "userId",
              "username": "username",
              "hashedPassword": "hashedPassword",
              "email": "email",
              "prefix": "prefix",
              "firstname": "firstName",
              "lastname": "lastName",
              "birthDate": "birthDate",
              "address": "address",
              "latitude": "latitude",
              "longtitude": "longtitude",
              "telNumber": "telNumber",
              "vertifyAt": "vertifyAt",
              "isAdmin": "isAdmin",
              "avatarFile": {
              "id": "file id",
              "title": "title e.g. 2021-02-16T14:37:16.624Z.png",
              "type": "file type e.g. image/png",
              "path": "file path e.g. http://localhost:3000/api/files/2021-02-16T14:37:16.624Z.png"
              }
          },
          "applicant": {
              "id": "userId",
              "username": "username",
              "hashedPassword": "hashedPassword",
              "email": "email",
              "prefix": "prefix",
              "firstname": "firstName",
              "lastname": "lastName",
              "birthDate": "birthDate",
              "address": "address",
              "latitude": "latitude",
              "longtitude": "longtitude",
              "telNumber": "telNumber",
              "vertifyAt": "vertifyAt",
              "isAdmin": "isAdmin",
              "avatarFile": {
              "id": "file id",
              "title": "title e.g. 2021-02-16T14:37:16.624Z.png",
              "type": "file type e.g. image/png",
              "path": "file path e.g. http://localhost:3000/api/files/2021-02-16T14:37:16.624Z.png"
              }
          }
      },
      ...
  ],
   "meta": {
        "totalItems": "The total amount of SomeEntity matching the filter conditions",
        "itemCount": "The length of items array (i.e., the amount of items on this page)",
        "itemsPerPage": "The requested items per page (i.e., the limit parameter)",
        "totalPages": "The total amount of pages (based on the limit)",
        "currentPage": "The current page this paginator 'points' to (i.e., the page parameter)"
    },
    "links": {
        "first": "A URL for the first page to call | '' (blank) if no route is defined e.g. http://localhost:8000/api/chat/paginate/index/job-announcement/5/chat-room?limit=10",
        "previous": "A URL for the previous page to call | '' (blank) if no previous to call",
        "next": "A URL for the next page to call | '' (blank) if no page to call",
        "last": "A URL for the last page to call | '' (blank) if no route is defined e.g. http://localhost:8000/api/chat/paginate/index/job-announcement/5/chat-room?page=5&limit=10"
    }
}
```
