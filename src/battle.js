class Battle {
  #currentEnemy;
  #characters = [
    { name: 'CJ', hp: 100, skinId: 0 },
    { name: 'Cesar Vialpando', hp: 150, skinId: 292 },
    { name: 'Sweet', hp: 200, skinId: 270 },
  ]
  #enemies = [
    { name: 'Ballas Gang Member', hp: 100, skinId: 103 },
    { name: 'Ryder', hp: 150, skinId: 271 },
    { name: 'Officer Tenpenny', hp: 150, skinId: 265 },
    { name: 'Big Smoke', hp: 100, skinId: 269 },
    { name: 'Big Smoke Armored', hp: 300, skinId: 149 },
  ];

  start() {
    this.#setRandomEnemy();

    console.debug('Start battle. Your enemy is', this.enemy)
  }

  #setRandomEnemy() {
    const index = Math.floor(Math.random() * this.#enemies.length);
    this.#currentEnemy = this.#enemies[index];
  }

  get enemy() {
    return this.#currentEnemy;
  }
}

export const battle = new Battle();
