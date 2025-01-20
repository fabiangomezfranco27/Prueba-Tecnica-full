# FastAPI Project

Este es un proyecto de FastAPI que implementa un sistema de gestión de usuarios y tareas utilizando una base de datos SQLite y SQLAlchemy.

## Estructura del Proyecto

```
fastapi-project
├── app
│   ├── __init__.py
│   ├── main.py
│   ├── models
│   │   ├── __init__.py
│   │   ├── user.py
│   │   └── task.py
│   ├── crud
│   │   ├── __init__.py
│   │   ├── user.py
│   │   └── task.py
│   ├── schemas
│   │   ├── __init__.py
│   │   ├── user.py
│   │   └── task.py
│   ├── database.py
│   └── routers
│       ├── __init__.py
│       ├── user.py
│       └── task.py
├── alembic
│   ├── env.py
│   ├── script.py.mako
│   └── versions
├── alembic.ini
├── requirements.txt
└── README.md
```

## Instalación

1. Clona el repositorio:
   ```
   git clone <URL_DEL_REPOSITORIO>
   cd fastapi-project
   ```

2. Crea un entorno virtual y actívalo:
   ```
   python -m venv venv
   source venv/bin/activate  # En Windows usa `venv\Scripts\activate`
   ```

3. Instala las dependencias:
   ```
   pip install -r requirements.txt
   ```

## Uso

1. Para iniciar el servidor, ejecuta:
   ```
   uvicorn app.main:app --reload
   ```

2. Accede a la documentación de la API en:
   ```
   http://localhost:8000/docs
   ```



uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
## Contribuciones

Las contribuciones son bienvenidas. Si deseas contribuir, por favor abre un issue o envía un pull request.

## Licencia

Este proyecto está bajo la Licencia MIT.