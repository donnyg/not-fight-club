import LogEntry from "./LogEntry";
import { player } from "./player";
import { router } from "./router";
import { storage } from "./storage";

export class Battle {
  static characters = [
    { name: 'CJ', hp: 100, skinId: 0 },
    { name: 'Sweet', hp: 200, skinId: 270 },
    { name: 'Cesar Vialpando', hp: 150, skinId: 292 },
  ];

  static enemies = [
    { name: 'Ballas Gang Member', hp: 100, skinId: 103 },
    { name: 'Ryder', hp: 150, skinId: 271 },
    { name: 'Officer Tenpenny', hp: 150, skinId: 265 },
    { name: 'Big Smoke', hp: 100, skinId: 269 },
    { name: 'Big Smoke Armored', hp: 200, skinId: 149 },
  ];

  static hitZones = ['Голова', 'Шея', 'Грудь', 'Живот', 'Ноги'];

  setRandomEnemy() {
    const index = Math.floor(Math.random() * Battle.enemies.length);
    this.enemy = {
      id: index,
      hp: Battle.enemies[index].hp,
    };
  }

  start() {
    this.log = [];
    delete this.winner;
    this.player = {
      hp: Battle.characters[player.characterId].hp
    };
    this.setRandomEnemy();
  }

  handleTurn() {
    // TODO: throw error if zones not selected

    for (let i = 0; i < 2; i++) {
      let attacker, isSuccessful = true;
      let damage = 30;
      let hitZoneId;
      let isCrit = false;

      const critChance = Math.random();
      if (critChance < 0.2) {
        isCrit = true;
        damage *= 1.5;
      }

      if (i === 0) {
        attacker = 'player';
        hitZoneId = this.player.attackZoneId;

        if (Math.random() < 0.2 && !isCrit) {
          isSuccessful = false;
        } else {
          this.enemy.hp -= damage;
        }
      } else {
        attacker = 'enemy';

        hitZoneId = Math.floor(Math.random() * Battle.hitZones.length);
        if (this.player.defenseZonesIds.includes(hitZoneId) && !isCrit) {
          isSuccessful = false;
        } else {
          this.player.hp -= damage;
        }
      }

      this.log.push(new LogEntry({ attacker, isSuccessful, isCrit, hitZoneId, damage }));
    }

    if (this.player.hp <= 0 || this.enemy.hp <= 0) {
      if (this.player.hp > this.enemy.hp) {
        player.stats.wins++;
        this.winner = 'player';
      } else {
        player.stats.loses++;
        this.winner = 'enemy';
      }
      storage.save(player);
      router.setView('results');
    } else {
      router.setView('battle');
    }

    storage.save(this);
  }
}

export const battle = new Battle();
