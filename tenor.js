export default {
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
  },
  gif(key) {
    // TODO: handle missing key by showing a missing gif

    if (!this.GIFS[key]) {
      return (
        this.TENOR_URL +
        'debugging-we-bare-bears-panda-grizzly-polar-bear-gif-7268856'
      )
    }

    return this.TENOR_URL + this.GIFS[key][0]
  },
}
