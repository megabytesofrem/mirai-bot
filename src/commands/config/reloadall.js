import { Command } from 'discord-akairo';
import { MessageEmbed } from 'discord.js';

import { errorEmbed } from '../../util/embed';

export default class ReloadAllCommand extends Command {
  constructor() {
    super('reloadall', {
      aliases: ['reloadall', 'reload'],
      ownerOnly: true,
      description: {
        content: 'Reloads all commands/listeners for the bot',
        usage: 'setprefix'
      },
      category: 'config',
      channel: 'guild'
    });
  }

  async exec(message, args) {
    const embed = new MessageEmbed()
      .setTitle('Success')
      .setDescription(`:white_check_mark: Reloaded all commands`)
      .setColor('#ff3dd5');

    this.handler.reloadAll();

    return message.channel.send(embed);

  }
}
