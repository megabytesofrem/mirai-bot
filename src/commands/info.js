import { Command } from 'discord-akairo';
import { MessageEmbed } from 'discord.js';
import getRepoInfo from 'git-repo-info';
import os from 'os';

import { MESSAGES, COLOR_DEFAULT, t } from '../constants';

export default class InfoCommand extends Command {
    constructor() {
        super('info', {
            aliases: ['info'],
            description: {
                content: MESSAGES.HELP.INFO_DESCRIPTION,
                usage: MESSAGES.HELP.INFO_USAGE
            },
            category: 'util',
            channel: 'guild',
            args: [
            ],
        });
    }

    async exec(message) {
        const repoInfo = getRepoInfo()

        const embed = new MessageEmbed()
        .setTitle(MESSAGES.INFO)

        embed.addField(MESSAGES.INFO_RUNTIME, os.type())

        if (process.env.PUBLIC_VERSION) {
            embed.addField(MESSAGES.INFO_VERSION, process.env.PUBLIC_VERSION)
        }

        if (repoInfo.abbreviatedSha && repoInfo.branch) {
            embed.addField(MESSAGES.INFO_GIT, `${repoInfo.abbreviatedSha} (${repoInfo.branch})`)
        }

        embed.setFooter(t(MESSAGES.INFO_REQUESTED_BY, {
            'MEMBER': message.member.nickname || message.member.user.username
        }), message.member.user.avatarURL())
            .setColor(COLOR_DEFAULT);
        
        message.channel.send(embed)
    }
}
