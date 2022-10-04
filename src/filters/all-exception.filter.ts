import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  HttpException,
  InternalServerErrorException,
} from '@nestjs/common'
import { BaseExceptionFilter } from '@nestjs/core'
import { TypeORMError } from 'typeorm'

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    if (exception instanceof TypeORMError) {
      console.log(exception.message)
      super.catch(
        new BadRequestException(`TypeORM query error: ${exception.message}`),
        host,
      )
    } else if (exception instanceof HttpException) {
      console.log(exception.message)
      super.catch(exception, host)
    } else if (exception instanceof Error) {
      console.log(exception.message)
      super.catch(new InternalServerErrorException(exception.message), host)
    } else {
      console.log(exception)
      super.catch(new InternalServerErrorException(exception), host)
    }
  }
}
