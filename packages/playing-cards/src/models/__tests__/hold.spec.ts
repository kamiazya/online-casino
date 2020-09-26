import { CardCollection } from '../card-collection';
import { Hold } from '../hold';
import { TestCard } from './utils/test-card';

describe('Hold', () => {
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
  let hold: Hold<TestCard>;

  beforeEach(() => {
    collection = new CardCollection(cards);
    hold = new Hold(collection);
  });

  describe('生成系', () => {
    test('newで生成する', () => {
      hold = new Hold(collection, [c1, c2]);
      expect(hold.length).toBe(2);
      expect(collection.length).toBe(10);
    });
    test('fromのstatic関数で生成する', () => {
      hold = Hold.from(collection, 5);
      expect(hold.length).toBe(5);
      expect(collection.length).toBe(5);
    });
  });

  describe('操作', () => {
    test('drawで最初に指定したデータソースからカードを引く', () => {
      hold.draw();
      expect(hold.slice()).toStrictEqual([c0]);
      expect(collection.slice()).toStrictEqual([c1, c2, c3, c4, c5, c6, c7, c8, c9]);

      hold.draw(2, { putTo: 'top' });
      expect(hold.slice()).toStrictEqual([c1, c2, c0]);
      expect(collection.slice()).toStrictEqual([c3, c4, c5, c6, c7, c8, c9]);

      hold.draw(2, { putTo: 'bottom' });
      expect(hold.slice()).toStrictEqual([c1, c2, c0, c3, c4]);
      expect(collection.slice()).toStrictEqual([c5, c6, c7, c8, c9]);

      hold.draw(2, { from: 'bottom' });
      expect(hold.slice()).toStrictEqual([c8, c9, c1, c2, c0, c3, c4]);
      expect(collection.slice()).toStrictEqual([c5, c6, c7]);
    });
  });
});
