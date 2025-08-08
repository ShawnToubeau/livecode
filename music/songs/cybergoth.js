// await samples('github:ShawnToubeau/samples/master');

let cc = await midin('Midi Fighter Twister')

setCps(130 / 60 / 4);

synth_1: s("supersaw").note(
  // "{c2 d#2}/2"
  "{c2 d#2}%4"
)
  .struct("{1}%8")
  // .phaser(1)
  .lpf(cc(0).range(0, 1600))
  .crush(perlin.range(10, 12))
  .coarse(slider(3, 0, 4, 1))
  .postgain(.25)
  .clip(1)

bd$: sound("kick")
  .struct(
    "{1 ~}%8"
    // "{1 ~ [1 1] ~}%8"
  )
  .dist(berlin.range(.25, .8))
  .lpf(cc(1).range(0, 1200))
  .velocity(perlin.range(.9, 1.3))
  .clip(1) 
  .postgain(.5)
  ._scope()




synth_2: sound("leads:1")
  .struct(
    "{1}%4"
  )
  .scrub("{0.1!2 .25@3 0.65!2 <0.8:1.5>}%8")
  // .clip(.6)
  .clip(1)
  .lpf(cc(2).range(0, 3000))
  .postgain(.25)
  ._scope()


hat: sound("ch")
  .struct("{1}%4")
  .dist(.125)
  .sometimesBy(.15, ply("2"))
  .postgain(cc(4).range(0, .15))
  .clip(.8)

fill$: sound("fill:1").note("{c2!3 d#2}%2".sub(7))
  .struct(
    "{~ 1 ~ 1}%8"
  )
  .lpf(cc(3).range(0, 1200))
  .dist(.7)
  .room(.25)
  .roomsize(1)
  .postgain(.4)
  .clip(1)


_bass: sound("fx")
  .scrub("{0.12@3:.2 0.05:.25}%8")
  // .hpf(100)
  .lpf(300)
  .clip(1)
  .gain(.2)
  ._scope()

