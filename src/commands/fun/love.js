import { Command } from 'discord-akairo';
import _ from 'lodash';

export default class LoveMeterCommand extends Command {
  constructor() {
    super('love', {
      aliases: ['love', 'lovemeter'],
      description: {
        content: 'Measures the love between yourself and another member',
        usage: 'love'
      },
      category: 'fun',
      args: [
        {
          id: 'other',
          type: 'member'
        }
      ]
    })
  }

  async exec(message, args) {
    let chance = _.random(0, 100);
    let prefix = chance > 20 ? ':heart:' : ':broken_heart:';

    return message.channel.send(`${prefix} You and ${args.other} have a ${chance}% compatibility!`);
  } 
}