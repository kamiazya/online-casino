import { EventType } from './playing-card-base';
import { Card } from './card';
import { CardCollection } from './card-collection';

export class Hold<C extends Card, E extends EventType = EventType> extends CardCollection<C, E> {
  /**
   * ソースを指定してカードを引く。
   */
  public draw(
    source: CardCollection<C>,
    { size = 1, direction = 'bottom' }: { size?: number; direction?: 'top' | 'bottom' } = {},
  ): void {
    const cards = direction === 'top' ? source.items(0, size) : source.items(Math.max(source.length - size, 0), size);
    source.remove(...cards);
    this.addToTop(...cards);
  }
}
