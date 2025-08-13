import './style.scss';
import { router } from './router';
import { getPlayerName } from './storage';

if (getPlayerName()) {
  router.setView('home');
} else {
  router.setView('login');
}
