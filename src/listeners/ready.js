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

    // // Set the Avatar
    // this.client.user.setAvatar('/home/char/downloads/original.jpg');

    // Set playing activity
    this.client.user.setActivity(`your instructions | ${this.client.commandHandler.prefix()}help`, { type: 'WATCHING' });
  }
}