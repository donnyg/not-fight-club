import styles from './LoginView.module.scss';
import SelectCharacter from "../../components/SelectCharacter";

export default () => `
  <form class="${styles.form}" id="form">
    <input type="text" name="name" id="name" minlength="1" maxlength="64" placeholder="Введите имя персонажа" required autofocus>
    ${SelectCharacter()}
    <button type="submit" id="submit" disabled>Создать</button>
  </form>
`;
