let cc = await midin('Midi Fighter Twister')

setCps(130 / 60 / 4);

op_synth: s("supersaw").note(
  "{c2 d#2}%4"
)
  .struct("{1}%8")
  .lpf(cc(0).range(0, 3000))
  .coarse(4)
  .postgain(1.25)
  .clip(1)

bd$: sound("kick")
  .struct(
    "{1 ~}%8"
  )
  .dist(berlin.range(.25, .8))
  .lpf(cc(1).range(0, 1200))
  .velocity(perlin.range(.9, 1.3))
  .clip(1) 
  ._scope()


fill$: sound("fill:1")
  .chop(128)
  // .cut(.5)
  .loopAt(4)
  .lpf(cc(2).range(0, 1200))
  .dist(.7)
  .room(.5)
  .roomsize(1)
  .postgain(.4)
  .clip(1)

lead_synth: sound("leads:0")
  .chop(128)
  // .cut(.9)
  .loopAt(8)
  .clip(1)
  .lpf(cc(3).range(0, 8000))
  // .postgain(.25)
  ._scope()
synth_3: sound("leads:1")
  .chop(128)
  // .cut(.9)
  .loopAt(16)
  .clip(1)
  .lpf(cc(4).range(0, 8000))
  ._scope()

_hat: sound("ch")
  .struct("{x}%16")
  // .dist(3)
  // .sometimesBy(.15, ply("2"))
  // .postgain(cc(5).range(0, .15))
  .postgain("{.3 .05}%8")
  .clip(.2)

cp: sound("cp")
  .struct("{[0!3 1][0!3 1][0!3 1][0 1 0 [1 1]]}")
  .dist(1.2)
  .lpf(cc(7).range(0, 300))

bass: sound("fx")
  .scrub("{0.12@3:.2 0.05:.25}%8")
  .lpf(cc(6).range(0, 300))
  .clip(1)
  .gain(.2)
  .pan("<.5 1 .5 0>")
  ._scope()

fill_2$: sound("fill").note("{c2!3 d#2}%4".sub(7))
  .struct(
    "{1@2}%8"
  )
  .fast(4)
  .dist(1.4)
  .room(.2)
  .roomsize(3)
  .lpf(cc(8).range(0, 600))
  .postgain(1.4)
  .clip(.7)
  ._scope()

// 

mel_1: note("{f <a d>}%8".sub("{12@4 5@4 8@4 4@4}/2"))
.s("supersaw")
.dist(1)
.euclid(13,16)
.hpf(berlin.range(50, 1500))
.postgain(.8)
.clip(1)

alarm: sound("fx")
  .scrub("{0.1:.3@4 0.15:.35@4}")
  .struct("x*16")
  .dist(1)
  .coarse(4)
  // .lpf(800)
  // .hpf(400)
  .clip(1)
  .postgain(saw.range(0.1, .4).fast(4))
  ._scope()