import { Command } from 'discord-akairo';
import { MessageEmbed } from 'discord.js';

import { colors } from '../util/structs';

export default class SetPrefixCommand extends Command {
  constructor() {
    super('setprefix', {
      aliases: ['setprefix'],
      description: {
        content: 'Set the prefix for Mirai',
        usage: 'setprefix'
      },
      args: [
        {
          id: 'prefix',
          type: 'string'
        }
      ],
      category: 'util',
      channel: 'guild',
    });
  }

  async exec(message, args) {
    if (!args.prefix) {
      const embed = new MessageEmbed()
        .setTitle('Error')
        .setDescription(':negative_squared_cross_mark: Please specify a prefix to use')
        .setColor(color.error);

      return message.channel.send(embed);
    }

    // Change the bot prefix
    // TODO: Make this persistent in a config file

    let oldPrefix = this.handler.prefix;
    this.handler.prefix = args.prefix;
    const embed = new MessageEmbed()
      .setTitle('Success')
      .setDescription(`:white_check_mark: I have changed my prefix from \`${oldPrefix}\` to \`${args.prefix}\``)
      .setColor(colors.normal);

    return message.channel.send(embed);

  }
}
