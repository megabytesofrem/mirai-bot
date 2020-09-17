import { Command } from 'discord-akairo';
import { errorEmbed } from '../../util/embed';

import { t, MESSAGES } from '../../constants';

import _ from 'lodash';

export default class BanCommand extends Command {
  constructor() {
    super('ban', {
      aliases: ['ban', 'banish'],
      description: {
        content: MESSAGES.HELP.BAN_DESCRIPTION,
        usage: MESSAGES.HELP.BAN_USAGE
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
          match: 'rest',
          default: 'No reason given'
        }
      ],
    })
  }

  async exec(message, args) {
    if (!args.member) {
      const embed = errorEmbed('Error while banning', MESSAGES.NO_MEMBER_FOUND);
      return message.channel.send(embed);
    }

    // Ban the user
    let mention = args.member.user;

    message.channel.send(t(MESSAGES.MEMBER_BANNED, {
      'MEMBER': args.member,
      'REASON': args.reason
    }));
    
    args.member.ban(args.reason);
  } 
}