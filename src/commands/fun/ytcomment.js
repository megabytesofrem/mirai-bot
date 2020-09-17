import { Command } from 'discord-akairo';
import dedent from 'dedent-js';

import { MESSAGES } from '../../constants';

export default class YouTubeCommentCommand extends Command {
  constructor() {
    super('ytcomment', {
      aliases: ['ytcomment', 'youtubecomment'],
      description: {
        content: MESSAGES.HELP.YTCOMMENT_DESCRIPTION,
        usage: MESSAGES.HELP.YTCOMMENT_USAGE
      },
      category: 'fun',
      args: [
      ]
    })
  }

  async exec(message, args) {
    const copypasta = dedent(
      `
      \`\`\`
      You may make fun of my age but i will make you regret that. The stereotype is true. I am am only 9 years old but can do things that American hackers could never do in seven lifetimes. 

      I will burst through your 9 layer firewall encryption layers like a knife through butter, such as the dragon spits fire at your home servers makes them burst in flames with my custom ARM linux distro specialized by the elite Chinese army. I will run a WHOIS on your ip and find you granddads location i will DDOS his slow wifi with the fury of a 10 million user botnet. 

      I will put his computer in flames as of those that thee ancient dragons spit out theyr mouths. I will then use my network of CCTV cameras to analyze your wallet and crack every single card there and i will transfer the data and money through my seven layer encryption nodes around the world and in the end end up in my custom chinese bank that has been encrypted over 9000 times with tha alpha centurion chinese ultimate atomic matter energy pulse of the seven Chinese province power generators. I well send a energy pulse through my network of over ten trillion nodes straight to your computer and fry every single socket in your neighboorhood.

      Your mother will cry and ask why did you have to be so ageist. The power generator in your area will burst into flames. And by the way I own your network. I know your family, your sister, brother and your parents. I will crack every single password in your internet browser history and will format your hardrive. My network of the dark army Chinese elite hacker army will take every family member computer and encrypt them with the power of ten trillion nodes around the world to make the most powerfull encryption key ever made in the history of human kind. People know Jobs for making the iPads, Bill Gates for Microsoft they will know me for pure carnage, after 200 years when the documents of this event will be unclassified. Think about that.
      \`\`\`
      `
    );

    return message.channel.send(copypasta);
  }
}