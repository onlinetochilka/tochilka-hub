import PocketBase from 'pocketbase';

// Подключение к единому бэкенду экосистемы
const pb = new PocketBase('https://api.tochilka.app');

export default pb;
