import { PlayingCardBase } from './playing-card-base';
import { Card } from './card';
export class CardCollection<C extends Card> extends PlayingCardBase {
  protected cards: C[];
  constructor(public readonly name: string, cards: C[] = []) {
    super();
    this.cards = cards.slice();
  }

  public add(...cards: readonly C[]): void {
    this.cards.push(...cards);
  }
  public remove(...cards: readonly C[]): void {
    const removedCards = this.cards.filter((c) => !cards.includes(c));
    this.cards = removedCards;
    for (const card of cards) {
      card.emit(Card.REMOVED, {
        type: Card.REMOVED,
        target: card,
      });
    }
  }
}
