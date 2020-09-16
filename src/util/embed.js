import { MessageEmbed } from 'discord.js';

export function errorEmbed(title, reason) {
  const embed = new MessageEmbed()
    .setTitle('B-bbaka?')
    .setDescription('Uh oh! Something went wrong in the bot, and this embed was created!')
    .setColor('#ff3d3d')
    .addField('Reason', reason);

  return embed;
}