import { studentValidations } from './../modules/students/student.validation';
import { Request, Response, NextFunction } from 'express';
import { ZodError, ZodIssue } from 'zod';
import config from '..';
import hadelZodError from '../erroes/handelZodError';
import TErrorSources from '../interface/error';
import handleValidationError from '../erroes/handelValidationError';
import handleCastError from '../erroes/handelCastError';
import AppError from '../erroes/AppError';

const globalErrorHandeler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  {
    let statusCode =500;
    let message =  'Something went worng';

    let errorSources: TErrorSources = [
      {
        path: '',
        message: 'Something went wrong!',
      },
    ];

  
    if(err instanceof ZodError){
      const simplifiedError = hadelZodError(err);
      statusCode = simplifiedError.statusCode;
      message = simplifiedError.message;
      errorSources = simplifiedError?.errorSources;
    }else if (err?.name === 'ValidationError') {
      const simplifiedError = handleValidationError(err);
      statusCode = simplifiedError.statusCode;
      message = simplifiedError.message;
      errorSources = simplifiedError.errorSources;
    } else if (err?.name === 'CastError') {
     const simplifiedError = handleCastError(err);
     statusCode = simplifiedError.statusCode;
     message = simplifiedError.message;
     errorSources = simplifiedError.errorSources;
    } else if(err instanceof AppError){
      statusCode = err?.statusCode,
      message = err?.message,
      errorSources = [{
        path : '',
        message : err?.message
      }]
    } else if(err instanceof Error){
 (message = err?.message),
   (errorSources = [
     {
       path: '',
       message: err?.message,
     },
   ]);
    }
    
    res.status(statusCode).json({
      success: false,
      message,
      errorSources,
      // err,
      stack: config.NODE_ENV ==='development' ? err?.stack : null,
    });
  }
};

export default globalErrorHandeler;
