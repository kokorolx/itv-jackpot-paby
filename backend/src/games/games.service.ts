import { Injectable } from '@nestjs/common';
import { RollGameDto } from './dto/roll-game.dto';
import { db } from 'src/db';
import { v4 as uuidv4 } from 'uuid';
import { uniq } from 'lodash';
import { doRoll, getPercentRandom } from './helper';
const INIT_CREDIT = 10;

@Injectable()
export class GamesService {
  create() {
    const game = db.getCollection('games').insert({ id: uuidv4(), credit: INIT_CREDIT });

    return { game };
  }

  roll(rollGameDto: RollGameDto) {
    const { gameID } = rollGameDto;

    const game = db.getCollection('games').findOne({ id: gameID });

    if (game.credit === 0) {
      return { game, message: 'Oops! You have reached your credit limit. Please purchase more credits to continue playing.' };
    }

    const newCredit = game.credit - 1;
    game.credit = newCredit;

    let result = doRoll();
    let isWin = uniq(result).length === 1;

    if (isWin) {
      if ((game.credit > 40 && game.credit <= 60) && (getPercentRandom() < 30)) {
        result = doRoll();
      }
  
      if (game.credit > 60 && getPercentRandom() < 60) {
        result = doRoll();
      }

      isWin = uniq(result).length === 1;
    }

    if (isWin) {
      const winType = uniq(result)[0];

      let winCredit = 0;

      switch (winType) {
        case 'C':
          winCredit = 10;
          break;
        case 'L':
          winCredit = 20;
          break;
        case 'O':
          winCredit = 30;
          break;
        case 'W':
          winCredit = 40;
          break;
        default:
          winCredit = 0;
      }

      const newCredit = game.credit + winCredit;
      game.credit = newCredit;
    }

    db.getCollection('games').update(game);

    const updatedGame = db.getCollection('games').findOne({ id: gameID });

    return { game: updatedGame, result, isWin };
  }
}
