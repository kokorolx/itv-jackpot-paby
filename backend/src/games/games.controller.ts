import {
  Controller,
  Post,
  Body,
} from '@nestjs/common';
import { GamesService } from './games.service';
import { RollGameDto } from './dto/roll-game.dto';

@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Post()
  create() {
    return this.gamesService.create();
  }

  @Post('/roll')
  roll(@Body() rollGameDto: RollGameDto) {
    return this.gamesService.roll(rollGameDto);
  }
}
