import { Command } from 'discord-akairo';
import { MessageEmbed } from 'discord.js';

import { color } from '../../util/structs';

export default class WarnCommand extends Command {
  constructor() {
    super('warn', {
      aliases: ['warn'],
      description: {
        content: 'Warns a member',
        usage: 'warn <member> [reason]'
      },
      args: [
        {
          id: 'member',
          type: 'member'
        },
        {
          id: 'reason',
          type: 'string',
          default: 'No reason given'
        }
      ],
      category: 'moderation',
      clientPermissions: ['KICK_MEMBERS'],
      userPermissions: ['KICK_MEMBERS'],
      channel: 'guild',
    })
  }

  async exec(message, args) {
    if (!args.member) {
      const embed = new MessageEmbed()
        .setTitle('Error')
        .setDescription(':negative_squared_cross_mark: No member found with that name')
        .setColor(color.error);

      return message.channel.send(embed);
    }

    // Warn the user
    let mention = args.member.user;
    message.channel.send(`:white_check_mark: ${mention}, you were warned by ${message.author} for "${args.reason}".`);
  } 
}