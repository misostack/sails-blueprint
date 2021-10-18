# API

## Base

1. [x] Routes
2. [x] Controllers & Actions
3. [x] DTO : Validations
4. [x] Response: CRUD, Errors
5. [x] Resolver
6. [x] Model/Entity
7. [x] Search & Pagination
8. [x] I18n
9. [x] Search Index

## Common commands

```bash
sudo fuser -k 1337/tcp
```

## API Blueprint

```java
GET /resources - LIST - 200
GET /resources/:id - RETRIEVE A RESOURCE - 200/404
POST /resources - CREATE - 201
PATCH /resources/:id - UPDATE - 200/404
DELETE /resources/:id - DELETE - 204/404
```

### 1.Success

```bash
curl -X POST http://localhost:1337/admins -H "Content-Type: application/json"  --data '{"username": "sonnm","password":"13456", "email":"sonnm@yopmail.com", "firstName": "Son", "lastName": "Nguyen"}' -v

curl -X PATCH http://localhost:1337/admins/98f1fa64-dfe1-4443-b0b3-bae8f6d8b284 -H "Content-Type: application/json" --data '{"firstName": "Son","lastName":"Lee Minh"}' -v

curl -X DELETE http://localhost:1337/admins/3e1e0713-bf9d-4af2-8b23-931c0af3a6c2 -H "Content-Type: application/json" -v
```

```javascript
// Create
{
  "message": "Success",
  "status": 201,
  "data": {
    "createdAt": 1603213704644,
    "updatedAt": 1603213704644,
    "id": "b46f5680-3dd5-4623-a7fd-f383a4cb2680",
    "username": "sonnm",
    "email": "sonnm@yopmail.com",
    "status": "active",
    "firstName": "Son",
    "lastName": "Nguyen"
  }
}

// Update

{
  "message": "Success",
  "status": 200,
  "data": {
    "createdAt": 1603213704644,
    "updatedAt": 1603213884594,
    "id": "b46f5680-3dd5-4623-a7fd-f383a4cb2680",
    "username": "sonnm",
    "email": "sonnm@yopmail.com",
    "status": "active",
    "firstName": "Son",
    "lastName": "Nguyen"
  }
}
// Delete

{
  "message": "Success",
  "status": 200,
  "data": {}
}

```

### 2.Validation Error

```json
// 400 - Bad Request
{
  "message": "Bad Request",
  "status": 400,
  "errors": [
    {
      "field": "username",
      "name": "any.required",
      "code": "admin_username_e_required",
      "context": {
        "label": "username",
        "key": "username"
      }
    },
    {
      "field": "firstName",
      "name": "any.required",
      "code": "admin_firstname_e_required",
      "context": {
        "label": "firstName",
        "key": "firstName"
      }
    },
    {
      "field": "lastName",
      "name": "any.required",
      "code": "admin_lastname_e_required",
      "context": {
        "label": "lastName",
        "key": "lastName"
      }
    },
    {
      "field": "email",
      "name": "any.required",
      "code": "admin_email_e_required",
      "context": {
        "label": "email",
        "key": "email"
      }
    },
    {
      "field": "password",
      "name": "any.required",
      "code": "admin_password_e_required",
      "context": {
        "label": "password",
        "key": "password"
      }
    },
    {
      "message": "User name is required",
      "field": "username",
      "name": "any.required",
      "code": "admin_username_e_required",
      "context": {
        "label": "username",
        "key": "username"
      }
    },
    {
      "message": "Firstname is required",
      "field": "firstName",
      "name": "any.required",
      "code": "admin_firstname_e_required",
      "context": {
        "label": "firstName",
        "key": "firstName"
      }
    },
    {
      "message": "Lastname is required",
      "field": "lastName",
      "name": "any.required",
      "code": "admin_lastname_e_required",
      "context": {
        "label": "lastName",
        "key": "lastName"
      }
    },
    {
      "message": "Email is required",
      "field": "email",
      "name": "any.required",
      "code": "admin_email_e_required",
      "context": {
        "label": "email",
        "key": "email"
      }
    },
    {
      "message": "Password is required",
      "field": "password",
      "name": "string.min",
      "code": "admin_password_e_min",
      "context": {
        limit: 6,
        value: '123',
        encoding: undefined,
        label: 'password',
        key: 'password'
      }

    }
  ]
}

// 401 - Unauthorized error
{
  "message": "Unauthorized error",
  "status": 401
}

// 403 - Forbidden Error
{
  "message": "Forbidden Error",
  "status": 403
}

// 404 - Not found
{
  "message": "Not found",
  "status": 404
}

// 500 - Internal Server Error
{
  "message": "Internal Server Error",
  "status": 500
}
```

