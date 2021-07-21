export const COLOR_DEFAULT = '#ff3dd5';
export const COLOR_ERROR = '#ff3d3d';

export const MESSAGES = {
  TTS_NO_VC: 'You need to be in a voice channel before I can use tts!',
  MUSIC_NO_VC: 'You need to be in a voice channel before I can play music!',
  MUSIC_QUEUE_EMPTY: 'The queue is empty!',
  MUSIC_NOTHING_PLAYING: 'Nothing is currently playing!',
  MUSIC_STOPPED_PLAYBACK: 'Stopped playback',
  MUSIC_INVALID_URL: 'Invalid video link, only YouTube videos are supported',

  MUSIC_NOW_PLAYING_TITLE: 'Now Playing',
  MUSIC_QUEUE_ADDED_TITLE: 'Added to the Queue',
  MUSIC_QUEUE_TITLE: 'Current Music Queue',
  
  MUSIC_SKIPPED: 'Skipped track',

  MUSIC_QUEUE_ADDED_BY: 'Added by %MEMBER%',
  MUSIC_REQUESTED_BY: 'Requested by %MEMBER%',

  // Generic error messages
  NO_MEMBER_FOUND: ':negative_squared_cross_mark: No member found with that name',

  PING: 'Ping pong!',
  LOVEMETER: '%PREFIX% You and %MEMBER% have a %CHANCE%% compatibility!',

  // Warn, kick and ban messages
  MEMBER_WARNED: ':white_check_mark: %MEMBER% was warned by %MODERATOR% for %REASON%',
  MEMBER_KICKED: ':white_check_mark: %MEMBER% was kicked from the server for %REASON%',
  MEMBER_BANNED: ':white_check_mark: %MEMBER% was banned from the server for %REASON%',

  HELP: {
    PING_DESCRIPTION: 'Ping pong!',
    PING_USAGE: 'ping',

    HELP_DESCRIPTION: 'Display help for Mirai',

    // Fun
    EGGIRL_DESCRIPTION: 'Replies with a random post from r/egg_irl',
    EGGIRL_USAGE: 'eggirl',

    FIGLET_DESCRIPTION: 'Generate cool ASCII text',
    FIGLET_USAGE: 'figlet <message> [--font <name>]',

    GNU_DESCRIPTION: 'Replies with the GNU/Linux copypasta',
    GNU_USAGE: 'gnu',

    ILLEGAL_DESCRIPTION: 'Replies with the "Linux is Illegal" copypasta',
    ILLEGAL_USAGE: 'illegal',

    LOVE_DESCRIPTION: 'Measures the love between yourself and another member',
    LOVE_USAGE: 'love <member>',

    LYRICS_DESCRIPTION: 'Scrape AZLyrics for lyrics for a song',
    LYRICS_USAGE: 'lyrics <song>',

    TTS_DESCRIPTION: 'Mirai will speak',
    TTS_USAGE: 'tts <message>',

    YTCOMMENT_DESCRIPTION: 'Replies with the "YouTube Comment" copypasta',
    YTCOMMENT_USAGE: 'ytcomment',

    // Moderation
    KICK_DESCRIPTION: 'Kick a member from the server',
    KICK_USAGE: 'kick <member> [reason]',

    WARN_DESCRIPTION: 'Warns a member',
    WARN_USAGE: 'warn <member> [reason]',

    BAN_DESCRIPTION: 'Ban a member from the server',
    BAN_USAGE: 'ban <member> [reason]',

    // Music bot
    PLAY_DESCRIPTION: 'Plays a given song, adds it to the queue or resumes the queue',
    PLAY_USAGE: 'play [track]',
    
    SKIP_DESCRIPTION: 'Skips the current song in the queue',
    SKIP_USAGE: 'skip',
    
    QUEUE_DESCRIPTION: 'View the music queue',
    QUEUE_USAGE: 'queue',
    
    ADD_DESCRIPTION: 'Adds a song to the queue',
    ADD_USAGE: 'add <song>',
    
    GOTO_DESCRIPTION: 'Set the playhead at the given timestamp, provide no timestamp to restart playback',
    GOTO_USAGE: 'goto <timestamp>',

    STOP_DESCRIPTION: 'Stops the music playback',
    STOP_USAGE: 'stop',

    NOWPLAYING_DESCRIPTION: 'Displays the now playing song',
    NOWPLAYING_USAGE: 'np',
  }
};

export function t(message, args) {
  // Translate a template string, replacing each instance of %X% defined in the template
  // string with the key and value defined in the args,
  // e.g { "MEMBER", "abi#xxxx" } would replace %MEMBER% in the template string
  
  let formattedMessage = message;
  for (const key in args) {
    formattedMessage = formattedMessage.replace(`%${key}%`, args[key]);
  }

  return formattedMessage;
}