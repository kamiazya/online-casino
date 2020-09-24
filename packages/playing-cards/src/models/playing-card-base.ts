import EventEmitter from 'eventemitter3';

export type EventType = { [event: string]: (...args: any[]) => void };

export class PlayingCardBase<T extends EventType = EventType> extends EventEmitter<T> {}
