import { Command } from 'discord-akairo';
import { errorEmbed } from '../../util/embed';

// es6-ify this
const child = require('child_process');
const gTTS = require('gtts');

export default class TTSCommand extends Command {
  constructor() {
    super('tts', {
      aliases: ['tts', 'speak'],
      description: {
        content: 'I can speak too using gTTS',
        usage: 'tts message'
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
      message.channel.send(errorEmbed('Error', 'You need to be in a voice channel before I can use tts!'))
      return;
    }

    // Replace some phrases
    if (args.message.includes('uwu')) {
      args.message = args.message.replace('uwu', 'you woo')
    }
    else if (args.message.includes('owo')) {
      args.message = args.message.replace('owo', 'oh woah')
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