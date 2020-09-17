import { Command } from 'discord-akairo';
import { errorEmbed } from '../../util/embed';

import { t, MESSAGES } from '../../constants';

export default class WarnCommand extends Command {
  constructor() {
    super('warn', {
      aliases: ['warn'],
      description: {
        content: MESSAGES.HELP.WARN_DESCRIPTION,
        usage: MESSAGES.HELP.WARN_USAGE
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
      const embed = errorEmbed('Error while warning', MESSAGES.NO_MEMBER_FOUND);
      return message.channel.send(embed);
    }

    // Warn the user
    let mention = args.member.user;
    
    message.channel.send(t(MESSAGES.MEMBER_WARNED, {
      'MEMBER': mention,
      'MODERATOR': message.author.username,
      'REASON': args.reason
    }));
  } 
}