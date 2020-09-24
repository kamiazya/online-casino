import { PlayingCardBase, EventType } from './playing-card-base';
import { Card } from './card';

/**
 * 順序を持ったカードのコレクションを表現するミュータブルなオブジェクト。
 */
export class CardCollection<C extends Card, E extends EventType = EventType> extends PlayingCardBase<E> {
  protected cards: C[];
  constructor(cards: C[] = []) {
    super();
    this.cards = cards.slice();
  }

  /**
   * コレクション内のカード数を返す。
   */
  get length(): number {
    return this.cards.length;
  }

  /**
   * indexを指定して、カードを取得する。
   *
   * @description
   * コレクション内の指定された index (先頭はゼロ) 位置にある特定のカードを返す。
   * index が範囲外なら null を返す。
   *
   * indexが小さい方が上。
   */
  public item(index: number): C | null {
    return this.cards[index] ?? null;
  }

  /**
   * rangeを指定して、カードを取得する。
   */
  public items(start = 0, end = this.length - 1): C[] {
    return this.cards.slice(start, end);
  }

  /**
   * カードを上から追加する。
   */
  public addToTop(...cards: C[]): void {
    this.cards.unshift(...cards);
  }

  /**
   * カードを下から追加する。
   */
  public addToBottom(...cards: C[]): void {
    this.cards.push(...cards);
  }

  /**
   * カードが含まれるかを判定する。
   */
  public has(card: C): boolean {
    return this.cards.indexOf(card) !== -1;
  }

  /**
   * カードを削除する。
   */
  public remove(...cards: C[]): void {
    this.cards = this.cards.filter((c) => !cards.includes(c));
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public *[Symbol.iterator]() {
    for (const card of this.cards) {
      yield card;
    }
  }

  /**
   * シャッフルする
   *
   * @description
   * Fisher–Yatesアルゴリズム
   */
  public shaffle(): void {
    for (let i = this.length - 1; i > 0; i--) {
      const r = Math.floor(Math.random() * (i + 1));
      const tmp = this.cards[i];
      this.cards[i] = this.cards[r];
      this.cards[r] = tmp;
    }
  }
}
