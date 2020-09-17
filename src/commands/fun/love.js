import { Command } from 'discord-akairo';
import _ from 'lodash';

import { t, MESSAGES } from '../../constants';

export default class LoveMeterCommand extends Command {
  constructor() {
    super('love', {
      aliases: ['love', 'lovemeter'],
      description: {
        content: MESSAGES.HELP.LOVE_DESCRIPTION,
        usage: MESSAGES.HELP.LOVE_USAGE,
      },
      category: 'fun',
      args: [
        {
          id: 'member',
          type: 'member'
        }
      ]
    })
  }

  async exec(message, args) {
    let chance = _.random(0, 100);
    let prefix = chance > 20 ? ':heart:' : ':broken_heart:';

    // Replace %PREFIX%, %MEMBER% and %CHANCE%
    let string = t(MESSAGES.LOVEMETER, {
      'PREFIX': prefix,
      'MEMBER': args.member,
      'CHANCE': chance
    });

    return message.channel.send(string);
  } 
}