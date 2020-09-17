import { Listener } from 'discord-akairo';

import { errorEmbed } from '../util/embed';

export default class BlockedCommandListener extends Listener {
  constructor() {
    super('commandBlocked', {
      event: 'commandBlocked',
      emitter: 'commandHandler',
      category: 'commandHandler'
    });
  }

  exec(message, command, reason) {
    let detailedReason = ''

    // TODO: add other reasons here
    switch (reason) {
      case 'owner': 
        detailedReason = 'you are not the owner of the server';
        break;
      default: 
        detailedReason = reason;
        break;
    }

    const embed = errorEmbed('', `You were blocked from using \`${command}\` because ${detailedReason}`);
    message.channel.send(embed);
  }
}