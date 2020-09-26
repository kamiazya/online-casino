import { FrenchSuited } from '../deck';
import { Spade, Club, Diamond, Heart } from '../cards/suited';
import { Joker } from '../cards/joker';
import { RED, BLACK } from '../types/color';

describe('FrenchSuited', () => {
  function checkDeck(deck: FrenchSuited) {
    expect(deck.slice().filter((card) => card.is(Spade)).length).toBe(13);
    expect(deck.slice().filter((card) => card.is(Club)).length).toBe(13);
    expect(deck.slice().filter((card) => card.is(Diamond)).length).toBe(13);
    expect(deck.slice().filter((card) => card.is(Heart)).length).toBe(13);
  }

  test('デフォルト', () => {
    const deck = new FrenchSuited();
    expect(deck.length).toBe(54);
    checkDeck(deck);
    expect(deck.slice().filter((card) => card.is(Joker)).length).toBe(2);
  });

  describe('ジョーカーの枚数を指定する', () => {
    test.each`
      joker
      ${0}
      ${1}
      ${2}
    `('$joker枚', ({ joker }) => {
      const deck = new FrenchSuited({ joker: joker });
      expect(deck.length).toBe(52 + joker);
      checkDeck(deck);
      expect(deck.slice().filter((card) => card.is(Joker)).length).toBe(joker);
    });
    test('red', () => {
      const deck = new FrenchSuited({ joker: RED });
      expect(deck.length).toBe(53);
      checkDeck(deck);
      expect(deck.slice().filter((card) => card.is(Joker)).length).toBe(1);
    });

    test('black', () => {
      const deck = new FrenchSuited({ joker: BLACK });
      expect(deck.length).toBe(53);
      checkDeck(deck);
      expect(deck.slice().filter((card) => card.is(Joker)).length).toBe(1);
    });
  });
});
