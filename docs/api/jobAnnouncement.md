---
id: jobAnnouncement
title: jobAnnouncement
---

## `POST` api/job

---

**Description**

```js
Create a new job announcement
```

**Guard**

```js
["JwtAuthGuard"];
```

**Parameters**

```js
Body
{
    'title': 'required | string',
    'tag': 'required | string[]',
    'company': 'required | string',
    'lowerBoundSalary': 'required | number',
    'upperBoundSalary': 'required | number',
    'isPublished': 'required | boolean',
    'description': 'required | string',
    'address': 'required | string',
    'province': 'required | string',
    'amountRequired': 'required | number',
    'pictureId': 'optional | integer',
}
```

**Response**

```json
{
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
    "tags": [
        {
            "id": "tagId",
            "name": "tagname"
        },
        ...
    ],
    "owner": {
        "id": "ownerId",
        "username": "username",
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
        "avatarFile": "avatarFile"
    },
    "picture": {
        "id": "pictureId",
        "title": "title",
        "type": "type",
        "path": "path"
    }
}
```

---

## `POST` api/job/tag/:name

---

**Description**

```js
Create a new tag
```

**Guard**

```js
["JwtAuthGuard"];
```

**Parameters**

```js
Path Variable
[
    "name": "string"
]
```

**Response**

```json
{
  "name": "name",
  "id": "id"
}
```

---

## `GET` api/job/index

---

**Description**

```js
Get all job announcements
```

**Response**

```json
[
    {
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
        "tags": [
            {
                "id": "tagId",
                "name": "tagname"
            },
            ...
        ],
        "picture": {
            "id": "pictureId",
            "title": "title",
            "type": "type",
            "path": "path"
        }
    },
    ...
]
```

---

## `GET` api/job/tag/index

---

**Description**

```js
Get all tags
```

**Response**

```json
[
    {

        "id": "tagId",
        "name": "tagname"
    },
    ...
]
```

---

## `GET` api/job/owner

---

**Explanation**

```js
Get all job announcements which belong to currently user.
```

**Response**

```json
[
    {
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
        "tags": [
            {
                "id": "tagId",
                "name": "tagname"
            },
            ...
        ],
        "picture": {
            "id": "pictureId",
            "title": "title",
            "type": "type",
            "path": "path"
        },
        "owner": {
            "id": "ownerId",
            "username": "username",
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
            "avatarFile": "avatarFile"
        }
    },
    ...
]
```

---

## `GET` api/job/search

---

**Explanation**

```js
Get all job announcements after filtering
```

**Parameters**

```js
Body
{
    "search": "optional | string" // seperate keyword with space
    "tag": "optional | string[]"
    "lowerBoundSalary": "optional | number"
    "province": "optional | string"
}
```

**Response**

```json
[
    {
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
        "tags": [
            {
                "id": "tagId",
                "name": "tagname"
            },
            ...
        ],
        "picture": {
            "id": "pictureId",
            "title": "title",
            "type": "type",
            "path": "path"
        }
    },
    ...
]
```

---

## `GET` api/job/index/:id

---

**Explanation**

```js
Get job announcements by id
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
    "tags": [
        {
            "id": "tagId",
            "name": "tagname"
        },
        ...
    ],
    "picture": {
        "id": "pictureId",
        "title": "title",
        "type": "type",
        "path": "path"
    }
}

```

---

## `PATCH` api/job/:id

---

**Explanation**

```js
update a job announcement
```

**Guard**

```js
["JwtAuthGuard"];
```

**Parameters**

```js
Path Variable
[
    'id': "required | Interger"
]

Body
{
    "title": "optional | string"
    "description": "optional | string"
    "tag": "optional | string[]"
    "company": "optional | string"
    "address": "optional | string"
    "province": "optional | string"
    "lowerBoundSalary": "optional | number"
    "upperBoundSalary": "optional | number"
    "isPublished": "optional | boolean"
    "amountRequired": "optional | number"
    "pictureId": "optinal | number"
}
```

**Response**

```json
{
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
    "tags": [
        {
            "id": "tagId",
            "name": "tagname"
        },
        ...
    ],
    "picture": {
        "id": "pictureId",
        "title": "title",
        "type": "type",
        "path": "path"
    },
    "owner": {
        "id": "ownerId",
        "username": "username",
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
        "avatarFile": "avatarFile"
    }
}
```

---

## `DELETE` api/job/:id

---

**Explanation**

```js
Delete a job announcement
```

**Guard**

```js
["JwtAuthGuard"];
```

**Parameters**

```js
Path Variable
[
    'id': "required | Interger"
]
```

**Response**

```json
{
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
  "owner": {
    "id": "ownerId",
    "username": "username",
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
    "avatarFile": "avatarFile"
  }
}
```

---

## `GET` api/job/user/recommendation

---

**Explanation**

```js
Recommend a job announcement at most 10 announcement to a user
```

**Guard**

```js
["OptionalJwtAuthGuard"];
```

**Response**

```json
[
    {
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
    ...
]
```
