# FastAPI y React Project

Este proyecto es una aplicación web construida con FastAPI y React. La aplicación permite a los usuarios registrarse, iniciar sesión y gestionar tareas.

## Requisitos

- Python 3.7+
- Node.js 12+
- npm o yarn

## Configuración del Backend

1. Clona el repositorio:

    ```bash
    git clone https://github.com/fabiangomezfranco27/Prueba-Tecnica-Ingeniero-Fullstack.git
    cd Prueba-Tecnica-Ingeniero-Fullstack
    ```

2. Crea y activa un entorno virtual:

    ```bash
    cd fastapi-project
    python -m venv env
    source env/bin/activate  # En Windows usa `env\Scripts\activate`
    ```

3. Instala las dependencias de Python:

    ```bash
    pip install -r requirements.txt
    ```

4. Configura la base de datos:

    ```bash
    python init_db.py
    ```

5. Ejecuta el servidor de desarrollo:

    ```bash
    uvicorn app.main:app --reload --host 0.0.0.0 port 8000
    ```

## Configuración del Frontend

1. Navega al directorio del frontend(desde la raiz del proyecto):

    ```bash
    cd my-react-app
    ```

2. Instala las dependencias de Node.js:

    ```bash
    npm install
    ```

3. Ejecuta el servidor de desarrollo:

    ```bash
    npm start
    ```

La aplicación se abrirá en `http://localhost:3000`.

## Uso de la API

### Registro de Usuario

- **Endpoint:** `/api/register`
- **Método:** `POST`
- **Cuerpo de la solicitud:**

    ```json
    {
        "username": "usuario",
        "email": "usuario@example.com",
        "password": "contraseña"
    }
    ```

- **Respuesta exitosa:**

    ```json
    {
        "id": 1,
        "username": "usuario",
        "email": "usuario@example.com"
    }
    ```

### Inicio de Sesión

- **Endpoint:** `/api/login`
- **Método:** `POST`
- **Cuerpo de la solicitud:**

    ```json
    {
        "username": "usuario",
        "password": "contraseña"
    }
    ```

- **Respuesta exitosa:**

    ```json
    {
        "access_token": "token_jwt",
        "token_type": "bearer"
    }
    ```

### Crear Tarea

- **Endpoint:** `/api/tasks`
- **Método:** `POST`
- **Cuerpo de la solicitud:**

    ```json
    {
        "title": "Nueva Tarea",
        "description": "Descripción de la tarea",
        "dueDate": "2023-12-31",
        "completed": false
    }
    ```

- **Respuesta exitosa:**

    ```json
    {
        "id": 1,
        "title": "Nueva Tarea",
        "description": "Descripción de la tarea",
        "dueDate": "2023-12-31",
        "completed": false
    }
    ```

### Leer Todas las Tareas

- **Endpoint:** `/api/tasks`
- **Método:** `GET`
- **Respuesta exitosa:**

    ```json
    [
        {
            "id": 1,
            "title": "Nueva Tarea",
            "description": "Descripción de la tarea",
            "dueDate": "2023-12-31",
            "completed": false
        }
    ]
    ```

### Leer una Tarea Específica

- **Endpoint:** `/api/tasks/{id}`
- **Método:** `GET`
- **Respuesta exitosa:**

    ```json
    {
        "id": 1,
        "title": "Nueva Tarea",
        "description": "Descripción de la tarea",
        "dueDate": "2023-12-31",
        "completed": false
    }
    ```

### Actualizar Tarea

- **Endpoint:** `/api/tasks/{id}`
- **Método:** `PUT`
- **Cuerpo de la solicitud:**

    ```json
    {
        "title": "Tarea Actualizada",
        "description": "Descripción actualizada",
        "dueDate": "2023-12-31",
        "completed": true
    }
    ```

- **Respuesta exitosa:**

    ```json
    {
        "id": 1,
        "title": "Tarea Actualizada",
        "description": "Descripción actualizada",
        "dueDate": "2023-12-31",
        "completed": true
    }
    ```

### Eliminar Tarea

- **Endpoint:** `/api/tasks/{id}`
- **Método:** `DELETE`
- **Respuesta exitosa:**

    ```json
    {
        "detail": "Task deleted"
    }
    ```

## Pruebas

Para ejecutar las pruebas unitarias, usa el siguiente comando:

```bash
pytest
