import { Card } from '@kamiazya-online-casino/playing-cards';
import { Color, RED, BLACK } from '../types/color';
import { Rank, ACE, JACK, QUEEN, KING, JOKER } from '../types/rank';

export abstract class FrenchSuitedCard extends Card {
  public abstract color: Color;
  public abstract rank: Rank;
  get isAce(): boolean {
    return this.rank === ACE;
  }

  get isJack(): boolean {
    return this.rank === JACK;
  }

  get isQueen(): boolean {
    return this.rank === QUEEN;
  }
  get isKing(): boolean {
    return this.rank === KING;
  }

  get isJoker(): boolean {
    return this.rank === JOKER;
  }

  get isRed(): boolean {
    return this.color === RED;
  }

  get isBlack(): boolean {
    return this.color === BLACK;
  }

  public is<T extends { new (...args: any[]): FrenchSuitedCard }>(...cardTypes: T[]): boolean {
    return cardTypes.every((t) => this instanceof t);
  }
}
