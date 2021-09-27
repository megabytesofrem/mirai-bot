import { info } from 'console';
import { Command, Flag } from 'discord-akairo';
import { getInfo } from 'ytdl-core-discord';
import soundcloud from "soundcloud-downloader";
import { errorEmbed, songEmbed } from './embed';
import { secondsToTimestamp, timestampToSeconds } from './units';
import child from "child_process";
import ytdl from "ytdl-core-discord";

import { t, MESSAGES, COLOR_DEFAULT } from '../constants';

/*
 * Play the item from top most item in the queue, will play the next song, notify the message's channel and remove the played song from the queue when the song has finished
 * @param {object} queue - Queue object for the guild
 * @param {object} message - Message that sent that play request
 * @param {number} [position] - Position in seconds where to start playback from
 */
export async function playFromQueue(queue, message, position) {
    if (!queue) {
        queue.playing = false;
        message.member.voice.channel.leave();
        return;
    }
    
    // Get the item from the queue
    const song = queue.songs[0]
    if (!song) {
      queue.playing = false;
      message.member.voice.channel.leave();
      return;
    }

    var positionSeconds = undefined
    if (position) {
        positionSeconds = timestampToSeconds(position)
    }
    var positionString = undefined
    if (positionSeconds) {
        positionString = secondsToTimestamp(positionSeconds)
    }

    const embed = songEmbed(MESSAGES.MUSIC_NOW_PLAYING_TITLE, song, positionString)
    message.channel.send(embed);

    // Play the track
    let connection
    try {
      connection = await message.member.voice.channel.join();
    } catch (err) {
      console.error(err);
      return;
    }

    function configurePlayer(player) {
        player.on('error', async error => {
            console.log(error)
        })
    
        // Play the next song in the queue
        player.on('finish', async () => {
            if (queue.songs[0] == song) {
                queue.songs.shift();
                await playFromQueue(queue, message);
            }
        });
    }
    if (song.type == "youtube") {
        const stream = await ytdl(song.url);

        configurePlayer(connection.play(stream, { type: 'opus' }))
        queue.playing = true;
    } else if (song.type == "soundcloud") {
        const soundcloudStream = await soundcloud.download(song.url, process.env.SOUNDCLOUD_CLIENT_ID)
        configurePlayer(connection.play(soundcloudStream))
        queue.playing = true
    }
}