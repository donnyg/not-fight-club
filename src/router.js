import { battle } from "./battle";
import { getPlayerName, savePlayerName } from "./storage";

class Router {
  #currentView;
  #views = {
    login: {
      title: 'Создание персонажа',
      content: () => `
        <input type="text" name="name" id="name" minlength="1" maxlength="64" placeholder="Введите имя" autofocus required>
        <button type="submit" id="submit" disabled>Создать</button>`
    },
    home: {
      title: 'Home',
      content: () => '<button type="button" id="play">Начать бой</button>'
    },
    battle: {
      title: 'Бой',
      content: () => `
        <p>${getPlayerName()} vs. ${battle.enemy.name} (HP: ${battle.enemy.hp})</p>
        <button type="button" id="fight">УДАР!</button>`
    },
    settings: {
      title: 'Настройки',
      content: () => 'settings view'
    },
  };

  setView(name) {
    this.#currentView = name;
    document.getElementById('app').innerHTML = `
      <h2 class="title">${this.#views[name].title}</h2>
      ${this.#views[name].content()}`;

    switch (this.#currentView) {
      case 'login': {
        const name = document.getElementById('name');
        const submit = document.getElementById('submit');

        name.oninput = () => {
          submit.toggleAttribute('disabled', !name.value || name.validity.tooShort || name.validity.tooLong);
        }

        submit.onclick = () => {
          savePlayerName(name.value);
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
        // document.getElementById('shoot').onclick = shoot;
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
