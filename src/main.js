import './style.scss';
import { router } from './router';
import { storage } from './storage';
import { player } from './player';
import { battle } from './battle';
import LogEntry from './LogEntry';

const storagePlayer = storage.get('player');
const storageBattle = storage.get('battle');

if (storageBattle) {
  for (const key in storageBattle) {
    if (key !== 'log') {
      battle[key] = storageBattle[key];
    } else {
      battle[key] = storageBattle[key].map(entry => new LogEntry(entry));
    }
  }
}

if (storagePlayer) {
  Object.assign(player, storagePlayer);
  router.setView('home');
} else {
  router.setView('login');
}
