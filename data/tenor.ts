type GIF =
  | 'dmg_high'
  | 'dmg_mid'
  | 'dmg_sustained'
  | 'quest_invite'
  | 'quest_start'
  | 'quest_finish'

interface Tenor {
  TENOR_URL: string
  GIFS: { [key in GIF]: string[] } & { error: string }
  gif(key: GIF): string
}

const tenor: Tenor = {
  TENOR_URL: 'https://tenor.com/view/',
  GIFS: {
    dmg_high: ['damage-thats-alot-of-damage-jon-tron-gif-13054497'],
    dmg_mid: ['hanginthere-damage-gif-19763661'],
    dmg_sustained: [
      'ugh-guys-im-hit-jason-david-frank-red-zeo-ranger-tommy-oliver-power-rangers-zeo-gif-19564332',
    ],
    quest_invite: ['gandalf-looking-for-adventure-gif-13515313'],
    quest_start: [
      'adventure-lotr-hobbit-lord-of-gif-5730296',
      'lord-of-the-rings-ian-mc-kellen-gandalf-prepare-for-battle-prepare-gif-4879285',
    ],
    quest_finish: ['clapping-clap-applause-lotr-lord-gif-5730286'],
    error: 'debugging-we-bare-bears-panda-grizzly-polar-bear-gif-7268856',
  },
  gif(key: GIF) {
    if (!this.GIFS[key]) {
      return this.TENOR_URL + this.GIFS.error
    }
    return this.TENOR_URL + this.GIFS[key][0]
  },
}

export default tenor
