
import express, { Application } from 'express';
import cors from 'cors';
import { userRoutes } from './app/config/modules/user/user.route';
const app: Application = express();

import globalErrorHandeler from './app/config/middleWares/globalerrohandeler';
import notFound from './app/config/middleWares/notfound';
import router from './app/config/routes';




//parser

app.use(express.json())
app.use(cors())

// application routes

app.use('/api/v1',router);


app.use(globalErrorHandeler)

//not found route

app.use(notFound)




export default app;

