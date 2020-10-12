import { CardCollection, Hold } from '@kamiazya-online-casino/playing-cards';
import { FrenchSuited, FrenchSuitedCard } from '@kamiazya-online-casino/french-suited-deck';

export class Turn {
  public answer!: (answer: 'high' | 'low') => void;
  constructor(public player: 1 | 2, public readonly parent: FrenchSuitedCard, public readonly child: FrenchSuitedCard) {
    this.highOrLow = new Promise((resolve) => {
      this.answer = resolve;
    });
  }

  public highOrLow: Promise<'high' | 'low'>;
}

export class HighAndLowGame {
  public readonly deck: FrenchSuited;
  public readonly discard = new CardCollection<FrenchSuitedCard>();

  public readonly scores: {
    1: number;
    2: number;
  } = { 1: 0, 2: 0 };
  public readonly holds: {
    1: Hold<FrenchSuitedCard>;
    2: Hold<FrenchSuitedCard>;
  };

  constructor() {
    this.deck = new FrenchSuited({ joker: 0, shuffle: true });
    const [hold1, hold2] = this.deck.divide(2);
    this.holds = { 1: hold1, 2: hold2 };
  }

  public async *start(): AsyncGenerator<Turn> {
    const parent = 1;
    const child = 2;
    do {
      const [parentCard] = this.holds[parent].take(1, { from: 'top' });
      const [childCard] = this.holds[child].take(1, { from: 'top' });
      const turn = new Turn(parent, parentCard, childCard);
      yield turn;
      const hl = await turn.highOrLow;

      if (childCard.rank === parentCard.rank) {
        // 同点のため点数に変動なし
      } else if (hl === 'high') {
        const win = childCard.rank > parentCard.rank ? parent : child;
        this.scores[win]++;
      } else if (hl === 'low') {
        const win = childCard.rank < parentCard.rank ? parent : child;
        this.scores[win]++;
      }

      this.discard.addToTop(parentCard);
      this.discard.addToTop(childCard);

    } while (this.discard.length !== 52);
  }
}

export class AI {
  async sleep(time: number): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(resolve, time);
    });
  }
  public async play(turn: Turn): Promise<void> {
    await this.sleep(1000);
    if (Math.random() > 0.5) {
      console.log(`AI: may be HIGH then ${turn.parent.rank}`);
      turn.answer('high');
    } else {
      turn.answer('low');
      console.log(`AI: may be LOW then ${turn.parent.rank}`);
    }
  }
}

// export async function main(): Promise<void> {
//   const game = new HighAndLowGame();
//   const ai = new AI();
//   for await (const turn of game.start()) {
//     switch (turn.player) {
//       case 1:
//         console.log('Your Turn: ');
//         const { result } = await prompts({
//           type: 'autocomplete',
//           name: 'result',
//           message: 'high or low?: ' + turn.parent.rank,
//           choices: [
//             { title: 'High', value: 'high' },
//             { title: 'Low', value: 'low' },
//           ],
//         });
//         turn.answer(result);
//         break;
//       default:
//         await ai.play(turn);
//         break;
//     }
//     console.log('Card is ', turn.child.rank);
//     console.log(`Score: YOU ${game.scores[1]} : ${game.scores[2]} AI`);
//   }
// }

// // main();
