import { MessageEmbed } from 'discord.js';

import { COLOR_ERROR } from '../constants';

export function errorEmbed(title, reason) {
  const embed = new MessageEmbed()
    .setTitle('B-bbaka?')
    .setDescription('Uh oh! Something went wrong in the bot, and this embed was created!')
    .setColor(COLOR_ERROR)
    .addField('Reason', reason);

  return embed;
}