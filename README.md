# Back End

Base API Link
https://expat-journal-bw.herokuapp.com/

Endpoints ->

base URL /api/expat/auth --- REGISTER & LOGIN path

base URL /api/expat/auth/protected --- ALL OTHER URL ROUTES

| Request | URL             | Description                          |
| ------- | --------------- | ------------------------------------ |
| POST    | /register       | Registers new User                   |
| POST    | /login          | Login as an existing User            |
| GET     | /users          | Returns list of users                |
| GET     | /user/:id       | Returns a sinlge user by ID          |
| GET     | /posts          | Returns list of posts                |
| GET     | /post/:id       | Returns single post by ID            |
| GET     | /user/:id/posts | Returns list of posts by single user |
| POST    | /posts          | Creates a new post                   |
| PUT     | /post/:id       | Updates an existing post             |
| DELETE  | /post/:id       | Deletes an existing post             |

Users

| Name     | Type    | Required | Unique | Notes                    |
| -------- | ------- | -------- | ------ | ------------------------ |
| id       | Integer | Yes      | Yes    | User id (auto generated) |
| username | String  | Yes      | Yes    | Users Username           |
| password | String  | Yes      | No     | Users Password           |

Posts

| Name     | Type    | Required | Unique | Notes                      |
| -------- | ------- | -------- | ------ | -------------------------- |
| id       | integer | Yes      | Yes    | Plants id (auto generated) |
| viewable | boolean | Yes      | No     | Public/private bool        |
| user_id  | integer | Yes      | No     | Foreign Key                |
| name     | text    | Yes      | No     | Post-name                  |
| title    | text    | Yes      | No     | Post-title                 |
| rating   | integer | Yes      | No     | Post-rating                |
| location | text    | No       | No     | Post-location              |
| contact  | text    | No       | No     | Post-contact               |
| date     | date    | No       | No     | Post-date                  |
| notes    | text    | No       | No     | Post-notes                 |
