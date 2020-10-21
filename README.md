# API

## Base

1. [x] Routes
2. [x] Controllers & Actions
3. [x] DTO : Validations
4. [x] Response: CRUD, Errors
5. [x] Resolver
6. [x] Model/Entity
7. [ ] Search & Pagination
8. [ ] I18n

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

1. Success

```bash
curl -X POST http://localhost:1337/admins -H "Content-Type: application/json"  --data '{"username": "sonnm","password":"13456", "email":"sonnm@yopmail.com", "firstName": "Son", "lastName": "Nguyen"}' -v

curl -X PATCH http://localhost:1337/admins/b46f5680-3dd5-4623-a7fd-f383a4cb2680 -H "Content-Type: application/json"  --data '{"username": "sonnm","password":"123456"}' -v

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

2. Validation Error

```json
// 400 - Bad Request
{
  "message": "Bad Request",
  "status": 400,
  "errors": [
    {
      "field": "username",
      "message": "Username is duplicated"
    },
    {
      "field": "email",
      "message": "Email is duplicated"
    }
  ]
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

3. Filter & Sort & Pagination

> http://localhost:1337/admins?size=1&page=1&sort[][email]=asc&sort[][firstname]=desc&filter[][firstname][contains]=son

> http://localhost:1337/admins?size=1&page=1&sort[][email]=asc&sort[][firstname]=desc&filter[][status]=active
