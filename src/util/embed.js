import { MessageEmbed } from 'discord.js';

export function errorEmbed(title, reason) {
  const embed = new MessageEmbed()
    .setTitle(title)
    .setDescription('Uh oh! Something went wrong in the bot, and this embed was created!')
    .addField('Reason', reason);

  return embed;
}