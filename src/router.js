import { storage } from "./storage";
import { player } from "./player";
import { battle } from "./battle";
import LoginView from "./views/LoginView";
import HomeView from "./views/HomeView";
import BattleView from "./views/BattleView";
import SettingsView from './views/SettingsView';
import ResultsView from "./views/ResultsView";

export class Router {
  #currentView;

  static #views = {
    login: { title: 'Создание персонажа', render: LoginView },
    home: { title: 'Home', render: HomeView },
    battle: { title: 'Бой', render: BattleView },
    results: { title: 'Результаты боя', render: ResultsView },
    settings: { title: 'Настройки', render: SettingsView },
  };

  setView(name) {
    this.#currentView = name;
    document.getElementById('app').innerHTML = `
      <h2 class="title">${Router.#views[name].title}</h2>
      ${Router.#views[name].render()}
    `;

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
        document.getElementById('play').onclick = () => {
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
        break;
      }
      case 'results': {
        const btn = document.getElementById('main');
        btn.onclick = () => this.setView('home');
        break;
      }
    }

    console.debug('setView to', name);
  }

  get currentView() {
    return this.#currentView;
  }
}

export const router = new Router();
