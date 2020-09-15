import { Listener } from 'discord-akairo';
const Filter = require('bad-words');

export default class CussListener extends Listener {
  constructor() {
    super('cuss', {
      emitter: 'client',
      event: 'message'
    });

    this.filter = new Filter();

    const words = ['tranny'];
    this.filter.addWords(...words);
  }

  async exec(message) {
    if (this.filter.isProfane(message.content)) {
      message.delete({ timeout: 1000 })
        .then(msg => message.reply('Please don\'t cuss, message deleted since it contained flagged words!'))
        .catch(console.error);
    }
  }
}