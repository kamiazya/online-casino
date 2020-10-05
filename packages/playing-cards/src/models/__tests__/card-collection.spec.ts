import { CardCollection } from '../card-collection';
import { TestCard } from './utils/test-card';

describe('CardCollection', () => {
  let collection: CardCollection<TestCard>;
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
    collection = new CardCollection();
  });

  describe('生成系API', () => {
    test('コンストラクタでカードの配列を与えることができる', () => {
      collection = new CardCollection(cards);
      expect(collection.length).toStrictEqual(10);
    });
  });

  describe('非破壊API', () => {
    beforeEach(() => {
      collection = new CardCollection(cards);
    });
    describe('itemで指定したindexのカードを取得できる', () => {
      test.each`
        index | card
        ${0}  | ${c0}
        ${1}  | ${c1}
        ${2}  | ${c2}
        ${3}  | ${c3}
        ${4}  | ${c4}
        ${5}  | ${c5}
        ${6}  | ${c6}
        ${7}  | ${c7}
        ${8}  | ${c8}
        ${9}  | ${c9}
      `('$index番目', ({ index, card }) => {
        expect(collection.item(index)).toBe(card);
      });
    });

    describe('slice', () => {
      test('引数を指定しないと全てのカードを返す', () => {
        expect(collection.slice()).toStrictEqual([c0, c1, c2, c3, c4, c5, c6, c7, c8, c9]);
      });

      test('開始のindexを指定できる', () => {
        expect(collection.slice([4])).toStrictEqual([c4, c5, c6, c7, c8, c9]);
      });

      test('終了のindexを指定できる', () => {
        expect(collection.slice([1, 8])).toStrictEqual([c1, c2, c3, c4, c5, c6, c7]);
      });

      test('step数を指定できる', () => {
        expect(collection.slice([1, 8, 2])).toStrictEqual([c1, c3, c5, c7]);
      });

      test('step数に負の数をを指定すると逆順になる', () => {
        expect(collection.slice([1, 8, -2])).toStrictEqual([c7, c5, c3, c1]);
      });
    });

    test('hasCardでカードの有無を判定できる', () => {
      collection = new CardCollection([c1, c3]);
      expect(collection.includes(c1)).toBe(true);
      expect(collection.includes(c3)).toBe(true);
      expect(collection.includes(c1, c3)).toBe(true);
      expect(collection.includes(c1, c2, c3)).toBe(false);
      expect(collection.includes(c4)).toBe(false);
    });

    test('Iterableなオブジェクトである', () => {
      let i = 0;
      for (const card of collection) {
        expect(card.index).toBe(i++);
      }
    });
  });

  describe('破壊的API', () => {
    describe('add系', () => {
      beforeEach(() => {
        collection = new CardCollection([c0]);
      });
      describe('addメソッド', () => {
        test('topでindexが上の方に入る', () => {
          collection.add('top', [c1, c2]);
          expect(collection.item(0)).toBe(c1);
          expect(collection.item(1)).toBe(c2);
          expect(collection.item(2)).toBe(c0);
          expect(collection.length).toStrictEqual(3);
        });
        test('bottomでindexが下の方に入る', () => {
          collection.add('bottom', [c1, c2]);
          expect(collection.item(0)).toBe(c0);
          expect(collection.item(1)).toBe(c1);
          expect(collection.item(2)).toBe(c2);
          expect(collection.length).toStrictEqual(3);
        });
      });

      test('addToTopでindexが上の方に入る', () => {
        collection.addToTop(c1, c2);
        expect(collection.item(0)).toBe(c1);
        expect(collection.item(1)).toBe(c2);
        expect(collection.item(2)).toBe(c0);
        expect(collection.length).toStrictEqual(3);
      });
      test('addToBottomでindexが下の方に入る', () => {
        collection.addToBottom(c1, c2);
        expect(collection.item(0)).toBe(c0);
        expect(collection.item(1)).toBe(c1);
        expect(collection.item(2)).toBe(c2);
        expect(collection.length).toStrictEqual(3);
      });
    });

    describe('remove系', () => {
      test('removeで指定したカードを取り除く', () => {
        collection = new CardCollection(cards);
        collection.remove(c1, c2);
        expect(collection.slice()).toStrictEqual([c0, c3, c4, c5, c6, c7, c8, c9]);
        collection.remove(c1, c7, c9);
        expect(collection.slice()).toStrictEqual([c0, c3, c4, c5, c6, c8]);
      });

      test('takeで指定した件数のカードを取得する', () => {
        collection = new CardCollection(cards);
        let takenCards = collection.take(2);
        expect(takenCards).toStrictEqual([c0, c1]);
        expect(collection.slice()).toStrictEqual([c2, c3, c4, c5, c6, c7, c8, c9]);
        takenCards = collection.take(3, { from: 'top' });
        expect(takenCards).toStrictEqual([c2, c3, c4]);
        expect(collection.slice()).toStrictEqual([c5, c6, c7, c8, c9]);
        takenCards = collection.take(2, { from: 'bottom' });
        expect(takenCards).toStrictEqual([c8, c9]);
        expect(collection.slice()).toStrictEqual([c5, c6, c7]);
      });
    });

    describe('順番変更系', () => {
      test('reverse', () => {
        collection = new CardCollection(cards);
        collection.reverse();
        expect(collection.slice()).toStrictEqual([c9, c8, c7, c6, c5, c4, c3, c2, c1, c0]);
      });

      test('shuffle', () => {
        collection = new CardCollection(cards);
        collection.shuffle();
        expect(collection.slice()).not.toStrictEqual(cards);
      });
    });
  });
});
