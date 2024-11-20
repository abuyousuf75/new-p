import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { StudentRoutes } from './app/config/modules/students/student.route';
const app: Application = express();




//parser

app.use(express.json())
app.use(cors())

// application routes

app.use('/api/v1/student', StudentRoutes);


console.log(process.cwd())
export default app;

