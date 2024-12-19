
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
const app: Application = express();
import globalErrorHandeler from './app/config/middleWares/globalerrohandeler';
import notFound from './app/config/middleWares/notfound';
import router from './app/config/routes';
import cookieParser from 'cookie-parser';





//parser

app.use(express.json())
app.use(cors({ origin: ['http://localhost:5000'] }));
app.use(cookieParser())

// application routes



app.use('/api/v1',router);

app.use(globalErrorHandeler)

//not found route

app.use(notFound)




export default app;

