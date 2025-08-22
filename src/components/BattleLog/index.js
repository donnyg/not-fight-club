import styles from './BattleLog.module.scss';
import { battle } from './../../battle';

export default () => `
  <div class="${styles.log}" id="log">
    ${battle.log.join('<br>')}
  </div>
`;
