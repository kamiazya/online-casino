import { Deck } from '../models/deck';
import { Card } from '../models/card';

export type Suit = 'S' | 'C' | 'D' | 'H';

export type Rank = string;

export const SPADE: Suit = 'S';
export const CLUB: Suit = 'C';
export const DIAMOND: Suit = 'D';
export const HEART: Suit = 'H';

export class FrenchSuitedCard extends Card {
  constructor(public readonly suit: Suit, public readonly rank: Rank) {
    super();
  }
}

export class FrenchSuited extends Deck<FrenchSuitedCard> {
  constructor() {
    super([]);
  }
}
