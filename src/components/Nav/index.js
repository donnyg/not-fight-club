import styles from './Nav.module.scss';
import { Router, router } from '../../router';

export default () => {

  const navItems = Router.navItems.map((item) => {
    return `
      <li>
        <button type="button" class="${styles.button}">
          <img src="./assets/icons/${item.iconName}${item.path === router.currentView ? '-filled' : ''}.svg" width="32" alt="${item.path}">
        </button>
      </li>
    `;
  }).join('');

  return `
    <nav class="nav">
      <ul class="${styles.list}">
        ${navItems}
      </ul>
    </nav>
  `;
}
