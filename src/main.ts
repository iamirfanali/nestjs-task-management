import { ValidationPipe, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './transform.interceptor';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // For now allowing all environments -> We can fine tune as per our trusted environments
  app.useGlobalPipes(new ValidationPipe()); // Added validation pipe at application level
  app.useGlobalInterceptors(new TransformInterceptor()); // Added interceptor to transform data response

  const port = process.env.PORT;
  await app.listen(port);
  logger.log(`Application listening on port ${port}`);
}
bootstrap();
