import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import ConnectDB from './configs/db.js';
import adminRouter from './routes/adminRoutes.js';
import blogRouter from './routes/blogRoutes.js';

const app = express();

await ConnectDB();

app.use(cors({
  origin: "https://vibe-draft-seven.vercel.app",
  credentials: true
}));

app.options('*', cors());
app.use(express.json());

// Routes
app.get('/', (req,res)=>res.send("API is Working"));
app.use('/api/admin', adminRouter);
app.use('/api/blog', blogRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on PORT " + PORT));
