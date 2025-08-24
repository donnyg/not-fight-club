import styles from './SettingsView.module.scss';

export default () => `
  <form class="container" id="form">
    <label class="${styles.label}">
      Сменить имя:
      <input type="text" name="name" id="name" minlength="1" maxlength="64" placeholder="Введите новое имя" required autofocus>
    </label>
    <button type="submit" id="submit" disabled>Сохранить</button>
  </form>
`;
