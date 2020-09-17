import { info } from 'console';
import { Command, Flag } from 'discord-akairo';
import { MessageEmbed } from 'discord.js';
import { getInfo } from 'ytdl-core';
import { errorEmbed } from '../../util/embed';

import { t, MESSAGES, COLOR_DEFAULT } from '../../constants';

// es6-ify this
const child = require('child_process');
const ytdl = require('ytdl-core');

export default class PlayCommand extends Command {
  constructor() {
    super('play', {
      aliases: ['play'],
      description: {
        content: MESSAGES.HELP.PLAY_DESCRIPTION,
        usage: MESSAGES.HELP.PLAY_USAGE
      },
      category: 'music',
      channel: 'guild',
      args: [
      ],
    });
  }

  async exec(message, args) {
    const vc = message.member.voice.channel;

    if (!vc) {
      message.channel.send(errorEmbed('Error', MESSAGES.MUSIC_NO_VC));
      return;
    }
    
    // buggy
    await this.play(message, this.client.queue[message.guild.id].songs.shift());
  }

  async play(message, song) {
    // Get the item from the queue

    if (song === undefined) {
      message.channel.send(MESSAGES.MUSIC_QUEUE_EMPTY);
      this.client.queue[message.guild.id].playing = false;
      message.member.voice.channel.leave();
    }

    // Play the song requested
    let track = song;
    console.log(track);

    let embed = new MessageEmbed()
    .setTitle(MESSAGES.MUSIC_NOW_PLAYING)
    .setFooter(t(MESSAGES.MUSIC_REQUESTED_BY, {
      'MEMBER': song.requestedBy
    }))
    .setColor(COLOR_DEFAULT);

    // Get the video information
    const info = await ytdl.getInfo(track.url);

    embed.addField('Title', info.videoDetails.title);
    embed.addField('URL', track.url)
    embed.addField('Video ID', info.videoDetails.videoId);
    
    message.channel.send(embed);

    // Play the track
    let connection
    try {
      connection = await message.member.voice.channel.join();
    } catch (err) {
      console.error(err);
      return;
    }
    
    const ffmpeg = child.spawn("ffmpeg", ["-i", "-", "-ar", "44100", "-ac", "2", "-ab", "192k", "-f", "mp3", "-"])
    const stream = ytdl(track.url);

    stream.pipe(ffmpeg.stdin)
    const player = connection.play(ffmpeg.stdout);

    // Play the next song in the queue
    player.on('finish', async () => {
      await this.play(message, this.client.queue[message.guild.id].songs.shift());
    });
  }
}