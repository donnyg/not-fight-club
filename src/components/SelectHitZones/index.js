import styles from './SelectHitZones.module.scss';
import { Battle, battle } from '../../battle';

export default () => `
  <form id="form">
    <fieldset class="${styles.fieldset}">
      <legend>Выберите 2 зоны защиты</legend>
      ${Battle.hitZones.map((hitZone, index) => `
        <label>
          <input type="checkbox" name="defenseZoneId" value="${index}" ${battle.player.defenseZonesIds?.includes(index) ? 'checked' : ''}>
          ${hitZone}
        </label>
      `).join('')}
    </fieldset>
    <fieldset class="${styles.fieldset}">
      <legend>Выберите зону атаки</legend>
      ${Battle.hitZones.map((hitZone, index) => `
        <label>
          <input type="radio" name="attackZoneId" value="${index}" ${battle.player.attackZoneId === index ? 'checked' : ''}>
          ${hitZone}
        </label>
      `).join('')}
    </fieldset>
  </form>
`;
