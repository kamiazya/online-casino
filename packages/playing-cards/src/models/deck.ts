import { CardCollection } from './card-collection';
import { Card } from './card';
import { EventType, PlayingCardBase } from './playing-card-base';

export interface DeckEventType extends EventType {
  draw: () => void;
}

/**
 * デッキ
 */
export abstract class Deck<C extends Card> extends PlayingCardBase {
  /**
   * デッキの管理下にある全てのカードがある
   */
  protected deck: CardCollection<C>;
  // protected field: CardCollection<C> = new CardCollection();
  // protected discard: CardCollection<C> = new CardCollection();
  constructor(cards: C[]) {
    super();
    this.deck = new CardCollection(cards);
  }

  public shaffle(): void {
    //
  }
}
