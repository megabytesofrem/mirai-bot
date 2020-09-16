import { Listener } from 'discord-akairo';

import { errorEmbed } from '../util/embed';

export default class MissingPermissionListener extends Listener {
  constructor() {
    super('missingPermissions', {
      event: 'missingPermissions',
      emitter: 'commandHandler',
      category: 'commandHandler'
    });
  }

  exec(message, command, type, missing) {
    const embed = errorEmbed('', `You are missing permissions (\`${missing}\`) for \`${command}\``);
    message.channel.send(embed);
  }
}