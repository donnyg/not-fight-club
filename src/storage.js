class Storage {
  get(key) {
    return JSON.parse(window.localStorage.getItem(key));
  }

  save(value) {
    return window.localStorage.setItem(value.constructor.name.toLowerCase(), JSON.stringify(value));
  }
}

export const storage = new Storage();
