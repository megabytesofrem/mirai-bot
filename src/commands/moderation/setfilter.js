import { Command } from 'discord-akairo';
import { MessageEmbed } from 'discord.js';

import { colors } from '../../util/structs';

export default class SetFilterCommand extends Command {
  constructor() {
    super('setfilter', {
      aliases: ['setfilter'],
      description: {
        content: 'Set a filter for Mirai',
        usage: 'setfilter'
      },
      category: 'moderation',
      channel: 'guild',
      args: [
        {
          id: 'filter',
          type: 'string'
        },
        {
          id: 'state',
          type: 'string'
        }
      ]
    });
  }

  async exec(message, args) {
    if (!args.filter) {
      const embed = new MessageEmbed()
        .setTitle('Error')
        .setDescription(':negative_squared_cross_mark: Please specify a filter to enable/disable')
        .setColor(color.error);

      return message.channel.send(embed);
    }

    // Change the bot prefix
    // TODO: Make this persistent in a config file
    const { filter, state } = args;

    if (filter == 'cuss') {
      if (state == 'enable') {
        // Enable the cuss filter
        await this.client.db.setCussFilter(message.guild.id, true);

        const embed = new MessageEmbed()
          .setTitle('Success')
          .setDescription(`:white_check_mark: I have enabled the cuss filter`)
          .setColor(colors.normal);

        return message.channel.send(embed);
      } else if (state == 'disable') {
        // Disable the cuss filter
        await this.client.db.setCussFilter(message.guild.id, false);

        const embed = new MessageEmbed()
          .setTitle('Success')
          .setDescription(`:white_check_mark: I have disabled the cuss filter`)
          .setColor(colors.normal);

        return message.channel.send(embed);
      } 
    }
  }
}
