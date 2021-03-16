---
id: jobApplication
title: jobApplication
---

## `POST` api/job-application

---

**Description**

```js
Create a new job application
```

**Guard**

```js
["JwtAuthGuard"];
```

**Parameters**

```js
Body
{
    'experience': 'optional | string',
    'education': 'optional | string',
    'feedback': 'optional | string',
    'status': 'optional | number', // 1=waiting, 2=accepted, 3=denied
    'jobAnnoucementId': 'required | number',
    'resumeId': 'optional | number',
    'transcriptId': 'optional | number',
    'coverLetterId': 'optional | number'=
}
```

**Response**

```json
{
  "experience": "experience",
  "education": "education",
  "feedback": "feedback",
  "status": "status number",
  "applicant": {
    "id": "user id",
    "username": "username",
    "hashedPassword": "hashedPassword",
    "email": "email",
    "prefix": "name prefix",
    "firstname": "firstName",
    "lastname": "lastName",
    "birthDate": "2021-03-14",
    "address": "address",
    "latitude": "latitude number",
    "longtitude": "longtitude number",
    "telNumber": "tel number",
    "vertifyAt": "verify date or null",
    "isAdmin": "true or false"
  },
  "coverLetter": {
    "id": "file id",
    "title": "file title",
    "type": "file type e.g. image/jpeg, text/plain",
    "path": "file path"
  },
  "jobAnnouncement": {
    "id": "job announcement id",
    "title": "jobannouncement title",
    "company": "company name",
    "lowerBoundSalary": "min salary",
    "upperBoundSalary": "max salary",
    "isPublished": "true or false",
    "description": "description",
    "address": "address",
    "province": "province",
    "amountRequired": "amount number",
    "createdAt": "2021-03-13T19:18:57.912Z",
    "updatedAt": "2021-03-13T19:18:57.000Z",
    "deletedAt": "date or null"
  },
  "transcript": {
    "id": "file id",
    "title": "file title",
    "type": "file type e.g. image/jpeg, text/plain",
    "path": "file path"
  },
  "resume": {
    "id": "file id",
    "title": "file title",
    "type": "file type e.g. image/jpeg, text/plain",
    "path": "file path"
  },
  "id": "application id",
  "createdAt": "2021-03-14T06:35:21.740Z",
  "updatedAt": "2021-03-14T06:35:21.740Z"
}
```

---

## `GET` api/job-application/index

---

**Description**

```js
Get list of all job applications.
```

**Response**

```json
[
    {
        "id": "application id",
        "experience": "experience",
        "education": "education",
        "feedback": "feedback",
        "status": "status number",
        "createdAt": "2021-03-14T06:35:21.740Z",
        "updatedAt": "2021-03-14T06:35:21.740Z",
        "applicant": {
            "id": "user id",
            "username": "username",
            "hashedPassword": "hashedPassword",
            "email": "email",
            "prefix": "name prefix",
            "firstname": "firstName",
            "lastname": "lastName",
            "birthDate": "2021-03-14",
            "address": "address",
            "latitude": "latitude number",
            "longtitude": "longtitude number",
            "telNumber": "tel number",
            "vertifyAt": "verify date or null",
            "isAdmin": "true or false",
            "avatarFile": {
              "id": "file id",
              "title": "file title",
              "type": "file type e.g. image/jpeg, text/plain",
              "path": "file path"
            }
        },
        "coverLetter": {
            "id": "file id",
            "title": "file title",
            "type": "file type e.g. image/jpeg, text/plain",
            "path": "file path"
        },
        "jobAnnouncement": {
            "id": "job announcement id",
            "title": "jobannouncement title",
            "company": "company name",
            "lowerBoundSalary": "min salary",
            "upperBoundSalary": "max salary",
            "isPublished": "true or false",
            "description": "description",
            "address": "address",
            "province": "province",
            "amountRequired": "amount number",
            "createdAt": "2021-03-13T19:18:57.912Z",
            "updatedAt": "2021-03-13T19:18:57.000Z",
            "deletedAt": "date or null",
            "picture": {
              "id": "file id",
              "title": "file title",
              "type": "file type e.g. image/jpeg, text/plain",
              "path": "file path"
            }
        },
        "transcript": {
            "id": "file id",
            "title": "file title",
            "type": "file type e.g. image/jpeg, text/plain",
            "path": "file path"
        },
        "resume": {
            "id": "file id",
            "title": "file title",
            "type": "file type e.g. image/jpeg, text/plain",
            "path": "file path"
        }
    },
    ...
]
```

