import { storage } from "./storage";
import { player } from "./player";
import { battle } from "./battle";
import LoginView from "./views/LoginView";
import HomeView from "./views/HomeView";
import BattleView from "./views/BattleView";
import SettingsView from './views/SettingsView';

class Router {
  #currentView;
  #views = {
    login: { title: 'Создание персонажа', render: LoginView },
    home: { title: 'Home', render: HomeView },
    battle: { title: 'Бой', render: BattleView },
    settings: { title: 'Настройки', render: SettingsView },
  };

  setView(name) {
    this.#currentView = name;
    document.getElementById('app').innerHTML = `
      <h2 class="title">${this.#views[name].title}</h2>
      ${this.#views[name].render()}`;

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
