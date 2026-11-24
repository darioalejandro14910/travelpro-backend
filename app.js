require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/db');

const userRoutes = require('./src/routes/userRoute');
const categoryRoutes = require('./src/routes/categoryRoute');
const destinationRoutes = require('./src/routes/destinationRoute');
const packageRoutes = require('./src/routes/packageRoute');
const departureRoutes = require('./src/routes/departureRoute');
const bookingRoutes = require('./src/routes/bookingRoute');

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/usuarios', userRoutes);
app.use('/api/categorias', categoryRoutes);
app.use('/api/destinos', destinationRoutes);
app.use('/api/paquetes', packageRoutes);
app.use('/api/salidas', departureRoutes);
app.use('/api/reservas', bookingRoutes);

app.get('/', (req, res) => {
  res.status(200).json({ mensaje: 'API TravelPro Agency funcionando correctamente' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});