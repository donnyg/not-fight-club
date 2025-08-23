import styles from './SelectCharacter.module.scss';
import { Battle } from '../../battle';

export default (selectId = 0) => `
  <fieldset class="${styles.list}">
    ${Battle.characters.map((character, index) => `
      <label class="${styles.item}">
        <input class="${styles.input}" type="radio" name="character" value="${index}" ${index === selectId ? 'checked' : ''}>
        <img class="${styles.img}" src="./assets/skins/${character.skinId}.webp" alt="${character.name}">
        <span class="${styles.name}">${character.name}</span>
      </label>
    `).join('')}
  </fieldset>
`;
