import { Deck } from '@kamiazya-online-casino/playing-cards';
import { FrenchSuitedCard } from './cards/abstract';
import { Joker } from './cards/joker';
import { Club, Diamond, Heart, Spade } from './cards/suited';
import { RED, BLACK, Color } from './types/color';
import { NumberRank } from './types/rank';
import { Enumerate } from './types/util';

const NUMBER_RANKS: ReadonlyArray<NumberRank> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

export class FrenchSuited extends Deck<FrenchSuitedCard> {
  constructor({ joker = 2, shuffle = false }: { joker?: Enumerate<3> | Color; shuffle?: boolean } = {}) {
    const cards: FrenchSuitedCard[] = [
      ...NUMBER_RANKS.map((rank) => new Spade(rank)),
      ...NUMBER_RANKS.map((rank) => new Club(rank)),
      ...NUMBER_RANKS.map((rank) => new Diamond(rank)),
      ...NUMBER_RANKS.map((rank) => new Heart(rank)),
    ];
    switch (joker) {
      case BLACK:
        cards.push(new Joker(BLACK));
        break;
      case RED:
        cards.push(new Joker(RED));
        break;
      case 1:
        cards.push(new Joker(RED));
        break;
      case 2:
        cards.push(new Joker(RED), new Joker(BLACK));
        break;
    }
    super(cards);
    if (shuffle) {
      this.shuffle();
    }
  }
}
