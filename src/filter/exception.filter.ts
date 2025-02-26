import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';


/**
 * Lớp xử lý exception của HttpException và format kiểu dữ liệu trả về khi xảy ra exception
 * @author namhm
 * @version 1.0
 * @since 2025-02-16
  */
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();

    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    let message = exceptionResponse['message'];

    // Nối message thành 1 chuỗi
    if (Array.isArray(message)) {
      message = message.join(', ');
    }
    
    response.status(status).json({
      statusCode: status,
      message: message,
      timeStamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
