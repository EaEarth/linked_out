---
id: payment
title: payment
---

## `GET` slip/index

---

**Description**

```js
Index all payment slip
```

**Response**

```json
[
  {
    "id": 1,
    "title": "Promoting Job Announcement for 3 months",
    "amount": 30000,
    "paymentDate": null
  },
  {
    "id": 2,
    "title": "Promoting Job Announcement for 7 months",
    "amount": 70000,
    "paymentDate": null
  },
  {
    "id": 3,
    "title": "Promoting Job Announcement for 8 months",
    "amount": 80000,
    "paymentDate": null
  },
  {
    "id": 4,
    "title": "Promoting Job Announcement for 1 months",
    "amount": 10000,
    "paymentDate": null
  }
]
```

---

## `GET` slip/:id

---

**Description**

```js
Show payment slip info of the following id
```

**Parameters**

```js
Path Variable
[
    "id": "number"
]
```

**Response**

```json
{
  "id": 1,
  "title": "Promoting Job Announcement for 3 months",
  "amount": 30000,
  "paymentDate": null,
  "qrCodeFile": {
    "id": 2,
    "title": "qr_code_payment",
    "type": "image/jpeg",
    "path": "http://localhost:8000/api/files/qr_code_payment.jpg"
  },
  "payer": {
    "id": 1,
    "username": "Murl_Wuckert60",
    "hashedPassword": "$2b$12$B5qrH7m6A6wTQ1NHawOfNOPUtH5mZIyFa0EP9MKIAB2hXgdbb6YJe",
    "email": "Pete_Dicki@hotmail.com",
    "prefix": "MR.",
    "firstname": "Tressa",
    "lastname": "Hartmann",
    "birthDate": "2012-09-09",
    "address": "254 Phayathai Rd, Wang Mai, Pathum Wan District, Bangkok 10330",
    "latitude": 30.1325,
    "longtitude": -32.9165,
    "telNumber": "0945555555",
    "vertifyAt": null,
    "isAdmin": false,
    "province": "กรุงเทพมหานคร"
  }
}
```

---

## `POST` slip

---

**Description**

```js
Create a new payment slip
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
    'amount': 'required | number',
}
```

**Response**

```json
{
  "title": "Promoting Job Announcement for 1 Month",
  "amount": 102500,
  "payer": {
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
    "province": "กรุงเทพมหานคร"
  },
  "qrCodeFile": {
    "id": 61,
    "title": "qr_code_payment",
    "type": "image/jpeg",
    "path": "http://localhost:8000/api/files/2021-04-25T08-46-37.489Z.jpeg"
  },
  "paymentDate": null,
  "id": 3
}
```

---

## `Patch` slip/:id

---

**Description**

```js
Edit payment slip with following payment slip id
```

**Guard**

```js
["JwtAuthGuard"];
```

**Parameters**

```js
Path Variable
[
    "id": "number"
]

Body
{
    'title': 'optional | string',
    'amount': 'optional | number',
    'paymentDate': 'optional | Date',
    'qrCodeFileId': 'optional | number'
}
```

**Response**

```json
{
  "id": 2,
  "title": "Promoting Job Announcement for 7 months",
  "amount": 70000,
  "paymentDate": null,
  "qrCodeFile": {
    "id": 2,
    "title": "qr_code_payment",
    "type": "image/jpeg",
    "path": "http://localhost:8000/api/files/qr_code_payment.jpg"
  },
  "payer": {
    "id": 1,
    "username": "Murl_Wuckert60",
    "hashedPassword": "$2b$12$B5qrH7m6A6wTQ1NHawOfNOPUtH5mZIyFa0EP9MKIAB2hXgdbb6YJe",
    "email": "Pete_Dicki@hotmail.com",
    "prefix": "MR.",
    "firstname": "Tressa",
    "lastname": "Hartmann",
    "birthDate": "2012-09-09",
    "address": "254 Phayathai Rd, Wang Mai, Pathum Wan District, Bangkok 10330",
    "latitude": 30.1325,
    "longtitude": -32.9165,
    "telNumber": "0945555555",
    "vertifyAt": null,
    "isAdmin": false,
    "province": "กรุงเทพมหานคร"
  }
}
```

---

## `GET` slip

---

**Description**

```js
Get all payment slip of the user
```

**Guard**

```js
["JwtAuthGuard"];
```

**Respone**

```json
[
  {
    "id": 1,
    "title": "Promoting Job Announcement for 3 months",
    "amount": 30000,
    "paymentDate": null
  },
  {
    "id": 2,
    "title": "Promoting Job Announcement for 12 Month",
    "amount": 70000,
    "paymentDate": "2021-04-25"
  },
  {
    "id": 3,
    "title": "Promoting Job Announcement for 8 months",
    "amount": 80000,
    "paymentDate": null
  }
]
```
