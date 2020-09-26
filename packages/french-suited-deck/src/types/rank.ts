import { Range } from './util';

export type NumberRank = Range<1, 14>;
export type JokerRank = 'JOKER';
export type Rank = NumberRank | JokerRank;
export const JOKER: JokerRank = 'JOKER';

export const ACE: NumberRank = 1;
export const JACK: NumberRank = 11;
export const QUEEN: NumberRank = 12;
export const KING: NumberRank = 13;
