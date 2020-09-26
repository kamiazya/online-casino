import { Color } from '../types/color';
import { Rank } from '../types/rank';
import { FrenchSuitedCard } from './abstract';

export class Joker extends FrenchSuitedCard {
  public rank: Rank = 'JOKER';
  constructor(public readonly color: Color) {
    super();
  }
}
