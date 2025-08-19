import './style.scss';
import { router } from './router';
import { storage } from './storage';
import { player } from './player';

const storagePlayer = storage.getPlayer();

if (storagePlayer) {
  player.loadFromStorage(storagePlayer);
  router.setView('home');
} else {
  router.setView('login');
}
