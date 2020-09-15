import { Command } from 'discord-akairo';
import { errorEmbed } from '../../util/embed';

import { color } from '../../util/structs';

export default class WarnCommand extends Command {
  constructor() {
    super('warn', {
      aliases: ['warn'],
      description: {
        content: 'Warns a member',
        usage: 'warn <member> [reason]'
      },
      category: 'moderation',
      clientPermissions: ['KICK_MEMBERS'],
      userPermissions: ['KICK_MEMBERS'],
      channel: 'guild',
      args: [
        {
          id: 'member',
          type: 'member'
        },
        {
          id: 'reason',
          type: 'string',
          match: 'text',
          default: 'No reason given'
        }
      ],
    })
  }

  async exec(message, args) {
    if (!args.member) {
      const embed = errorEmbed('Error while warning', ':negative_squared_cross_mark: No member found with that name');
      return message.channel.send(embed);
    }

    // Warn the user
    let mention = args.member.user;
    message.channel.send(`:white_check_mark: ${mention}, you were warned by ${message.author} for "${args.reason}".`);
  } 
}