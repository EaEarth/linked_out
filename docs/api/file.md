---
id: file
title: file
slug: /api
---

## `POST` files/upload

---

**Description**
```php
Creating File
```

**Guard**
```php
['JwtAuthGuard']
```


**Parameters**

```php
Body
{
    "title": "optional | string",
    "file": "required | file which will be used"
}
```

**Response Example**
```json
{
    "title": "2021-02-18T04:47:19.681Z.jpeg",
    "type": "image/jpeg",
    "path": "http://localhost:3000/api/files/2021-02-18T04:47:19.681Z.jpeg",
    "owner": {
        "id": 25,
        "username": "famidol10",
        "isAdmin": false
    },
    "id": 9
}
```

---

## `GET` files/:fileName

---

**Description**
```php
Creating File
```

**Response Example**
```json
File From the URL
```

---

## `GET` files/index

---

**Description**
```php
Get all File
```

**Guard**
```php
['JwtAuthGuard']
```

**Response Example**
```json
{
    {
        "id": 1,
        "title": "2021-02-16T13:21:22.201Z.png",
        "type": "image/png",
        "path": "http://localhost:3000/api/files/2021-02-16T13:21:22.201Z.png"
    },
    {
        "id": 2,
        "title": "2021-02-16T13:22:00.701Z.png",
        "type": "image/png",
        "path": "http://localhost:3000/api/files/2021-02-16T13:22:00.701Z.png"
    },
    ...
}
```

---

## `GET` files/id/:id

---

**Description**
```php
Get all File
```

**Guard**
```php
['JwtAuthGuard']
```

**Parameters**
```php
Param
[
    "id" => "required | number"
]
```

**Response Example**
```json
{
    "id": 1,
    "title": "2021-02-16T13:21:22.201Z.png",
    "type": "image/png",
    "path": "http://localhost:3000/api/files/2021-02-16T13:21:22.201Z.png"
}
```

---

## `GET` files/title/:title

---

**Description**
```php
Get all File of the User which login with the following title
```

**Guard**
```php
['JwtAuthGuard']
```

**Response Example**
```json
{
        "id": 1,
        "title": "Testing",
        "type": "image/jpeg",
        "path": "http://localhost:3000/api/files/2021-02-18T05:37:52.748Z.jpeg"
    },
    {
        "id": 2,
        "title": "2021-02-18T05:40:22.973Z.jpeg",
        "type": "image/jpeg",
        "path": "http://localhost:3000/api/files/2021-02-18T05:40:22.973Z.jpeg"
    },
    ...
}
```