from typing import Any, Dict, List, Optional

# Este archivo inicializa el paquete de operaciones CRUD.

# Simulamos una base de datos simple usando un diccionario
_db: Dict[str, Any] = {}

def create(id: str, data: Dict[str, Any]) -> bool:
    """Crear un nuevo registro"""
    if id not in _db:
        _db[id] = data
        return True
    return False

def read(id: str) -> Optional[Dict[str, Any]]:
    """Leer un registro"""
    return _db.get(id)

def read_all() -> List[Dict[str, Any]]:
    """Leer todos los registros"""
    return list(_db.values())

def update(id: str, data: Dict[str, Any]) -> bool:
    """Actualizar un registro existente"""
    if id in _db:
        _db[id].update(data)
        return True
    return False

def delete(id: str) -> bool:
    """Eliminar un registro"""
    if id in _db:
        del _db[id]
        return True
    return False

# Exportar las funciones públicas
__all__ = ['create', 'read', 'read_all', 'update', 'delete']