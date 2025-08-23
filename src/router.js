import { storage } from "./storage";
import { player } from "./player";
import { battle } from "./battle";
import LoginView from "./views/LoginView";
import HomeView from "./views/HomeView";
import BattleView from "./views/BattleView";
import SettingsView from './views/SettingsView';
import ResultsView from "./views/ResultsView";
import PlayerView from "./views/PlayerView";
import Nav from "./components/Nav";

export class Router {
  #currentView;

  static navItems = [
    { path: 'home', iconName: 'home' },
    { path: 'player', iconName: 'person' },
    { path: 'settings', iconName: 'settings' },
  ];

  static #views = {
    login: { title: 'Создание персонажа', render: LoginView },
    home: { title: 'Not Fight Game', render: HomeView },
    battle: { title: 'Бой', render: BattleView },
    results: { title: 'Результаты боя', render: ResultsView },
    player: { title: 'Игрок', render: PlayerView },
    settings: { title: 'Настройки', render: SettingsView },
  };

  static scrollToEnd(elem, smooth = false) {
    return elem.scrollBy({
      top: elem.scrollHeight,
      behavior: smooth ? 'smooth' : 'auto'
    });
  }

  setView(name) {
    this.#currentView = name;
    document.getElementById('app').innerHTML = `
      <h2 class="title">${Router.#views[name].title}</h2>
      ${Router.#views[name].render()}
    `;

    if (this.#currentView !== 'login') {
      const header = document.getElementById('header');
      header.innerHTML = Nav();

      const buttons = document.querySelectorAll('.nav button');
      buttons.forEach((elem, index) => {
        elem.onclick = () => this.setView(Router.navItems[index].path);
      });
    }

    switch (this.#currentView) {
      case 'login': {
        const form = document.getElementById('form');
        const name = document.getElementById('name');
        const submit = document.getElementById('submit');

        name.oninput = () => {
          submit.toggleAttribute('disabled', !name.value || name.validity.tooShort || name.validity.tooLong);
        }

        form.onsubmit = (event) => {
          event.preventDefault();
          player.name = form.elements.name.value;
          player.characterId = form.elements.character.value;
          storage.save(player);
          this.setView('home');
        }
        break;
      }

      case 'home': {
        const resume = document.getElementById('resume');
        if (resume) {
          resume.onclick = () => this.setView('battle');
        }

        document.getElementById('start').onclick = () => {
          battle.start();
          this.setView('battle');
        };
        break;
      }

      case 'battle': {
        const form = document.getElementById('form');
        const btn = document.getElementById('shoot');

        function handleBtnDisable() {
          const attackZoneSelected = document.querySelector('input[name="attackZoneId"]:checked');
          const defenseZonesSelected = document.querySelectorAll('input[name="defenseZoneId"]:checked').length === 2;
          return btn.toggleAttribute('disabled', !(attackZoneSelected && defenseZonesSelected));
        }

        handleBtnDisable();

        form.onchange = handleBtnDisable;

        form.onsubmit = (event) => {
          event.preventDefault();

          const formData = new FormData(form);
          battle.player.attackZoneId = +formData.get('attackZoneId');
          battle.player.defenseZonesIds = formData.getAll('defenseZoneId').map(Number);

          battle.handleTurn();
        };

        Router.scrollToEnd(document.getElementById('log'), true);
        break;
      }

      case 'results': {
        Router.scrollToEnd(document.getElementById('log'));

        const btn = document.getElementById('main');
        btn.onclick = () => this.setView('home');
        break;
      }

      case 'default': {
        throw new Error('Unknown view');
      }
    }

    console.debug('setView to', name);
  }

  get currentView() {
    return this.#currentView;
  }
}

export const router = new Router();
