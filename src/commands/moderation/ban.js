import { Command } from 'discord-akairo';
import { errorEmbed } from '../../util/embed';

import _ from 'lodash';

export default class BanCommand extends Command {
  constructor() {
    super('ban', {
      aliases: ['ban', 'banish'],
      description: {
        content: 'Ban a member',
        usage: 'ban <member> [reason]'
      },
      category: 'moderation',
      clientPermissions: ['BAN_MEMBERS'],
      userPermissions: ['BAN_MEMBERS'],
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
      const embed = errorEmbed('Error while banning', ':negative_squared_cross_mark: No member found with that name');
      return message.channel.send(embed);
    }

    // Ban the user
    let mention = args.member.user;

    const responses = [
        `${mention} was banned from the server for "${args.reason}".`,
        `Banished ${mention} to the realm of darkness for "${args.reason}".`
    ];

    message.channel.send(`:white_check_mark: ${_.sample(responses)}`);
    args.member.ban(args.reason);
  } 
}