---

## `GET` api/job-application/index/:id

---

**Explanation**

```js
Get a job application by id.
```

**Guard**

```js
["JwtAuthGuard"];
```

**Parameters**

```js
Path Variable
[
    "id" : "required | Integer" // job application id
]
```

**Response**

```json
{
  "id": "application id",
  "experience": "experience",
  "education": "education",
  "feedback": "feedback",
  "status": "status number",
  "createdAt": "2021-03-14T06:35:21.740Z",
  "updatedAt": "2021-03-14T06:35:21.740Z",
  "applicant": {
    "id": "user id",
    "username": "username",
    "hashedPassword": "hashedPassword",
    "email": "email",
    "prefix": "name prefix",
    "firstname": "firstName",
    "lastname": "lastName",
    "birthDate": "2021-03-14",
    "address": "address",
    "latitude": "latitude number",
    "longtitude": "longtitude number",
    "telNumber": "tel number",
    "vertifyAt": "verify date or null",
    "isAdmin": "true or false",
    "avatarFile": {
      "id": "file id",
      "title": "file title",
      "type": "file type e.g. image/jpeg, text/plain",
      "path": "file path"
    }
  },
  "coverLetter": {
    "id": "file id",
    "title": "file title",
    "type": "file type e.g. image/jpeg, text/plain",
    "path": "file path"
  },
  "jobAnnouncement": {
    "id": "job announcement id",
    "title": "jobannouncement title",
    "company": "company name",
    "lowerBoundSalary": "min salary",
    "upperBoundSalary": "max salary",
    "isPublished": "true or false",
    "description": "description",
    "address": "address",
    "province": "province",
    "amountRequired": "amount number",
    "createdAt": "2021-03-13T19:18:57.912Z",
    "updatedAt": "2021-03-13T19:18:57.000Z",
    "deletedAt": "date or null",
    "picture": {
      "id": "file id",
      "title": "file title",
      "type": "file type e.g. image/jpeg, text/plain",
      "path": "file path"
    }
  },
  "transcript": {
    "id": "file id",
    "title": "file title",
    "type": "file type e.g. image/jpeg, text/plain",
    "path": "file path"
  },
  "resume": {
    "id": "file id",
    "title": "file title",
    "type": "file type e.g. image/jpeg, text/plain",
    "path": "file path"
  }
}
```

---

## `GET` api/job-application/applicant

---

**Explanation**

```js
Get list of all job applications which are sent by current login user
```

**Guard**

```js
["JwtAuthGuard"];
```

**Response**

```json
[
    {
        "id": "application id",
        "experience": "experience",
        "education": "education",
        "feedback": "feedback",
        "status": "status number",
        "createdAt": "2021-03-14T06:35:21.740Z",
        "updatedAt": "2021-03-14T06:35:21.740Z",
        "applicant": {
            "id": "user id",
            "username": "username",
            "hashedPassword": "hashedPassword",
            "email": "email",
            "prefix": "name prefix",
            "firstname": "firstName",
            "lastname": "lastName",
            "birthDate": "2021-03-14",
            "address": "address",
            "latitude": "latitude number",
            "longtitude": "longtitude number",
            "telNumber": "tel number",
            "vertifyAt": "verify date or null",
            "isAdmin": "true or false",
            "avatarFile": {
              "id": "file id",
              "title": "file title",
              "type": "file type e.g. image/jpeg, text/plain",
              "path": "file path"
            }
        },
        "coverLetter": {
            "id": "file id",
            "title": "file title",
            "type": "file type e.g. image/jpeg, text/plain",
            "path": "file path"
        },
        "jobAnnouncement": {
            "id": "job announcement id",
            "title": "jobannouncement title",
            "company": "company name",
            "lowerBoundSalary": "min salary",
            "upperBoundSalary": "max salary",
            "isPublished": "true or false",
            "description": "description",
            "address": "address",
            "province": "province",
            "amountRequired": "amount number",
            "createdAt": "2021-03-13T19:18:57.912Z",
            "updatedAt": "2021-03-13T19:18:57.000Z",
            "deletedAt": "date or null",
            "picture": {
              "id": "file id",
              "title": "file title",
              "type": "file type e.g. image/jpeg, text/plain",
              "path": "file path"
            }
        },
        "transcript": {
            "id": "file id",
            "title": "file title",
            "type": "file type e.g. image/jpeg, text/plain",
            "path": "file path"
        },
        "resume": {
            "id": "file id",
            "title": "file title",
            "type": "file type e.g. image/jpeg, text/plain",
            "path": "file path"
        }
    },
    ...
]
```

