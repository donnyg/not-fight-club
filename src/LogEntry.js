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
      crit: this.isCrit ? '<span class="log--crit">КРИТИЧЕСКИ</span>' : '',

      attackerStyle: this.attacker === 'player' ? 'log--player' : 'log--enemy',
      defenderStyle: this.attacker === 'player' ? 'log--enemy' : 'log--player',
    };

    if (this.isSuccessful) {
      return `<span class="${msg.attackerStyle}">${msg.attacker}</span> ${msg.crit} атакует <span class="${msg.defenderStyle}">${msg.defender}</span> в <span class="log">${Battle.hitZones[this.hitZoneId]}</span> и наносит <span class="log">${this.damage} ед. урона</span>`;
    } else {
      return `<span class="${msg.attackerStyle}">${msg.attacker}</span> атакует <span class="${msg.defenderStyle}">${msg.defender}</span> в <span class="log">${Battle.hitZones[this.hitZoneId]}</span>, но не наносит урона`;
    }
  }
}
