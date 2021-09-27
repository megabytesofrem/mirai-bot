import { info } from 'console';
import { Command, Flag } from 'discord-akairo';
import ytdl from "ytdl-core";
import child from "child_process";
import soundcloud from "soundcloud-downloader";
import { errorEmbed, songEmbed } from '../../util/embed';
import { playFromQueue } from '../../util/musicqueue';

import { t, MESSAGES, COLOR_DEFAULT } from '../../constants';

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
      const songUrl = args.song

      let song
      if (/^(https?:\/\/)?(www[0-9]?.)?soundcloud.com/gi.test(songUrl)) {
        if (!process.env.SOUNDCLOUD_CLIENT_ID || process.env.SOUNDCLOUD_CLIENT_ID.length <= 0) {
          message.channel.send(errorEmbed('Error', MESSAGES.MUSIC_MISCONFIGURED_SOUNDCLOUD));
          return
        }

        // soundcloud
        let soundcloudInfo
        try {
          soundcloudInfo = await soundcloud.getInfo(songUrl, process.env.SOUNDCLOUD_CLIENT_ID)
        } catch (err) {
          message.channel.send(errorEmbed('Error', MESSAGES.MUSIC_INVALID_URL));
          return
        }
        
        song = {
          type: "soundcloud",
          url: songUrl,
          title: soundcloudInfo.title,
          artist: soundcloudInfo.user.username,
          lengthSeconds: Math.floor(soundcloudInfo.duration / 1000),
          soundcloudMetadata: {
            id: soundcloudInfo.id,
            uploadDate: new Date(soundcloudInfo.created_at),
            artwork: soundcloudInfo.artwork_url,
            artistAvatar: soundcloudInfo.user.avatar_url
          }
        }
      } else {
        // assume youtube
        let ytInfo
        try {
          ytInfo = await ytdl.getInfo(songUrl)
        } catch (err) {
          message.channel.send(errorEmbed('Error', MESSAGES.MUSIC_INVALID_URL));
          return;
        }

        const thumbnails = ytInfo.videoDetails.thumbnails
        const thumbnailCount = ytInfo.videoDetails.thumbnails.length
        song = {
          type: "youtube",
          url: songUrl,
          title: ytInfo.videoDetails.title,
          artist: ytInfo.videoDetails.ownerChannelName,
          lengthSeconds: ytInfo.videoDetails.lengthSeconds,
          youtubeMetadata: {
            id: ytInfo.videoDetails.videoId,
            uploadDate: new Date(ytInfo.videoDetails.uploadDate),
            viewCount: ytInfo.videoDetails.viewCount,
            thumbnail: thumbnailCount > 0 ? thumbnails[thumbnailCount - 1].url : null
          }
        }
      }

      song.queue = {
        requestedBy: `${message.member.nickname || message.member.user.username}`,
        requestedByAvatar: message.member.user.avatarURL()
      }

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