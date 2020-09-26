import { CardCollection } from './card-collection';
import { Card } from './card';
import { EventType } from './playing-card-base';
import { Hold } from './hold';

type Repeat<T, N extends number, R extends any[] = []> = R['length'] extends N ? R : Repeat<T, N, [T, ...R]>;

/**
 * デッキ
 */
export abstract class Deck<C extends Card, T extends EventType = EventType> extends CardCollection<C, T> {
  public divide<N extends number>(n: N): Repeat<Hold<C>, N> {
    const base = Math.floor(this.length / n); // 最低の配当
    const rem = this.length % n; // あまり

    const list: number[] = [];
    for (let i = 0; i < n; i++) {
      list[i] = i < rem ? base + 1 : base;
    }
    /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
    // @ts-ignore
    return list.map((x) => Hold.from(this, x));
  }
}
