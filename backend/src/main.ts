import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import { initDB } from './db';

async function bootstrap() {
  initDB();
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  app.use(
    session({
      secret: 'my-secret',
      resave: false,
      saveUninitialized: false,
    }),
  );

  await app.listen(3001);
}
bootstrap();
