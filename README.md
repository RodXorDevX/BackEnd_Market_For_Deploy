# BackEnd Marketplace

Backend API para la aplicación Marketplace Trends - Una plataforma de e-commerce para comprar y vender productos.

## 🚀 Tecnologías

- **Node.js** - Runtime de JavaScript
- **Express.js** - Framework web para Node.js
- **PostgreSQL** - Base de datos relacional
- **CORS** - Middleware para compartir recursos entre orígenes
- **JWT** - Autenticación y autorización (implementada con SECRET_KEY)

## 📁 Estructura del Proyecto

```
BackEnd_Market_For_Deploy/
├── controllers/          # Controladores de lógica de negocio
│   ├── categoria-controller.js
│   ├── pedido-controller.js
│   ├── producto-controller.js
│   ├── tipo-usuario-controller.js
│   ├── usuario-controller.js
│   └── carrito-controller.js
├── models/              # Modelos de datos
│   ├── categoria-model.js
│   ├── pedido-model.js
│   ├── producto-model.js
│   ├── tipo-usuario-model.js
│   ├── usuario-model.js
│   └── carrito-model.js
├── middlewares/         # Middlewares personalizados
│   ├── authMiddleware.js
│   └── logger-middleware.js
├── config/             # Archivos de configuración
│   └── db-config.js
├── .env.example        # Ejemplo de variables de entorno
├── .gitignore          # Archivos ignorados por Git
├── index.js            # Punto de entrada de la aplicación
└── migrations.js       # Migraciones de base de datos
```

## 🛠️ Instalación

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/RodrigoCQ4/BackEnd_Market_For_Deploy.git
   cd BackEnd_Market_For_Deploy
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno:**
   ```bash
   cp .env.example .env
   ```
   Luego, editar el archivo `.env` con tus credenciales:
   ```env
   PORT=3000
   NODE_ENV=development
   SECRET_KEY=tu_clave_secreta_aqui
   DATABASE_URL=postgresql://usuario:password@localhost:5432/nombre_db
   ```

4. **Configurar la base de datos:**
   - Crear una base de datos PostgreSQL
   - Ejecutar las migraciones:
   ```bash
   node migrations.js
   ```

5. **Iniciar el servidor:**
   ```bash
   npm start
   # o en modo desarrollo:
   npm run dev
   ```

## 📡 API Endpoints

### Usuarios
- `POST /registro` - Registrar nuevo usuario
- `POST /login` - Iniciar sesión
- `GET /usuarios` - Obtener todos los usuarios

### Productos
- `GET /productos` - Obtener todos los productos (con paginación)
- `GET /productos/filtros` - Filtrar productos por precio, categoría, vendedor
- `POST /productos` - Crear nuevo producto (requiere autenticación)
- `PUT /productos/:id` - Actualizar producto
- `DELETE /productos/:id` - Eliminar producto

### Categorías
- `GET /categorias` - Obtener todas las categorías
- `POST /categorias` - Crear nueva categoría

### Carrito
- `POST /carrito` - Agregar producto al carrito
- `GET /carrito/:usuarioId` - Obtener carrito de un usuario
- `DELETE /carrito/:itemId` - Eliminar item del carrito

### Pedidos
- `POST /pedidos` - Crear nuevo pedido
- `GET /pedidos/:usuarioId` - Obtener pedidos de un usuario

## 🔐 Variables de Entorno

Las siguientes variables de entorno son necesarias:

```env
PORT=3000                                    # Puerto del servidor
NODE_ENV=development                         # Entorno (development/production)
SECRET_KEY=tu_clave_secreta_aqui             # Clave para JWT
DATABASE_URL=postgresql://...               # URL de conexión a PostgreSQL
CORS_ORIGIN=http://localhost:5173           # Orígenes permitidos para CORS
```

## 🔒 Seguridad

- **Variables de entorno:** Las credenciales sensibles se almacenan en `.env` (incluido en `.gitignore`)
- **CORS:** Configurado para permitir solo orígenes específicos
- **JWT:** Implementado para autenticación y autorización
- **Middleware de logging:** Registra todas las solicitudes para auditoría

## 🧪 Scripts de Demo

Para propósitos de desarrollo y demostración, se incluyen scripts para crear datos de prueba:

**Nota:** Estos archivos están excluidos del control de versiones por seguridad.

## 📝 Modelo de Datos

### Usuarios
- `id`, `nombre`, `email`, `password`, `direccion`, `tipo_usuario_id`

### Productos
- `id`, `titulo`, `descripcion`, `precio`, `categoria_id`, `stock`, `imagen`, `vendedor_id`, `calificacion`

### Categorías
- `id`, `nombre`

### Pedidos
- `id`, `usuario_id`, `fecha`, `total`, `estado`

### Carrito
- `id`, `usuario_id`
- `carrito_items`: `carrito_id`, `producto_id`, `cantidad`

## 🚀 Despliegue

### Producción (Vercel)
- Variable `NODE_ENV=production`
- Base de datos PostgreSQL remota (Supabase)
- URL pública configurada

### Desarrollo Local
- Variable `NODE_ENV=development`
- Base de datos PostgreSQL local
- CORS configurado para desarrollo

## 📝 Licencia

Este proyecto está bajo la Licencia MIT.

## 👥 Contribuyentes

- RodrigoCQ4 - Desarrollador principal

## 📧 Contacto

Para soporte o preguntas, contactar a: [tu-email@ejemplo.com]