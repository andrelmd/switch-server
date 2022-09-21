
import { ArgumentsHost, BadRequestException, Catch } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { TypeORMError } from 'typeorm';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        if (exception instanceof TypeORMError) {
            console.log(exception.message)
            super.catch(new BadRequestException(`TypeORM query error: ${exception.message}`), host)
        }
    }
}
