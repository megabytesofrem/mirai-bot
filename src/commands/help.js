import { Command } from 'discord-akairo';
import { MessageEmbed } from 'discord.js';

import { MESSAGES, COLOR_DEFAULT } from '../constants';
import dedent from 'dedent-js';

export default class HelpCommand extends Command {
  constructor() {
    super('help', {
      aliases: ['help'],
      description: {
        content: MESSAGES.HELP.HELP_DESCRIPTION
      },
      category: 'util',
      args: [
        {
          id: 'command',
          type: 'commandAlias'
        }
      ]
    })
  }

  async exec(message, args) {
    // thanks to https://github.com/Naval-Base/yuudachi/blob/master/src/bot/commands/util/help.ts

    const { command } = args;
  
    if (command) {
      const embed = new MessageEmbed()
        .setTitle(`${command.aliases[0]}`)
        .addField('❯ Description', command.description.content || '\u200b')
        //.setColor(colors.normal);

      // List any optional aliases
      if (command.aliases.length > 1)
        embed.addField('❯ Aliases', command.aliases.map(alias => `\`${alias}\``).join(','));

      // ... and display the usage, if there is one
      if (command.description.usage?.length)
        embed.addField('❯ Usage', `\`${this.handler.prefix(message)}${command.description.usage}\``);

      return message.channel.send(embed);
    }

    // If there is no command, build a list of commands
    const embed = new MessageEmbed()
      .setTitle('Commands for Mirai')
      .setDescription(dedent(`
      Here are a list of commands registered.\nYou can type \`${this.handler.prefix(message)}help <command>\` for more information on one command.
      The current prefix is \`${this.handler.prefix(message)}\`.
      `))
      .setColor(COLOR_DEFAULT);

    for (const category of this.handler.categories.array()) {
      embed.addField(
        `❯ ${category.id.replace(/(\b\w)/gi, (lc) => lc.toUpperCase())}`,
        category.map(cmd => `\`${cmd.aliases[0]}\``).join(',')
      );
    }

    return message.channel.send(embed);
  }
}