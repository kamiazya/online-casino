import { Card, Deck } from '@kamiazya-online-casino/playing-cards';

export type Suit = 'S' | 'C' | 'D' | 'H';

export type Rank = string;

export const SPADE: Suit = 'S';
export const CLUB: Suit = 'C';
export const DIAMOND: Suit = 'D';
export const HEART: Suit = 'H';

export class FrenchSuitedCard extends Card {}

export class FrenchSuited extends Deck<FrenchSuitedCard> {
  constructor() {
    super([]);
  }
}
