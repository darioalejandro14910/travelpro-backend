# 🌍 TravelPro Agency — API RESTful Back-End

API RESTful modular desarrollada con **Node.js**, **Express** y **MongoDB (Mongoose)** para la gestión comercial y operativa de una agencia de viajes y turismo. Permite administrar categorías, destinos, paquetes turísticos, salidas con control de cupos, usuarios con roles diferenciados y reservas con cálculo automático de tarifas.

---

## 🛠️ Tecnologías Utilizadas

* **Node.js** & **Express.js** (Framework web)
* **MongoDB** & **Mongoose** (Base de datos NoSQL y ODM)
* **JSON Web Token (JWT)** (Autenticación y autorización por roles)
* **Bcrypt** (Encriptación de contraseñas mediante `pre-save` hooks)
* **Dotenv** (Gestión de variables de entorno)
* **CORS** (Control de acceso entre orígenes)

---

## 🗄️ Esquema de la Base de Datos

El modelo implementa un enfoque híbrido entre **referencias** (`ObjectId` + `.populate()`) y **subdocumentos embebidos**:

* **`usuarios`**: Credenciales, rol (`cliente`, `agente`, `supervisor`, `admin`) y subdocumentos embebidos `perfiles_clientes` o `agentes_metadata`.
* **`categorias`**: Clasificación temática del catálogo (`slug`, `nombre_mostrar`, `descripcion`).
* **`destinos`**: Ubicaciones geográficas con coordenadas, código IATA y referencias N:M a `categorias`.
* **`paquetes_tours`**: Entidad principal del catálogo comercial. Referencia a `destinos` y embebe el cronograma día por día (`itinerario`).
* **`salidas_paquete`**: Fechas específicas de salida vinculadas a un paquete, con control de `cupo_disponible` y arreglo embebido de `salidas_tarifas`.
* **`reservas`**: Operación de venta vinculada a `usuarios` y `salidas_paquete`, con el detalle de `reserva_pasajeros` embebido para preservar el historial de precios.

---

## 🚀 Instalación y Ejecución

1. Clonar el repositorio:
   ```bash
   git clone <URL_DE_TU_REPOSITORIO>
   cd travelpro-backend
   ```

2. Instalar las dependencias:
   ```bash
   npm install
   ```

3. Configurar el archivo `.env` en la raíz del proyecto (se incluye uno de ejemplo):
   ```env
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/travelpro_db
   JWT_SECRET=clave_secreta_super_segura_travelpro_2026
   JWT_EXPIRES_IN=24h
   ```

4. Iniciar el servidor:
   ```bash
   # Modo desarrollo
   npm run dev

   # Modo producción
   npm start
   ```

---

## 📡 Listado de Endpoints

### Usuarios y Autenticación (`/api/usuarios`)
* `POST /api/usuarios/registro` — Registrar un nuevo usuario (Público).
* `POST /api/usuarios/login` — Iniciar sesión y obtener token JWT (Público).
* `GET /api/usuarios` — Listar todos los usuarios (Protegido: `admin`, `supervisor`).
* `GET /api/usuarios/:id` — Obtener perfil de usuario por ID (Protegido).

### Categorías (`/api/categorias`)
* `GET /api/categorias` — Listar categorías activas (Público).
* `POST /api/categorias` — Crear una categoría (Protegido: `admin`).
* `DELETE /api/categorias/:id` — Eliminar una categoría (Protegido: `admin`).

### Destinos (`/api/destinos`)
* `GET /api/destinos` — Listar destinos con categorías pobladas (Público).
* `GET /api/destinos/:id` — Obtener detalle de un destino (Público).
* `POST /api/destinos` — Crear un destino (Protegido: `admin`).
* `PUT /api/destinos/:id` — Actualizar un destino (Protegido: `admin`).
* `DELETE /api/destinos/:id` — Eliminar un destino (Protegido: `admin`).

### Paquetes Turísticos (`/api/paquetes`)
* `GET /api/paquetes` — Listar paquetes con destinos y categorías pobladas (Público).
* `GET /api/paquetes/:id` — Obtener ficha completa de un paquete (Público).
* `POST /api/paquetes` — Crear un paquete turístico (Protegido: `admin`).
* `PUT /api/paquetes/:id` — Actualizar un paquete turístico (Protegido: `admin`).
* `DELETE /api/paquetes/:id` — Eliminar un paquete turístico (Protegido: `admin`).

### Salidas de Paquete (`/api/salidas`)
* `GET /api/salidas` — Listar salidas disponibles (admite `?paquete_id=...`) (Público).
* `GET /api/salidas/:id` — Obtener detalle y tarifas de una salida (Público).
* `POST /api/salidas` — Crear una salida con tarifas y cupos (Protegido: `admin`).
* `PUT /api/salidas/:id` — Actualizar una salida (Protegido: `admin`).
* `DELETE /api/salidas/:id` — Eliminar una salida (Protegido: `admin`).

