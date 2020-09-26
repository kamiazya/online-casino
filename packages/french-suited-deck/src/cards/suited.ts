import { NumberRank } from '../types/rank';
import { SPADE, CLUB, DIAMOND, HEART, Suit, BLACK_SUITS } from '../types/suit';
import { FrenchSuitedCard } from './abstract';
import { Color, BLACK, RED } from '../types/color';

export abstract class SuitedCard extends FrenchSuitedCard {
  get color(): Color {
    return BLACK_SUITS.includes(this.suit) ? BLACK : RED;
  }
  public abstract rank: NumberRank;

  constructor(public readonly suit: Suit) {
    super();
  }
}

export class Spade extends SuitedCard {
  constructor(public readonly rank: NumberRank) {
    super(SPADE);
  }
}

export class Club extends SuitedCard {
  constructor(public readonly rank: NumberRank) {
    super(CLUB);
  }
}

export class Diamond extends SuitedCard {
  constructor(public readonly rank: NumberRank) {
    super(DIAMOND);
  }
}

export class Heart extends SuitedCard {
  constructor(public readonly rank: NumberRank) {
    super(HEART);
  }
}
