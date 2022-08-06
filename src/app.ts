import express, {Request, Response, NextFunction} from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import routesLoader from "./startup/routes";

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Load routes
routesLoader(app);

export default app;
