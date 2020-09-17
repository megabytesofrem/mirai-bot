import { Command } from 'discord-akairo';
import { MessageEmbed } from 'discord.js';

import { errorEmbed } from '../../util/embed';

export default class SetPrefixCommand extends Command {
  constructor() {
    super('setprefix', {
      aliases: ['setprefix'],
      ownerOnly: true,
      description: {
        content: 'Set the prefix for Mirai',
        usage: 'setprefix'
      },
      category: 'config',
      channel: 'guild',
      args: [
        {
          id: 'prefix',
          type: 'string'
        }
      ]
    });
  }

  async exec(message, args) {
    if (!args.prefix) {
      const embed = errorEmbed('Error', ':negative_squared_cross_mark: Please specify a prefix to use');
      return message.channel.send(embed);
    }

    // Store the new prefix for the guild in the database
    await this.client.db.setPrefix(message.guild.id, args.prefix);
    this.handler.reloadAll();

    const embed = new MessageEmbed()
      .setTitle('Success')
      .setDescription(`:white_check_mark: I have changed my prefix to \`${args.prefix}\``)
      .setColor(colors.normal);

    return message.channel.send(embed);

  }
}
