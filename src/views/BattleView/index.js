import { player } from "../../player";
import { battle } from "../../battle";

export default () => `
  <p>${battle.characters[player.characterId].name} (HP: ${battle.characters[player.characterId].hp}) vs. ${battle.enemy.name} (HP: ${battle.enemy.hp})</p>
  <button type="button" id="fight">УДАР!</button>
`;
