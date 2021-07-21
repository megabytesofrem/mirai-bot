import { Command } from 'discord-akairo';
import { errorEmbed } from '../../util/embed';

import { MESSAGES } from '../../constants';

// es6-ify this
const child = require('child_process');
const gTTS = require('gtts');

export default class TTSCommand extends Command {
  constructor() {
    super('tts', {
      aliases: ['tts', 'speak'],
      description: {
        content: MESSAGES.HELP.TTS_DESCRIPTION,
        usage: MESSAGES.HELP.TTS_USAGE
      },
      category: 'fun',
      args: [
        {
          id: 'message',
          type: 'string',
          match: 'text'
        },
        {
          id: 'lang',
          match: 'option',
          flag: '--lang',
          default: 'en-us'
        }
      ],
      channel: 'guild',
    })
  }

  async exec(message, args) {
    const gtts = new gTTS(args.message, args.lang);
    const vc = message.member.voice.channel;
    
    if (!vc) {
      message.channel.send(errorEmbed('Error', MESSAGES.TTS_NO_VC))
      return;
    }
    
    const musicQueue = this.client.queue[message.guild.id];
    if (musicQueue && musicQueue.playing) {
        musicQueue.songs.shift();
        musicQueue.playing = false;
    }

    let connection
    try {
      connection = await vc.join();
    } catch (err) {
      console.error(err);
      return;
    }

    // We are connected to a vc, speak 

    // Convert the gTTS stream to an MP3 using ffmpeg and pipe it to the connection
    const ffmpeg = child.spawn("ffmpeg", ["-i", "-", "-ar", "44100", "-ac", "2", "-ab", "192k", "-f", "mp3", "-"])
    gtts.stream().pipe(ffmpeg.stdin)
    connection.play(ffmpeg.stdout)

    //return message.channel.send(formattedMsg);
  }
}