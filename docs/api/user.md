---
id: user
title: User
slug: /api
---

## `POST` auth/users

---

**Description**
```php
Creating User
```

**Parameters**

```php
Body
{
    "username": "required | string | unique",
    "password": "required | string",
    "email": "required | string | unique",
    "prefix": "required | string",
    "firstname": "required | string",
    "lastname": "required | lastname",
    "birthDate": "required | Date",
    "address": "required | string",
    "latitude": "required | number | lattitude(range 0 to 100)",
    "longtitude": "required | number | longtitude(range 0 to 100)",
    "telNumber": "required | string | length(10)",
    "avatarFileId": "optional |number | unique"
}
```

**Response Example**
```json
{
    "username": "famidol8",
    "email": "puttipat.ketpuponp6@gmail.com",
    "prefix": "MR.",
    "firstname": "Puttipat",
    "lastname": "Ketpupong",
    "birthDate": "2021-02-18T02:55:58.168Z",
    "address": "Home",
    "latitude": 12.22,
    "longtitude": 13.11,
    "telNumber": "0945476905",
    "avatarFileId": 4,
    "avatarFile": {
        "id": 4,
        "title": "2021-02-16T14:37:16.624Z.png",
        "type": "image/png",
        "path": "http://localhost:3000/api/files/2021-02-16T14:37:16.624Z.png"
    },
    "vertifyAt": null,
    "id": 21,
    "isAdmin": false
}
```

---

## `PATCH` auth/users

---

**Description**
```php
Updating user own information (If the user admin, user could edit other user information)
```

**Guard**
```php
['JwtAuthGuard']
```

**Parameters**

```php
Body
{
    "password": "optional | string",
    "email": "optional | string | unique",
    "prefix": "optional | string",
    "firstname": "optional | string",
    "lastname": "optional | lastname",
    "birthDate": "optional | Date",
    "address": "optional | string",
    "latitude": "optional | number | lattitude(range 0 to 100)",
    "longtitude": "optional | number | longtitude(range 0 to 100)",
    "telNumber": "optional | string | length(10)",
    "avatarFileId": "optional | number | unique",
    "isAdmin": "optional | boolean" 
}
Additional For Admin User (Edit other user)
{
    "id": "optional | number"
}
```

**Response Example**
```json
{
    "id": 21,
    "username": "famidol8",
    "hashedPassword": "$2b$12$8tvvoBvP85eNSmaC3k7KdOydUxWg0SZRMcZIlAH3/IZiOZq39Y73q",
    "email": "puttipat.ketpuponp6@gmail.com",
    "prefix": "MR.",
    "firstname": "Editiadadwng",
    "lastname": "Ketpupsong",
    "birthDate": "2021-02-18",
    "address": "Home",
    "latitude": 12.22,
    "longtitude": 13.11,
    "telNumber": "0945476905",
    "vertifyAt": null,
    "isAdmin": false
}
```

---

## `GET` auth/users/profile

---

**Description**
```php
Get user profile
```

**Guard**
```php
['JwtAuthGuard']
```

**Response Example**
```json
{
    "id": 21,
    "username": "famidol8",
    "email": "puttipat.ketpuponp6@gmail.com",
    "prefix": "MR.",
    "firstname": "Editiadadwng",
    "lastname": "Ketpupsong",
    "birthDate": "2021-02-18",
    "address": "Home",
    "latitude": 12.22,
    "longtitude": 13.11,
    "telNumber": "0945476905",
    "vertifyAt": null,
    "isAdmin": false,
    "avatarFile": {
        "id": 4,
        "title": "2021-02-16T14:37:16.624Z.png",
        "type": "image/png",
        "path": "http://localhost:3000/api/files/2021-02-16T14:37:16.624Z.png"
    }
}
```

---

## `GET` auth/users/:id

---

**Description**
```php
Get user by id
```

**Parameters**

```php
Param
[
    'id' => 'required'
]
```

**Response Example**
```json
{
    "id": 21,
    "username": "famidol8",
    "email": "puttipat.ketpuponp6@gmail.com",
    "prefix": "MR.",
    "firstname": "Editiadadwng",
    "lastname": "Ketpupsong",
    "birthDate": "2021-02-18",
    "address": "Home",
    "latitude": 12.22,
    "longtitude": 13.11,
    "telNumber": "0945476905",
    "vertifyAt": null,
    "isAdmin": false,
    "avatarFile": {
        "id": 4,
        "title": "2021-02-16T14:37:16.624Z.png",
        "type": "image/png",
        "path": "http://localhost:3000/api/files/2021-02-16T14:37:16.624Z.png"
    }
}
```

---

## `DELETE` auth/users/:id

---

**Description**
```php
Delete user by id (Only admin or the owner of the id could do this action)
```

**Parameters**

```php
Param
[
    'id' => 'required'
]
```

**Guard**
```php
['JwtAuthGuard']
```

**Response Example**
```json
{
    "username": "famidol13",
    "hashedPassword": "$2b$12$chU8e9T5V9uhG4Sz5zidp.RdzBEGBENmFe5UdOXUAIeCIxbol8h0a",
    "email": "puttipat.ketpuponp21@gmail.com",
    "prefix": "MR.",
    "firstname": "Puttipat",
    "lastname": "Ketpupong",
    "birthDate": "2021-02-18",
    "address": "Home",
    "latitude": 12.22,
    "longtitude": 13.11,
    "telNumber": "0945476905",
    "vertifyAt": null,
    "isAdmin": false,
    "jobAnnouncements": null,
    "avatarFile": null
}
```

