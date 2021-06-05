import { info } from 'console';
import { Command, Flag } from 'discord-akairo';
import { getInfo } from 'ytdl-core-discord';
import { errorEmbed, songEmbed } from '../../util/embed';
import { playFromQueue } from '../../util/musicqueue';

import { t, MESSAGES, COLOR_DEFAULT } from '../../constants';

// es6-ify this
const child = require('child_process');
const ytdl = require('ytdl-core');

export default class PlayCommand extends Command {
  constructor() {
    super('play', {
      aliases: ['play', 'add'],
      description: {
        content: MESSAGES.HELP.PLAY_DESCRIPTION,
        usage: MESSAGES.HELP.PLAY_USAGE
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
    
    if (args.song) {
        // Connect to the voice channel
        let songInfo
        try {
            songInfo = await(ytdl.getInfo(args.song));
        } catch (err) {
            message.channel.send(errorEmbed('Error', MESSAGES.MUSIC_INVALID_URL));
            return;
        }
        const thumbnails = songInfo.videoDetails.thumbnails
        const thumbnailCount = songInfo.videoDetails.thumbnails.length
        const song = {
          title: songInfo.videoDetails.title,
          videoId: songInfo.videoDetails.videoId,
          lengthSeconds: songInfo.videoDetails.lengthSeconds,
          uploadDate: new Date(songInfo.videoDetails.uploadDate),
          channelName: songInfo.videoDetails.ownerChannelName,
          viewCount: songInfo.videoDetails.viewCount,
          requestedBy: `${message.member.nickname || message.member.user.username}`,
          requestedByAvatar: message.member.user.avatarURL(),
          thumbnail: thumbnailCount > 0 ? thumbnails[thumbnailCount - 1].url : null,
          url: args.song
        };
        
        // Add the song to the queue
        if (!this.client.queue.hasOwnProperty(message.guild.id)) {
          this.client.queue[message.guild.id] = {};
          this.client.queue[message.guild.id].playing = false
          this.client.queue[message.guild.id].songs = [];
        }
        const queue = this.client.queue[message.guild.id]
        if (!queue.playing) {
            queue.songs = [song]
            await playFromQueue(queue, message);
        } else {
            queue.songs.push(song)
            const embed = songEmbed(MESSAGES.MUSIC_QUEUE_ADDED_TITLE, song);
            message.channel.send(embed);
        }
    } else {
        const queue = this.client.queue[message.guild.id]
        if (!queue) {
            message.channel.send(errorEmbed('Error', MESSAGES.MUSIC_QUEUE_EMPTY));
            return;
        }
        if (queue.songs.length <= 0) {
            message.channel.send(errorEmbed('Error', MESSAGES.MUSIC_QUEUE_EMPTY));
            return;
        }
        await playFromQueue(queue, message);
    }
  }
}