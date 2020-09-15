import { Command } from 'discord-akairo';
import { errorEmbed } from '../../util/embed';

import _ from 'lodash';

export default class KickCommand extends Command {
  constructor() {
    super('kick', {
      aliases: ['kick', 'yeet'],
      description: {
        content: 'Kicks a member',
        usage: 'kick <member> [reason]'
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
      const embed = errorEmbed('Error while kicking', ':negative_squared_cross_mark: No member found with that name');
      return message.channel.send(embed);
    }

    // Kick the user
    let mention = args.member.user;

    const responses = [
        `${mention} was kicked from the server for "${args.reason}".`,
        `${mention} was yeeted from the server for "${args.reason}".`
    ];

    message.channel.send(`:white_check_mark: ${_.sample(responses)}`);
    args.member.kick(args.reason);
  } 
}