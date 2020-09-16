import { Command, Flag } from 'discord-akairo';
import { MessageEmbed } from 'discord.js';
import { getInfo } from 'ytdl-core';
import { errorEmbed } from '../../util/embed';

// es6-ify this
const child = require('child_process');
const ytdl = require('ytdl-core');

export default class MusicPlayCommand extends Command {
  constructor() {
    super('play', {
      aliases: ['play'],
      description: {
        content: 'Plays a song from a URL',
        usage: 'play url'
      },
      category: 'music',
      channel: 'guild',
      args: [
        {
          id: 'url',
          type: 'string'
        }
      ],
    });
  }

  async exec(message, args) {
    const vc = message.member.voice.channel;

    if (!vc) {
      message.channel.send(errorEmbed('Error', 'You need to be in a voice channel before I can play music!'))
      return;
    }

    let connection
    try {
      connection = await vc.join();
    } catch (err) {
      console.error(err);
      return;
    }

    // We are connected to a vc, speak
    let embed = new MessageEmbed()
      .setTitle('Now playing')
      .setFooter(`Requested by ${message.author.username}`)
      .setColor('#ff3dd5');

    // Convert the gTTS stream to an MP3 using ffmpeg and pipe it to the connection
    const ffmpeg = child.spawn("ffmpeg", ["-i", "-", "-ar", "44100", "-ac", "2", "-ab", "192k", "-f", "mp3", "-"])
    const stream = ytdl(args.url);

    // Get the video information
    const info = await ytdl.getInfo(args.url);

    embed.addField('Title', info.videoDetails.title);
    embed.addField('URL', args.url)
    embed.addField('Video ID', info.videoDetails.videoId);
    
    stream.pipe(ffmpeg.stdin)

    connection.play(ffmpeg.stdout)

    return message.channel.send(embed);
  }
}