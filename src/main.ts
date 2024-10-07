import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AllExceptionFilter } from './common/filters/exception.filter';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v0')

  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );

  app.useGlobalFilters(new AllExceptionFilter)
  app.useGlobalInterceptors(new ResponseInterceptor)

  const config = new DocumentBuilder()
    .setTitle('final test')
    .setDescription('Documentation for the final test')
    .setVersion('1.0')
    .build();

    const documnet = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api-docs', app, documnet)

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
