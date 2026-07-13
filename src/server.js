import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import { connectMongoDB } from './db/connectMongoDB.js';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import notesRoutes from './routes/notesRoutes.js';

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(logger); // Логування запитів
app.use(express.json()); // Middleware для парсингу JSON
app.use(cors()); // Middleware дозволяє робити запити з інших доменів

app.use(notesRoutes); // Підключення маршрутизатора нотаток

app.use(notFoundHandler); // Middleware для неіснуючих маршрутів
app.use(errorHandler); // Middleware для обробки помилок

await connectMongoDB(); // підключення до MongoDB

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
