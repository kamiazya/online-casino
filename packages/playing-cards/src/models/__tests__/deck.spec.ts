import { TestCard } from './utils/test-card';
import { TestDeck } from './utils/test-deck';

describe('TestDeck', () => {
  let deck: TestDeck;
  const c0 = new TestCard(0);
  const c1 = new TestCard(1);
  const c2 = new TestCard(2);
  const c3 = new TestCard(3);
  const c4 = new TestCard(4);
  const c5 = new TestCard(5);
  const c6 = new TestCard(6);
  const c7 = new TestCard(7);
  const c8 = new TestCard(8);
  const c9 = new TestCard(9);
  const cards = [c0, c1, c2, c3, c4, c5, c6, c7, c8, c9];

  beforeEach(() => {
    deck = new TestDeck(cards);
  });

  describe('操作', () => {
    describe('divideで指定された数の手札に分割する', () => {
      test('2つに分割する', () => {
        const [hold1, hold2] = deck.divide(2);
        expect(hold1.slice()).toStrictEqual([c0, c1, c2, c3, c4]);
        expect(hold2.slice()).toStrictEqual([c5, c6, c7, c8, c9]);
      });
      test('3つに分割する', () => {
        const [hold1, hold2, hold3] = deck.divide(3);
        expect(hold1.slice()).toStrictEqual([c0, c1, c2, c3]);
        expect(hold2.slice()).toStrictEqual([c4, c5, c6]);
        expect(hold3.slice()).toStrictEqual([c7, c8, c9]);
      });
    });
  });
});
