import { Command } from 'discord-akairo';
import { MessageEmbed } from 'discord.js';

import { color } from '../../util/structs';
import _ from 'lodash';

export default class BanCommand extends Command {
  constructor() {
    super('ban', {
      aliases: ['ban', 'banish'],
      description: {
        content: 'Ban a member',
        usage: 'ban <member> [reason]'
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
      clientPermissions: ['BAN_MEMBERS'],
      userPermissions: ['BAN_MEMBERS'],
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