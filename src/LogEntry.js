import { player } from "./player";
import { Battle, battle } from "./battle";

export default class LogEntry {
  constructor({ attacker, isSuccessful, isCrit, hitZoneId, damage }) {
    this.attacker = attacker;
    this.isSuccessful = isSuccessful;
    this.isCrit = isCrit;
    this.hitZoneId = hitZoneId;
    this.damage = damage;
  }

  toString() {
    const shootersNames = [player.name, Battle.enemies[battle.enemy.id].name];
    const msg = {
      attacker: this.attacker === 'player' ? shootersNames[0] : shootersNames[1],
      defender: this.attacker === 'player' ? shootersNames[1] : shootersNames[0],
      crit: this.isCrit ? 'КРИТИЧЕСКИ' : '',
    };

    if (this.isSuccessful) {
      return `${msg.attacker} ${msg.crit} атакует ${msg.defender} в ${Battle.hitZones[this.hitZoneId]} и наносит ${this.damage} ед. урона`;
    } else {
      return `${msg.attacker} атакует ${msg.defender} в ${Battle.hitZones[this.hitZoneId]}, но не наносит урон`;
    }
  }
}
