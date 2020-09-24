import { EventType, PlayingCardBase } from './playing-card-base';

export interface CardEventType extends EventType {
  removed: (hoge: string) => void;
  discard: () => void;
}

export type CardType = {
  new <T extends Card>(...args: any[]): T;
};

/**
 * カードの実体を表現するオブジェクト。
 */
export abstract class Card<T extends EventType = EventType> extends PlayingCardBase<CardEventType | T> {
  /**
   * カードコレクションから削除された際に発火されるイベント
   */
  static REMOVED: keyof CardEventType = 'removed';
  /**
   * 捨札に移動された際に発火されるイベント
   */
  static DISCARD: keyof CardEventType = 'discard';
}