### 3.Filter & Sort & Pagination

> http://localhost:1337/admins?size=3&page=1&sort[][email]=asc&sort[][firstname]=desc&filter[][status]=active

> http://localhost:1337/admins?size=3&page=1&sort[][email]=asc&sort[][firstname]=desc&filter[][status]=active&filter[][s]=son%20nguyen

> http://localhost:1337/admins?size=3&page=1&sort[][email]=asc&sort[][firstname]=desc&filter[][status]=active&filter[][s]=son%20nguyen&filter[][createdat][%3E]=1603271110000

| QueryParam | Description                                          |
| ---------- | ---------------------------------------------------- |
| **filter** | filter params. Eg: filter[][field][operator]=[value] |
| **size**   | items per page - default = 10 - max : 50             |
| **page**   | Current Page - default = 1                           |
| **sort**   | Sort params. Eg: sort[][field]=asc/desc              |

#### Operators

| Operator        | Description                                                                                                           |
| --------------- | --------------------------------------------------------------------------------------------------------------------- |
| **contains**    | String value like a variable (eg. filter[][field][contains]=value)                                                    |
| **comparision** | '<','<=', '>', '>=' (eg. filter[][field][>=]=value)                                                                   |
| **eq**          | Means different from a variable, use any value like number or string (eg. [=4)                                        |
| **in**          | In an array of value, use any value like number or string (eg. [fullName][in][]=selena&[fullName][in][]=justin)       |
| **nin**         | Not In an array of value, use any value like number or string (eg. [fullName][nin][]=selena&[fullName][nin][]=justin) |
| **before**      | Start with a string, use any value like number or string (eg. [fullName][before]=selena)                              |
| **after**       | End with a string, use any value like number or string (eg. [fullName][after]=gomez)                                  |

#### Index Search

> filters[][s]=[value]

Eg: **User Collection** had created search index with {firstName lastName}. When index search filter applied <==> **s** contains [value]

The **s** = {firstName.lowerCase() + ' ' + lastName.lowerCase()}

#### Sample Response

```json
{
  "message": "Success",
  "status": 200,
  "data": {
    "page": {
      "size": 3,
      "totalElements": 4,
      "totalPages": 2,
      "number": 1
    },
    "filter": {
      "status": "active",
      "s": {
        "contains": "son nguyen"
      },
      "createdAt": {
        ">": "1603179724001"
      }
    },
    "admins": [
      {
        "createdAt": 1603179849217,
        "updatedAt": 1603268579089,
        "id": "dd4dde52-b83c-49f8-a6c6-a8c13a5b907f",
        "username": "sonn0023",
        "email": "sonnm0023yopmail.com",
        "status": "active",
        "firstName": "SOn",
        "lastName": "Nguyen Minh"
      },
      {
        "createdAt": 1603179814828,
        "updatedAt": 1603268579080,
        "id": "c4980c2a-6ec1-4b03-b100-a0f36cce5aed",
        "username": "sonn002",
        "email": "sonnm002@yopmail.com",
        "status": "active",
        "firstName": "SOn",
        "lastName": "Nguyen Minh"
      },
      {
        "createdAt": 1603179902051,
        "updatedAt": 1603268579100,
        "id": "dd190d0e-8ef2-4c2a-9abc-2964190be939",
        "username": "sonn003",
        "email": "sonnm003opmail.com",
        "status": "active",
        "firstName": "SOn",
        "lastName": "Nguyen Minh"
      }
    ]
```

### 4.I18n

- Supported Languages: ['en', 'vn']

- Use **X-LANG** in header or query string **lng**

> curl -X PATCH http://localhost:1337/admins/98f1fa64-dfe1-4443-b0b3-bae8f6d8b284 -H "X-LANG: vn" --data '{"firstName": "Son","lastName":"Lee Minh"}

### 5.Auth

> curl -X POST http://localhost:1337/admin/auth/sign-in -H "Content-Type: application/json" --data '{"email": "sonnm@yopmail.com", "password": "123456"}'

## GraphQL

### Refs

- https://graphql.org/learn/
- https://dev.to/aflatoon2874/how-to-integrate-graphql-with-sailsjs-application-3obh
- https://hackernoon.com/how-to-connect-sailsjs-with-graphql-guide-jgdm3y7l
