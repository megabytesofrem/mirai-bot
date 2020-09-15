import { Command } from 'discord-akairo';
const figlet = require('figlet');

export default class FigletCommand extends Command {
  constructor() {
    super('figlet', {
      aliases: ['figlet', 'ascii'],
      description: {
        content: 'Generate cool ASCII text',
        usage: 'figlet <message> [--font <name>]'
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