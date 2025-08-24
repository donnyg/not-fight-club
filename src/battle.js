import LogEntry from "./LogEntry";
import { player } from "./player";
import { router } from "./router";
import { storage } from "./storage";

export class Battle {
  static characters = [
    { name: 'CJ', hp: 100, critChance: 0.1, skinId: 0 },
    { name: 'Sweet', hp: 200, critChance: 0.3, skinId: 270 },
    { name: 'Cesar Vialpando', hp: 150, critChance: 0.2, skinId: 292 },
  ];

  static enemies = [
    { name: 'Ballas Gang Member', hp: 100, critChance: 0.1, skinId: 103 },
    { name: 'Ryder', hp: 150, critChance: 0.2, skinId: 271 },
    { name: 'Officer Tenpenny', hp: 150, critChance: 0.35, skinId: 265 },
    { name: 'Big Smoke', hp: 100, critChance: 0.15, skinId: 269 },
    { name: 'Big Smoke Armored', hp: 200, critChance: 0.35, skinId: 149 },
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
    for (let i = 0; i < 2; i++) {
      if (this.player.hp <= 0 || this.enemy.hp <= 0) {
        break;
      }

      const PLAYER_MISS_CHANCE = 0.2;

      let attacker;
      let isSuccessful = true;
      let isCrit = false;
      let damage = 30;
      let hitZoneId;

      const critChance = i === 0 ? Battle.characters[player.characterId].critChance : Battle.enemies[battle.enemy.id].critChance;
      if (Math.random() < critChance) {
        isCrit = true;
        damage *= 1.5;
      }

      if (i === 0) {
        attacker = 'player';
        hitZoneId = this.player.attackZoneId;

        if (Math.random() < PLAYER_MISS_CHANCE && !isCrit) {
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
      storage.save('player', player);
      router.setView('results');
    } else {
      router.reloadView();
    }

    storage.save('battle', this);
  }
}

export const battle = new Battle();
