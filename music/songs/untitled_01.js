await samples('github:ShawnToubeau/samples/master');

let cc = await midin('Midi Fighter Twister')

setCps(130 / 60 / 4);

// ##### INTERLUDE ##### //

beating_rumble$: 
  s("sfx:4")
  .chop(128)
  .cut(1)
  .loopAt(8)
  .dist("{1 .25}/4")
  .bpf(slider(70,0,200,10))
  .coarse(slider(8,0,12,1))
  .lpf(slider(430,0,1800,10))
  .clip(1)
  ._scope()

fill$: sound("fill").note("{c2 e2 d#2!2}%16".sub("{14 7}/4"))
  .struct(
    "{1}%16"
  )
  .dist("4:.045")
  .room(.025)
  .rlp(300)
  .rfade(.15)
  .roomsize(1.3)
  .lpf(cc(0).range(0, 2000))
  .lpq(12)
  .postgain(.35)
  .clip(.8)


hat: sound("ch")
  .euclidRot(7,8,7)
  .sometimesBy(.25, ply("2"))
  .dist("14:.15")
  .coarse(12)
  .postgain(cc(1).range(0, .25))
  .clip(.7)
  ._scope()

// ##### ##### //

kick: sound("kick")
  .note("{c2 d2}/2")
  .struct("{~ 1 ~ [1 <1 ~>]}%8")
  .lpf(cc(2).range(0, 600))
  .duckorbit(2)
  .duckattack(.05)
  .duckdepth(.35)
  .dist(.5)
  .clip(1)
._pianoroll()


synth_1: s("supersaw").note(
  "{c2 d#2}/2".sub(0)
)
  .struct("{1!7 ~}%16")
  .lpf(cc(3).range(0, 1600))
  .lpq(3)
  .lpa(cc(4).range(0.01, .5))
  .coarse(slider(2, 0, 6, 1))
  .orbit(2)
  .clip(1)
  ._scope()

bd$: sound("sbd")
  .struct(
    "{1 ~}%8"
  )
  .sometimesBy(".2", ply(2))
  .velocity(perlin.range(.9, 1.5).fast(2))
  .dist(".7")
  .compressor("-20:20:10:.002:.02")
  .lpf(cc(5).range(0, 600))
  .lpq(5)
  .sustain(.5)
  .decay(.5)
  .delay(.3)
  .coarse(4)
  .duckorbit(2)
  .duckattack(0.0125)
  .duckdepth(.75)
  .clip(1)
._pianoroll()
