import { Command } from 'discord-akairo';
import scraper from 'azlyrics-scraper';

function splitParagraphs(str, n) {
  // 1. Split by \n
  let split = str.split('\n');
  let i = 0;

  let currentParagraph = '';
  let paragraphs = [];

  for (i; i < split.length; i++) {
    if (i % n == 0) {
      // Need to make a new paragraph
      paragraphs.push(currentParagraph);
      currentParagraph = '';
    }
    else if (i == 0 || i == 1) {
      currentParagraph += split[i] + '\n';
    }
    else {
      // Append the current paragraph
      currentParagraph += split[i] + '\n';
    }
  }

  return paragraphs;
}

export default class LyricsCommand extends Command {
  constructor() {
    super('lyrics', {
      aliases: ['lyrics', 'azlyrics'],
      description: {
        content: 'Scrape AZLyrics for lyrics for a song',
        usage: 'lyrics <song title>'
      },
      category: 'fun',
      args: [
        {
          id: 'title',
          type: 'string'
        }
      ]
    })
  }

  async exec(message, args) {
    scraper.getLyric(args.title)
      .then(result => {
        // Split the lyrics into paragraphs with 10 lines each
        let paragraphs = splitParagraphs(result.join('\n'), 10);

        for (const paragraph of paragraphs) {
          if (paragraph != '') {
            message.channel.send(`\`\`\`\n${paragraph}\`\`\``);
          }
        }
      })
      .catch(error => console.error(error));
  }
}