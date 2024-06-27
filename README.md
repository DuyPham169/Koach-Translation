# Koach Back-End Translation project

## API Endpoints

### Register

- **URL**: `/register`
- **Method**: `POST`
- **Body**:

  ```json
  {
    "username": "username",
    "password": "password"
  }
  ```

- **Response**:

  ```json
  {
    "message": "Registered successfully"
  }
  ```

### Login

- **URL**: `/login`
- **Method**: `POST`
- **Body**:

  ```json
  {
    "username": "username",
    "password": "password"
  }
  ```

- **Response**:

  ```json
  {
    "message": "Login successfully",
    "token": "jwttoken"
  }
  ```

  ### Trnaslate

- **URL**: `/translate`
- **Method**: `POST`
- **Body**:

  ```json
  {
    "transText": "text to translate"
  }
  ```

- **Response**:

  ```json
  {
    "message": "`Translation: ${transText}`"
  }
  ```
