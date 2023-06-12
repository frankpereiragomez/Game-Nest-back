# Game Nest API

This is the web api for the Game Nest app.

The application is structured as follows:

- A server made with Express.js
- MongoDB for data persistance

The API includes authorization, in order to access the protected routes you need to login with valid credentials and send your token on each request.

## API Reference

### Check if server is up

```http
  GET /
```

Response: 🏓 Pong

### Login

```http
  POST /user/login
```

| Body       | Type     | Description                 |
| :--------- | :------- | :-------------------------- |
| `username` | `string` | **Required**. Your username |
| `password` | `string` | **Required**. Your password |

Response: Wrong credentials or a Json Web Token

### Get all videogames

```http
  GET /videogames
```

| Header          | Type     | Description                  |
| :-------------- | :------- | :--------------------------- |
| `Authorization` | `string` | **Required**. Your JWT token |

Response: A collection of videogames

```text
  DELETE /videogames/${id}
```

| Parameter | Type     | Description                             |
| :-------- | :------- | :-------------------------------------- |
| `id`      | `string` | **Required**. Id of videogame to delete |

Response: Error or Success message

### Create videogame

```text
  POST /videogame/create
```

| Body        | Type     | Description                  |
| :---------- | :------- | :--------------------------- |
| `videogame` | `object` | **Required**. Videogame data |

Response: Created contact or error response
