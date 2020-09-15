import { Listener } from 'discord-akairo';

export default class ReadyListener extends Listener {
  constructor() {
    super('ready', {
      emitter: 'client',
      event: 'ready'
    });
  }

  async exec() {
    console.log('Started Mirai bot!');

    // Set playing activity
    this.client.user.setActivity('your instructions | m!help', { type: 'WATCHING' });
  }
}