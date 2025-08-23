import { battle } from "./battle";
import { storage } from "./storage";

class Player {
  constructor() {
    this.stats = { wins: 0, loses: 0 };
  }

  setCharacter(id) {
    player.characterId = id;
    storage.save(player);

    Object.keys(battle).forEach((key) => delete battle[key]);
    storage.save(battle);
  }
}

export const player = new Player();
