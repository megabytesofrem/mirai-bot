import { MessageEmbed } from 'discord.js';

import { secondsToTimestamp, humanReadableDate, numberWithCommas } from './units';
import { t, MESSAGES, COLOR_DEFAULT, COLOR_ERROR } from '../constants';

export function errorEmbed(title, reason) {
    return new MessageEmbed()
        .setTitle('B-bbaka?')
        .setDescription('Uh oh! Something went wrong in the bot, and this embed was created!')
        .setColor(COLOR_ERROR)
        .addField('Reason', reason);
}

export function songEmbed(title, song, position) {
    const embed = new MessageEmbed()
        .setTitle(title)

    if (song.type == "youtube") {
        // YouTube
        embed.addField('Title', song.title)
            .addField('Uploaded By', song.artist)
            .addField('Length', secondsToTimestamp(song.lengthSeconds))
            .addField('Upload Date', humanReadableDate(song.youtubeMetadata.uploadDate))
            .addField('Views', numberWithCommas(song.youtubeMetadata.viewCount))
            .addField('URL', song.url)
            .setImage(song.youtubeMetadata.thumbnail)
    } else if (song.type == "soundcloud") {
        // SoundCloud
        embed.addField("Title", song.title)
            .addField("Artist", song.artist)
            .addField("Length", secondsToTimestamp(song.lengthSeconds))
            .addField("Upload Date", humanReadableDate(song.soundcloudMetadata.uploadDate))
            .addField('URL', song.url)
            .setImage(song.soundcloudMetadata.artwork)
    } else {
        // Generic
        embed.addField("Title", song.title)
            .addField("Artist", song.artist)
            .addField("Length", secondsToTimestamp(song.lengthSeconds))
            .addField("URL", song.url)
    }

    embed.setFooter(t(MESSAGES.MUSIC_QUEUE_ADDED_BY, {
        'MEMBER': song.queue.requestedBy
    }), song.queue.requestedByAvatar)
        .setColor(COLOR_DEFAULT);

    if (position != undefined) {
        embed.addField('Position', position)
    }
    return embed
}

export function musicQueueEmbed(message, songs) {
    var embed = new MessageEmbed()
        .setTitle(MESSAGES.MUSIC_QUEUE_TITLE)
        .setFooter(`Requested by ${message.member.nickname || message.member.user.username}`, message.member.user.avatarURL())
        .setColor(COLOR_DEFAULT);
    for (var songIndex in songs) {
        // Skip currently playing
        if (songIndex == 0) {
            continue
        }
        const song = songs[songIndex]
        embed.addField(`#${songIndex} - ${song.title}`, song.queue.requestedBy)
    }
    return embed
}