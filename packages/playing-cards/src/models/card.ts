import { EventType, PlayingCardBase } from './playing-card-base';

/**
 * カードの実体を表現するオブジェクト。
 */
export abstract class Card<T extends EventType = EventType> extends PlayingCardBase<T> {}
