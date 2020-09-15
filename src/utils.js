import { MessageEmbed } from 'discord.js';

export function embed(title, content) {
  const embed = new MessageEmbed()
    .setTitle(title)
    .setDescription(content);

  return embed;
}