---

## `GET` api/job-application/recruiter

---

**Explanation**

```js
Get list of all job applications which are sent to current login user
```

**Guard**

```js
["JwtAuthGuard"];
```

**Response**

```json
[
    {
        "id": "application id",
        "experience": "experience",
        "education": "education",
        "feedback": "feedback",
        "status": "status number",
        "createdAt": "2021-03-14T06:35:21.740Z",
        "updatedAt": "2021-03-14T06:35:21.740Z",
        "applicant": {
            "id": "user id",
            "username": "username",
            "hashedPassword": "hashedPassword",
            "email": "email",
            "prefix": "name prefix",
            "firstname": "firstName",
            "lastname": "lastName",
            "birthDate": "2021-03-14",
            "address": "address",
            "latitude": "latitude number",
            "longtitude": "longtitude number",
            "telNumber": "tel number",
            "vertifyAt": "verify date or null",
            "isAdmin": "true or false",
            "avatarFile": {
              "id": "file id",
              "title": "file title",
              "type": "file type e.g. image/jpeg, text/plain",
              "path": "file path"
            }
        },
        "coverLetter": {
            "id": "file id",
            "title": "file title",
            "type": "file type e.g. image/jpeg, text/plain",
            "path": "file path"
        },
        "jobAnnouncement": {
            "id": "job announcement id",
            "title": "jobannouncement title",
            "company": "company name",
            "lowerBoundSalary": "min salary",
            "upperBoundSalary": "max salary",
            "isPublished": "true or false",
            "description": "description",
            "address": "address",
            "province": "province",
            "amountRequired": "amount number",
            "createdAt": "2021-03-13T19:18:57.912Z",
            "updatedAt": "2021-03-13T19:18:57.000Z",
            "deletedAt": "date or null",
            "picture": {
              "id": "file id",
              "title": "file title",
              "type": "file type e.g. image/jpeg, text/plain",
              "path": "file path"
            }
        },
        "transcript": {
            "id": "file id",
            "title": "file title",
            "type": "file type e.g. image/jpeg, text/plain",
            "path": "file path"
        },
        "resume": {
            "id": "file id",
            "title": "file title",
            "type": "file type e.g. image/jpeg, text/plain",
            "path": "file path"
        }
    },
    ...
]
```

---

## `GET` api/job-application/announcement/:id

---

**Explanation**

