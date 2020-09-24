import { CardCollection } from '../card-collection';
import { TestCard } from './utils/test-card';

describe('CardCollection', () => {
  let collection: CardCollection<TestCard>;
  let cards: TestCard[];
  beforeEach(() => {
    cards = new Array(10).fill(null).map((_, index) => new TestCard(index));
    collection = new CardCollection();
  });

  test('コンストラクタでカードの配列を与えることができる', () => {
    collection = new CardCollection(cards);
    expect(collection.length).toStrictEqual(10);
  });

  test('Iterableなオブジェクトである', () => {
    collection = new CardCollection(cards);
    let i = 0;
    for (const card of collection) {
      expect(card.index).toBe(i++);
    }
  });

  test('addメソッド', () => {
    collection.addToTop(...cards);
    expect(collection.length).toStrictEqual(10);
  });
});
