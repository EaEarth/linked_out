---
id: Message
title: Message
---

## `POST` api/chat/message

---

**Description**

```js
Create a new message
```

**Guard**

```js
["JwtAuthGuard"];
```

**Parameters**

```js
Body
{
    "chatRoomId": "required | number",
    "message": "required | string"
}
```

**Response**

```json
{
  "message": "message",
  "sender": {
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
  "chatRoom": {
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
  "id": "messageId",
  "createdAt": "createAt e.g.2021-03-24T10:31:50.525Z"
}
```

---

## `GET` api/chat/index/message/:id

---

**Description**

```js
Get a message from its id
```

**Guard**

```js
["JwtAuthGuard"];
```

**Parameters**

```js
Path Variable
{
    "id": "required | number"
}
```

**Response**

```json
{
  "id": "messageId",
  "message": "message",
  "createdAt": "createAt e.g.2021-03-24T10:31:50.525Z",
  "sender": {
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
    "isAdmin": "isAdmin"
  },
  "chatRoom": {
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
      "isAdmin": "isAdmin"
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
      "isAdmin": "isAdmin"
    }
  }
}
```

---

## `GET` api/chat/index/message/chat-room/:roomId

---

**Description**

```js
Get list of messages from chat room id
```

**Guard**

```js
["JwtAuthGuard"];
```

**Parameters**

```js
Path Variable
{
    "roomId": "required | number"
}
```

**Response**

```json
[
    {
        "id": "messageId",
        "message": "message",
        "createdAt": "createAt e.g.2021-03-24T10:31:50.525Z",
        "sender": {
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
            "isAdmin": "isAdmin"
        },
        "chatRoom": {
            "id": "chat room id",
        }
    },
    ...
]
```

---

## `DELETE` api/chat/message/:id

---

**Description**

```js
Delete a message from its id
```

**Guard**

```js
["JwtAuthGuard"];
```

**Parameters**

```js
Path Variable
{
    "roomId": "required | number"
}
```

**Response**

```json
{
  "id": "messageId",
  "message": "message",
  "createdAt": "createAt e.g.2021-03-24T10:31:50.525Z",
  "sender": {
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
    "isAdmin": "isAdmin"
  },
  "chatRoom": {
    "id": "chat room id"
  }
}
```

---

# PAGINATE VERSION

---

## `GET` api/chat/paginate/index/message/chat-room/:roomId

---

**Description**

```js
Get list of paginate messages from chat room id
```

**Guard**

```js
["JwtAuthGuard"];
```

**Parameters**

```js
Path Variable
{
    "roomId": "required | number"
}
```

**Query**

```js
{
    "page": "optional | number | default = 1"
    "limit": "optional | number | default = 10"
}
```

**Response**

```json
{
    "items" : [
      {
          "id": "messageId",
          "message": "message",
          "createdAt": "createAt e.g.2021-03-24T10:31:50.525Z",
          "sender": {
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
              "isAdmin": "isAdmin"
          },
          "chatRoom": {
              "id": "chat room id",
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
        "first": "A URL for the first page to call | '' (blank) if no route is defined e.g. http://localhost:8000/api/chat/paginate/index/message/chat-room/1?limit=10",
        "previous": "A URL for the previous page to call | '' (blank) if no previous to call",
        "next": "A URL for the next page to call | '' (blank) if no page to call",
        "last": "A URL for the last page to call | '' (blank) if no route is defined e.g. http://localhost:8000/api/chat/paginate/index/message/chat-room/1?page=5&limit=10"
    }
}
```