```js
Get list of all job applications which are sent to specific job announcement.
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
        "id": "application id",
        "experience": "experience",
        "education": "education",
        "feedback": "feedback",
        "status": "status number",
        "createdAt": "2021-03-14T06:35:21.740Z",
        "updatedAt": "2021-03-14T06:35:21.740Z",
        "applicant": {
            "id": "user id",
            "username": "username",
            "hashedPassword": "hashedPassword",
            "email": "email",
            "prefix": "name prefix",
            "firstname": "firstName",
            "lastname": "lastName",
            "birthDate": "2021-03-14",
            "address": "address",
            "latitude": "latitude number",
            "longtitude": "longtitude number",
            "telNumber": "tel number",
            "vertifyAt": "verify date or null",
            "isAdmin": "true or false",
            "avatarFile": {
              "id": "file id",
              "title": "file title",
              "type": "file type e.g. image/jpeg, text/plain",
              "path": "file path"
            }
        },
        "coverLetter": {
            "id": "file id",
            "title": "file title",
            "type": "file type e.g. image/jpeg, text/plain",
            "path": "file path"
        },
        "jobAnnouncement": {
            "id": "job announcement id",
            "title": "jobannouncement title",
            "company": "company name",
            "lowerBoundSalary": "min salary",
            "upperBoundSalary": "max salary",
            "isPublished": "true or false",
            "description": "description",
            "address": "address",
            "province": "province",
            "amountRequired": "amount number",
            "createdAt": "2021-03-13T19:18:57.912Z",
            "updatedAt": "2021-03-13T19:18:57.000Z",
            "deletedAt": "date or null",
            "picture": {
              "id": "file id",
              "title": "file title",
              "type": "file type e.g. image/jpeg, text/plain",
              "path": "file path"
            }
        },
        "transcript": {
            "id": "file id",
            "title": "file title",
            "type": "file type e.g. image/jpeg, text/plain",
            "path": "file path"
        },
        "resume": {
            "id": "file id",
            "title": "file title",
            "type": "file type e.g. image/jpeg, text/plain",
            "path": "file path"
        }
    },
    ...
]
```

---

## `PATCH` api/job-appication/:id

---

**Explanation**

```js
update a job application
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
    'experience': 'optional | string',
    'education': 'optional | string',
    'feedback': 'optional | string',
    'status': 'optional | number', // 1=waiting, 2=accepted, 3=denied
    'jobAnnoucementId': 'optional | number',
    'resumeId': 'optional | number',
    'transcriptId': 'optional | number',
    'coverLetterId': 'optional | number'=
}
```

**Response**

```json
{
  "id": "application id",
  "experience": "experience",
  "education": "education",
  "feedback": "feedback",
  "status": "status number",
  "createdAt": "2021-03-14T06:35:21.740Z",
  "updatedAt": "2021-03-14T06:35:21.740Z",
  "applicant": {
    "id": "user id",
    "username": "username",
    "hashedPassword": "hashedPassword",
    "email": "email",
    "prefix": "name prefix",
    "firstname": "firstName",
    "lastname": "lastName",
    "birthDate": "2021-03-14",
    "address": "address",
    "latitude": "latitude number",
    "longtitude": "longtitude number",
    "telNumber": "tel number",
    "vertifyAt": "verify date or null",
    "isAdmin": "true or false"
  },
  "coverLetter": {
    "id": "file id",
    "title": "file title",
    "type": "file type e.g. image/jpeg, text/plain",
    "path": "file path"
  },
  "jobAnnouncement": {
    "id": "job announcement id",
    "title": "jobannouncement title",
    "company": "company name",
    "lowerBoundSalary": "min salary",
    "upperBoundSalary": "max salary",
    "isPublished": "true or false",
    "description": "description",
    "address": "address",
    "province": "province",
    "amountRequired": "amount number",
    "createdAt": "2021-03-13T19:18:57.912Z",
    "updatedAt": "2021-03-13T19:18:57.000Z",
    "deletedAt": "date or null"
  },
  "transcript": {
    "id": "file id",
    "title": "file title",
    "type": "file type e.g. image/jpeg, text/plain",
    "path": "file path"
  },
  "resume": {
    "id": "file id",
    "title": "file title",
    "type": "file type e.g. image/jpeg, text/plain",
    "path": "file path"
  }
}
```

---

## `DELETE` api/job-application/:id

---

**Explanation**

```js
Delete a job application
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
  "id": "application id",
  "experience": "experience",
  "education": "education",
  "feedback": "feedback",
  "status": "status number",
  "createdAt": "2021-03-14T06:35:21.740Z",
  "updatedAt": "2021-03-14T06:35:21.740Z",
  "applicant": {
    "id": "user id",
    "username": "username",
    "hashedPassword": "hashedPassword",
    "email": "email",
    "prefix": "name prefix",
    "firstname": "firstName",
    "lastname": "lastName",
    "birthDate": "2021-03-14",
    "address": "address",
    "latitude": "latitude number",
    "longtitude": "longtitude number",
    "telNumber": "tel number",
    "vertifyAt": "verify date or null",
    "isAdmin": "true or false"
  }
}
```
