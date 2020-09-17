import { Command } from 'discord-akairo';
import { errorEmbed } from '../../util/embed';

import { t, MESSAGES } from '../../constants';

import _ from 'lodash';

export default class KickCommand extends Command {
  constructor() {
    super('kick', {
      aliases: ['kick', 'yeet'],
      description: {
        content: MESSAGES.HELP.KICK_DESCRIPTION,
        usage: MESSAGES.HELP.KICK_USAGE
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
          match: 'rest',
          default: 'No reason given'
        }
      ],
    })
  }

  async exec(message, args) {
    if (!args.member) {
      const embed = errorEmbed('Error while kicking', MESSAGES.NO_MEMBER_FOUND);
      return message.channel.send(embed);
    }

    // Kick the user
    let mention = args.member.user;

    console.log(args.reason);

    message.channel.send(t(MESSAGES.MEMBER_KICKED, {
      'MEMBER': args.member,
      'REASON': args.reason
    }));

    args.member.kick(args.reason);
  } 
}