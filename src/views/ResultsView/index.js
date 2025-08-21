import { battle } from "../../battle";

export default () => `
  <h3 class="title">${battle.winner === 'player' ? 'Вы победили' : 'Вы проиграли'}</h3>
  ${battle.log.join('<br>')}
  <br>
  <button type="button" id="main">На главную</button>
`;
