class Player {
  constructor() {
    this.stats = { wins: 0, loses: 0 };
  }

  loadFromStorage(obj) {
    return Object.assign(this, obj);
  }
}

export const player = new Player();
