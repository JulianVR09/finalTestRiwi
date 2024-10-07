import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from "@nestjs/common";
import { QueryFailedError } from "typeorm";
import { Response } from "express";

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
    private readonly logger = new Logger(AllExceptionFilter.name);

    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        
        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message : string | object = 'Internal Server Error';

        if(exception instanceof HttpException) {
            status = HttpStatus.BAD_REQUEST;
            message = 'Duplicate request';
        } else if(exception instanceof QueryFailedError) {
            if(exception.driverError.code === 'ER_DUP_ENTRY') {
                status = HttpStatus.BAD_REQUEST;
                message = 'Duplicate entry';
            } else {
                message = exception.message;
            }
        } else if (exception instanceof Error) {
            message = exception.message;
        }

        this.logger.error({
            status,
            message,
            stack: exception instanceof Error ? exception.stack : null,
        });

        response.status(status).json({ 
            statusCode: status,
            message: typeof message === 'string' ? message : (message as any).message || 'An error occurred',
            timestamp: new Date().toISOString(),
            path: request.url,
         });
    }
}