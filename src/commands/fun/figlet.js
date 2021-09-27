import { Command } from 'discord-akairo';
import figlet from 'figlet';

import { MESSAGES } from '../../constants';

export default class FigletCommand extends Command {
  constructor() {
    super('figlet', {
      aliases: ['figlet', 'ascii'],
      description: {
        content: MESSAGES.HELP.FIGLET_DESCRIPTION,
        usage: MESSAGES.HELP.FIGLET_USAGE
      },
      category: 'fun',
      args: [
        {
          id: 'message',
          type: 'string',
          match: 'text'
        },
        {
          id: 'font',
          match: 'option',
          flag: '--font',
          default: 'Standard'
        }
      ]
    })
  }

  async exec(message, args) {
    let ascii = figlet.textSync(args.message, {
      font: args.font
    });

    let formattedMsg = '```\n';
    formattedMsg += ascii;
    formattedMsg += '```';

    return message.channel.send(formattedMsg);
  }
}