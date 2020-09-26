import { Spade, Club, Diamond, Heart, SuitedCard } from '../cards/suited';
import { BLACK, RED, Color } from '../types/color';
import { CLUB, DIAMOND, HEART, SPADE, Suit } from '../types/suit';
import { ACE, JACK, JOKER, KING, NumberRank, QUEEN, Rank } from '../types/rank';
import { Joker } from '../cards/joker';

describe('cards', () => {
  const T = true;
  const F = false;
  interface IsXxxTestCase {
    isAce: boolean;
    isJack: boolean;
    isQueen: boolean;
    isKing: boolean;
    isJoker: boolean;
    isRed: boolean;
    isBlack: boolean;
  }

  describe('SuitedCard', () => {
    interface TestCase extends IsXxxTestCase {
      card: SuitedCard;
      rank: NumberRank;
      suit: Suit;
      color: Color;
    }
    test.each`
      card                 | suit       | color    | rank     | isAce | isJack | isQueen | isKing | isJoker | isRed | isBlack
      ${new Spade(2)}      | ${SPADE}   | ${BLACK} | ${2}     | ${F}  | ${F}   | ${F}    | ${F}   | ${F}    | ${F}  | ${T}
      ${new Spade(JACK)}   | ${SPADE}   | ${BLACK} | ${JACK}  | ${F}  | ${T}   | ${F}    | ${F}   | ${F}    | ${F}  | ${T}
      ${new Club(QUEEN)}   | ${CLUB}    | ${BLACK} | ${QUEEN} | ${F}  | ${F}   | ${T}    | ${F}   | ${F}    | ${F}  | ${T}
      ${new Diamond(KING)} | ${DIAMOND} | ${RED}   | ${KING}  | ${F}  | ${F}   | ${F}    | ${T}   | ${F}    | ${T}  | ${F}
      ${new Heart(ACE)}    | ${HEART}   | ${RED}   | ${ACE}   | ${T}  | ${F}   | ${F}    | ${F}   | ${F}    | ${T}  | ${F}
    `('$suit$rankは$color', ({ card, ...expected }: TestCase) => {
      expect(card.color).toBe(expected.color);
      expect(card.suit).toBe(expected.suit);
      expect(card.rank).toBe(expected.rank);
      expect(card.isAce).toBe(expected.isAce);
      expect(card.isJack).toBe(expected.isJack);
      expect(card.isQueen).toBe(expected.isQueen);
      expect(card.isKing).toBe(expected.isKing);
      expect(card.isJoker).toBe(expected.isJoker);
      expect(card.isRed).toBe(expected.isRed);
      expect(card.isBlack).toBe(expected.isBlack);
    });
  });

  describe('Joker', () => {
    interface TestCase extends IsXxxTestCase {
      card: Joker;
      color: Color;
      rank: Rank;
    }
    test.each`
      card                | color    | rank     | isAce | isJack | isQueen | isKing | isJoker | isRed | isBlack
      ${new Joker(BLACK)} | ${BLACK} | ${JOKER} | ${F}  | ${F}   | ${F}    | ${F}   | ${T}    | ${F}  | ${T}
      ${new Joker(RED)}   | ${RED}   | ${JOKER} | ${F}  | ${F}   | ${F}    | ${F}   | ${T}    | ${T}  | ${F}
    `('$rankの色が$color', ({ card, ...expected }: TestCase) => {
      expect(card.color).toBe(expected.color);
      expect(card.rank).toBe(expected.rank);
      expect(card.isAce).toBe(expected.isAce);
      expect(card.isJack).toBe(expected.isJack);
      expect(card.isQueen).toBe(expected.isQueen);
      expect(card.isKing).toBe(expected.isKing);
      expect(card.isJoker).toBe(expected.isJoker);
      expect(card.isRed).toBe(expected.isRed);
      expect(card.isBlack).toBe(expected.isBlack);
    });
  });
});
