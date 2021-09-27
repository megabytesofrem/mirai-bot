import { Listener } from 'discord-akairo';
import Filter from 'bad-words';

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

      if (message.author.bot) return;
      
      // Check if the filter is enabled for the guild 
      // TODO: fix
      const filterState = this.client.db.getFilterStateSync('cuss');

      if (filterState == 'true') {
        message.delete({ timeout: 1000 })
          .then(msg => message.reply('Please don\'t cuss, message deleted since it contained flagged words!'))
          .catch(console.error);
      }
    }
  }
}