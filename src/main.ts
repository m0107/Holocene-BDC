import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './exceptions/exception.filter';
import { BadRequestException, ValidationError, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      transformOptions: {
        strategy: 'exposeAll', // This makes all validation errors available in the response
      },
      exceptionFactory: (errors) => {

        return new BadRequestException({
          statusCode: 400,
          message: 'Validation failed',
          errors: ["Check Request body data"],
        });
      },
    }),
  );

  await app.listen(3000);
}
bootstrap();
