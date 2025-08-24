class Storage {
  get(key) {
    return JSON.parse(window.localStorage.getItem(key));
  }

  save(key, value) {
    return window.localStorage.setItem(key, JSON.stringify(value));
  }
}

export const storage = new Storage();
