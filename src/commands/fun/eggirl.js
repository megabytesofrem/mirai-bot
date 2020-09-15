import { Command } from 'discord-akairo';
import axios from 'axios';

import _ from 'lodash';

export default class EggIrlCommand extends Command {
  constructor() {
    super('eggirl', {
      aliases: ['eggirl', 'egg_irl'],
      description: {
        content: 'Replies with a random post from r/egg_irl',
        usage: 'eggirl'
      },
      category: 'fun',
      args: [
      ]
    })
  }

  async exec(message, args) {
    // still cis tho?
    axios.get('https://www.reddit.com/r/egg_irl/hot.json?limit=200')
      .then(response => {
        let stuff = response.data['data']['children']
        
        for (const thing of stuff) {
          if (thing['kind'] == 't3') {
            // TODO: clean this up

            // check for the title containing a form of "egg irl"
            for (const c of ['egg', 'irl']) {
              if (thing['data']['title'].includes(c)) {
                return message.channel.send(_.sample(stuff)['data']['url']);
              }
            }
          }
        }
      })
      .catch(error => console.error(error));
  }
}