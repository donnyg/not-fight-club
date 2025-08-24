import { battle } from "./battle";
import { storage } from "./storage";

export class Player {
  constructor() {
    this.stats = { wins: 0, loses: 0 };
  }

  setCharacter(id) {
    player.characterId = id;
    storage.save('player', player);

    Object.keys(battle).forEach((key) => delete battle[key]);
    storage.save('battle', battle);
  }
}

export const player = new Player();
