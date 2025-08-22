import { battle } from "../../battle";

export default () => `
  ${battle.enemy && !battle.winner ? '<button type="button" id="resume">Продолжить бой</button>' : ''}
  <button type="button" id="start">Начать бой</button>
`;
