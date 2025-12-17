// Importación de dependencias
require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Importación de middleware
const logRequest = require('./middlewares/logger-middleware');

// Importación de rutas
const productosRoutes = require('./routes/producto-routes');
const usuariosRoutes = require('./routes/usuario-routes');
const carritosRoutes = require('./routes/carrito-routes');
const categoriasRoutes = require('./routes/categoria-routes');
const tipoUsuarioRoutes = require('./routes/tipo-usuario-routes');
const pedidosRoutes = require('./routes/pedido-routes');

// Configuración inicial de Express
const app = express();
const PORT = process.env.PORT || 3000;

// JWT
const secretKey = process.env.SECRET_KEY;
if (!secretKey) {
    console.error("ERROR: La variable de entorno SECRET_KEY no está definida.");
    process.exit(1); // Detiene la ejecución si no hay clave
}

// Configuración CORS mejorada
const corsOptions = {
  origin: process.env.CORS_ORIGIN || 'https://marketplace-trends.netlify.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204
};

// Middleware explícito para OPTIONS
app.options('*', cors(corsOptions));

// Middlewares
app.use(cors(corsOptions)); // Habilita CORS para todas las rutas
app.use(express.json()); // Permite el manejo de JSON en las solicitudes
app.use(logRequest); // Middleware para loguear las solicitudes

// Rutas
app.use('/productos', productosRoutes);
app.use('/usuarios', usuariosRoutes);
app.use('/carrito', carritosRoutes);
app.use('/categorias', categoriasRoutes);
app.use('/tipo-usuario', tipoUsuarioRoutes);
app.use('/pedidos', pedidosRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
    const pool = require('./config/db-config');

    pool.query('SELECT NOW()', (err, dbResult) => {
        if (err) {
            res.status(500).json({
                status: 'unhealthy',
                timestamp: new Date().toISOString(),
                database: 'disconnected',
                error: err.message
            });
        } else {
            res.status(200).json({
                status: 'healthy',
                timestamp: new Date().toISOString(),
                database: 'connected',
                db_time: dbResult.rows[0].now,
                uptime: process.uptime()
            });
        }
    });
});

// Test de conexión a base de datos
const pool = require('./config/db-config');

pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('❌ Error al conectar con la base de datos:', err);
    } else {
        console.log('✅ Conectado a la base de datos:', res.rows[0]);
    }
});

// Inicio del servidor
if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log('🚀 Backend desplegado en Railway');
        console.log(`🌐 URL pública: ${process.env.PUBLIC_URL}`);
        console.log(`🔒 Orígenes CORS permitidos: ${corsOptions.origin}`);
        console.log(`📡 Escuchando en puerto interno: ${process.env.PUBLIC_URL}`);
    });
}

module.exports = app; // Exportar para tests