### Reservas (`/api/reservas`)
* `GET /api/reservas` — Listar todas las reservas (Protegido).
* `GET /api/reservas/:id` — Obtener detalle de una reserva (Protegido).
* `POST /api/reservas` — Crear reserva y descontar cupos automáticamente (Protegido).
* `PATCH /api/reservas/:id/estado` — Cambiar estado de reserva (`senada`, `pagada_total`, `cancelada`) (Protegido: `admin`, `agente`, `supervisor`).

---

## 🧪 Ejemplos de Datos Mock (JSON para Postman / Thunder Client)

### 1. Registrar Administrador (`POST /api/usuarios/registro`)
```json
{
  "nombre": "Dario",
  "apellido": "Alejandro",
  "email": "dario.admin@agencia.com",
  "password_hash": "Admin1234!",
  "telefono": "+54 9 11 5999-8877",
  "rol": "admin"
}
```

### 2. Login (`POST /api/usuarios/login`)
```json
{
  "email": "dario.admin@agencia.com",
  "password": "Admin1234!"
}
```

### 3. Crear Categoría (`POST /api/categorias`) *(Requiere Bearer Token)*
```json
{
  "slug": "aventura-glaciares",
  "nombre_mostrar": "Aventura y Glaciares",
  "descripcion": "Excursiones en parques nacionales, trekking y navegación."
}
```

### 4. Crear Destino (`POST /api/destinos`) *(Requiere Bearer Token)*
```json
{
  "nombre": "El Calafate",
  "pais": "Argentina",
  "codigo_iata": "FTE",
  "descripcion_corta": "Capital Nacional de los Glaciares.",
  "descripcion_detallada": "Acceso al Glaciar Perito Moreno y Lago Argentino.",
  "coordenadas": { "lat": -50.3379, "lng": -72.2648 },
  "tags": ["patagonia", "glaciares", "invierno"],
  "categorias_ids": ["<ID_CATEGORIA_CREADA>"]
}
```

### 5. Crear Paquete Turístico (`POST /api/paquetes`) *(Requiere Bearer Token)*
```json
{
  "codigo_paquete": "PKG-FTE-2027",
  "titulo_comercial": "Maravillas del Glaciar Perito Moreno",
  "descripcion": "Paquete aéreo + 4 noches de alojamiento + excursión completa al glaciar.",
  "duracion_dias": 5,
  "duracion_noches": 4,
  "destinos": [
    {
      "destino_id": "<ID_DESTINO_CREADO>",
      "orden_visita": 1,
      "noches_estadia": 4
    }
  ],
  "itinerario": [
    { "dia": 1, "titulo": "Vuelo a El Calafate", "detalle": "Traslado aeropuerto - hotel." },
    { "dia": 2, "titulo": "Glaciar Perito Moreno", "detalle": "Pasarelas y Safari Náutico." }
  ],
  "politicas_cancelacion": "Cancelación gratuita hasta 15 días antes de la salida."
}
```

### 6. Crear Salida de Paquete (`POST /api/salidas`) *(Requiere Bearer Token)*
```json
{
  "paquete_id": "<ID_PAQUETE_CREADO>",
  "codigo_salida": "SAL-FTE-0115",
  "fecha_salida": "2027-01-15",
  "fecha_regreso": "2027-01-19",
  "cupo_maximo": 20,
  "moneda": "USD",
  "salidas_tarifas": [
    {
      "tipo_pasajero": "adulto",
      "tipo_acomodacion": "doble",
      "precio_venta": 850,
      "impuestos_incluidos": 110
    }
  ]
}
```

### 7. Crear Reserva (`POST /api/reservas`) *(Requiere Bearer Token)*
```json
{
  "salida_paquete_id": "<ID_SALIDA_CREADA>",
  "descuento_aplicado": 50,
  "reserva_pasajeros": [
    {
      "tarifa_id": "<ID_TARIFA_DENTRO_DE_LA_SALIDA>",
      "nombre": "Valentina",
      "apellido": "Sosa",
      "genero": "F",
      "documento_tipo": "PASAPORTE",
      "documento_nro": "AR9876543",
      "fecha_nacimiento": "1993-07-22",
      "nacionalidad": "Argentina",
      "es_titular": true
    }
  ]
}
```

---

## 🔮 Funcionalidades a Futuro

* Integración de pasarelas de pago reales (`Stripe` / `MercadoPago`) con webhooks idempotentes (`pagos_transacciones`).
* Módulo de liquidación automática de `comisiones_agentes` por sucursal.
* Middleware de auditoría automática (`auditoria_logs`) para registrar cambios en entidades críticas.