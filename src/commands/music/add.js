import { info } from 'console';
import { Command, Flag } from 'discord-akairo';
import { MessageEmbed } from 'discord.js';
import { getInfo } from 'ytdl-core';
import { errorEmbed } from '../../util/embed';

import { t, MESSAGES, COLOR_DEFAULT } from '../../constants';

// es6-ify this
const child = require('child_process');
const ytdl = require('ytdl-core');

export default class AddToQueueCommand extends Command {
  constructor() {
    super('add', {
      aliases: ['add'],
      description: {
        content: MESSAGES.HELP.ADD_DESCRIPTION,
        usage: MESSAGES.HELP.ADD_USAGE
      },
      category: 'music',
      channel: 'guild',
      args: [
        {
          id: 'song',
          type: 'string'
        }
      ],
    });
  }

  async exec(message, args) {
    const vc = message.member.voice.channel;

    if (!vc) {
      message.channel.send(errorEmbed('Error', MESSAGES.MUSIC_NO_VC));
      return;
    }

    // Connect to the voice channel
    const songInfo = await(ytdl.getInfo(args.song));
    const song = {
      title: songInfo.videoDetails.title,
      videoId: songInfo.videoDetails.videoId,
      requestedBy: message.member.username,
      url: args.song
    };

    let embed = new MessageEmbed()
      .setTitle('Added to the queue')
      .addField('Title', song.title)
      .addField('Video ID', song.videoId)
      .addField('URL', song.url)
      .setFooter(t(MESSAGES.MUSIC_QUEUE_ADDED_BY, {
        'MEMBER': song.requestedBy
      }))
      .setColor(COLOR_DEFAULT);

    message.channel.send(embed);

    // Add the song to the queue
    if (!this.client.queue.hasOwnProperty(message.guild.id)) {
      this.client.queue[message.guild.id] = {};
      this.client.queue[message.guild.id].playing = false
      this.client.queue[message.guild.id].songs = [];
    }

    this.client.queue[message.guild.id].songs.push(song)
    this.client.queue[message.guild.id].playing = false;

    console.log(this.client.queue[message.guild.id].songs);
    console.log(this.client.queue[message.guild.id].length);
  }
}