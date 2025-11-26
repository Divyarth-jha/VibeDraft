import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import ConnectDB from './configs/db.js';
import adminRouter from './routes/adminRoutes.js';
import blogRouter from './routes/blogRoutes.js';



const app = express();

await ConnectDB()

//midlware

app.use(cors())
app.use(express.json())

//routes

app.get('/',(req,res)=>res.send("API is Working"))

app.use('/api/admin',adminRouter)
app.use('/api/blog',blogRouter)

const PORT = process.env.PORT || 3000 ;

app.listen(PORT,()=>{
    console.log('serever is runing PORT'+ PORT);
    
})

export default app;