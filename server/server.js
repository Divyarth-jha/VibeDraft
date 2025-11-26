import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import ConnectDB from './configs/db.js';
import adminRouter from './routes/adminRoutes.js';
import blogRouter from './routes/blogRoutes.js';

const app = express();

// Database connection
await ConnectDB();

// CORS Middleware (VERY IMPORTANT for Vercel + Render)
app.use(cors({
  origin: [
    "https://vibe-draft-seven.vercel.app", // Vercel Frontend URL
    "http://localhost:5173" // Local Development URL
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.options("*", cors());

// JSON Middleware
app.use(express.json());

// Routes
app.get('/', (req, res) => res.send("API is Working"));

app.use('/api/admin', adminRouter);
app.use('/api/blog', blogRouter);

// Server Start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});

export default app;
