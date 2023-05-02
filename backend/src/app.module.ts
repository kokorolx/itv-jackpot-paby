import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GamesModule } from './games/games.module';
import { RouterModule } from '@nestjs/core';

@Module({
  imports: [
    GamesModule,
    RouterModule.register([
      {
        path: '',
        module: GamesModule,
      },
    ])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
