import { info } from 'console';
import { Command, Flag } from 'discord-akairo';
import { MessageEmbed } from 'discord.js';
import { getInfo } from 'ytdl-core';
import { errorEmbed } from '../../util/embed';

// es6-ify this
const child = require('child_process');
const ytdl = require('ytdl-core');

export default class NowPlayingCommand extends Command {
  constructor() {
    super('np', {
      aliases: ['np', 'nowplaying'],
      description: {
        content: 'Displays the currently playing song in the queue',
        usage: 'np'
      },
      category: 'music',
      channel: 'guild',
      args: [
      ],
    });
  }

  async exec(message, args) {
    if (song === undefined) {
        message.channel.send('Nothing is currently playing!');
    }
  
    // Play the song requested
    let songs = this.client.queue[message.guild.id].songs;
    let song = songs[songs.length];

    let embed = new MessageEmbed()
      .setTitle('Now playing')
      .setFooter(`Requested by ${song.requestedBy}`)
      .setColor('#ff3dd5');

    // Get the video information
    const info = await ytdl.getInfo(song.url);

    embed.addField('Title', info.videoDetails.title);
    embed.addField('URL', song.url)
    embed.addField('Video ID', info.videoDetails.videoId);
    
    message.channel.send(embed);
  }
}