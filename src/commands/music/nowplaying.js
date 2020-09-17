import { info } from 'console';
import { Command, Flag } from 'discord-akairo';
import { MessageEmbed } from 'discord.js';
import { getInfo } from 'ytdl-core';
import { errorEmbed } from '../../util/embed';

import { t, MESSAGES, COLOR_DEFAULT } from '../../constants';

// es6-ify this
const child = require('child_process');
const ytdl = require('ytdl-core');

export default class NowPlayingCommand extends Command {
  constructor() {
    super('np', {
      aliases: ['np', 'nowplaying'],
      description: {
        content: MESSAGES.HELP.NOWPLAYING_DESCRIPTION,
        usage: MESSAGES.HELP.NOWPLAYING_USAGE
      },
      category: 'music',
      channel: 'guild',
      args: [
      ],
    });
  }

  async exec(message, args) {
    if (song === undefined) {
        message.channel.send(MESSAGES.MUSIC_NOTHING_PLAYING);
    }
  
    // Play the song requested
    let songs = this.client.queue[message.guild.id].songs;
    let song = songs[songs.length];

    let embed = new MessageEmbed()
      .setTitle(MESSAGES.MUSIC_NOW_PLAYING_TITLE)
      .setFooter(t(MESSAGES.MUSIC_REQUESTED_BY, {
        'MEMBER': song.requestedBy
      }))
      .setColor(COLOR_DEFAULT);

    // Get the video information
    const info = await ytdl.getInfo(song.url);

    embed.addField('Title', info.videoDetails.title);
    embed.addField('URL', song.url)
    embed.addField('Video ID', info.videoDetails.videoId);
    
    message.channel.send(embed);
  }
}