import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter{
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const request = ctx.getRequest();
        const response = ctx.getResponse();

        const message = exception.message;
        const status = exception.getStatus();

        response
            .status(status)
            .json({
                "statusCode": status,
                "message": message,
                "timeStamp": new Date().toISOString(),
                "path": request.url
            })
    }
}