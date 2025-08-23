import styles from './BattleView.module.scss';
import { player } from "../../player";
import { Battle, battle } from "../../battle";
import SelectHitZones from '../../components/SelectHitZones';
import BattleLog from '../../components/BattleLog';

export default () => `
  <div class="container">
    <div class="${styles.battlefield}">
      <div class="${styles.shooter}">
        <p class="${styles.name}">${Battle.characters[player.characterId].name}</p>
        <div class="${styles.hp}">
          <span class="${styles.currentHp}">${battle.player.hp}</span>
          <meter class="${styles.bar}"
            low="${Battle.characters[player.characterId].hp * 0.5}"
            max="${Battle.characters[player.characterId].hp}"
            value="${battle.player.hp}"
          >
            ${battle.player.hp} HP
          </meter>
          <span class="${styles.maxHp}">${Battle.characters[player.characterId].hp}</span>
        </div>
        <img src="./assets/skins/${Battle.characters[player.characterId].skinId}.webp" alt="${Battle.characters[player.characterId].name}">
      </div>
      <span class="${styles.versus}">vs.</span>
      <div class="${styles.shooter}">
        <p class="${styles.name}">${Battle.enemies[battle.enemy.id].name}</p>
        <div class="${styles.hp}">
          <span class="${styles.currentHp}">${battle.enemy.hp}</span>
          <meter class="${styles.bar}"
            low="${Battle.enemies[battle.enemy.id].hp * 0.5}"
            max="${Battle.enemies[battle.enemy.id].hp}"
            value="${battle.enemy.hp}"
          >
            ${battle.enemy.hp} HP
          </meter>
          <span class="${styles.maxHp}">${Battle.enemies[battle.enemy.id].hp}</span>
        </div>
        <img src="./assets/skins/${Battle.enemies[battle.enemy.id].skinId}.webp" alt="${Battle.enemies[battle.enemy.id].name}">
      </div>
    </div>
    ${SelectHitZones()}
    <button type="submit" form="form" id="shoot">УДАР!</button>
    ${BattleLog()}
  </div>
`;
