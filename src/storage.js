export function getPlayerName() {
  return window.localStorage.getItem('name');
}

export function savePlayerName(value) {
  return window.localStorage.setItem('name', value);
}
