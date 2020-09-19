import { CardCollection } from './card-collection';
import { Card } from './card';

export abstract class Deck<C extends Card> extends CardCollection<C> {
  protected all: Set<C>;
  protected discard: CardCollection<C> = new CardCollection('discard');
  constructor(cards: C[]) {
    super('deck', cards);
    this.all = new Set(cards);
  }
}
