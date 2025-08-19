class Storage {
  getPlayer() {
    return JSON.parse(window.localStorage.getItem('player'));
  }

  save(value) {
    return window.localStorage.setItem(value.constructor.name.toLowerCase(), JSON.stringify(value));
  }
}

export const storage = new Storage();
