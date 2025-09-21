import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';
import analyticsRoutes from './routes/analytics.js';
import { seedDatabase } from './utils/seedData.js';

dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/analytics', analyticsRoutes);

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);
  
  socket.on('subscribe-to-analytics', () => {
    console.log('Client subscribed to analytics updates');
  });
  
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Initialize database with sample data
seedDatabase().then(() => {
  console.log('Database seeded successfully');
}).catch(console.error);

// Start server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export { io };