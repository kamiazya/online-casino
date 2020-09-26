import { EventType } from './playing-card-base';
import { Card } from './card';
import { CardCollection } from './card-collection';
import { Direction } from '../types';

/**
 * 手札
 */
export class Hold<C extends Card, E extends EventType = EventType> extends CardCollection<C, E> {
  static from<C extends Card>(defaultSource: CardCollection<C>, count = 0): Hold<C> {
    const hold: Hold<C> = new Hold(defaultSource);
    if (count > 0) {
      hold.draw(count);
    }
    return hold;
  }

  constructor(public defaultSource: CardCollection<C>, cards?: C[]) {
    super(cards);
  }
  /**
   * カードを引く。
   */
  public draw(
    count = 1,
    {
      putTo = 'top',
      from = 'top',
      source = this.defaultSource,
    }: { putTo?: Direction; from?: Direction; source?: CardCollection<C> } = {},
  ): void {
    if (count < 1) {
      console.log({ count });
      throw new Error();
    }

    const cards = source.take(count, { from });
    this.add(putTo, cards);
  }
}
