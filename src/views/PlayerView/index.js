import styles from './PlayerView.module.scss';
import { player } from './../../player';
import { Battle } from './../../battle';
import SelectCharacter from '../../components/SelectCharacter';

export default () => `
  <div class="container">
    <div class="${styles.stats}">
      <img src="./assets/skins/${Battle.characters[player.characterId].skinId}.webp" alt="${Battle.characters[player.characterId].name}">
      <div>
        <h3 class="title">${player.name}</h3>
        <p>Побед: ${player.stats.wins}</p>
        <p>Поражений: ${player.stats.loses}</p>
      </div>
    </div>
    <div class="${styles.change}">
      <h2 class="title">Сменить персонажа</h2>
      <form id="form">
        ${SelectCharacter(player.characterId)}
        <button type="submit" id="submit">Сохранить</button>
      </form>
    </div>
  </div>
`;
