import { battle } from "../../battle";
import BattleLog from "../../components/BattleLog";

export default () => `
  <div class="container">
    <p>${battle.winner === 'player' ? 'Вы победили!' : 'Вы проиграли!'}</p>
    ${BattleLog()}
    <button type="button" id="main">На главную</button>
  </div>
`;
