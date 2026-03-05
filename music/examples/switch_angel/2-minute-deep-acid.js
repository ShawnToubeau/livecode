// SWITCH ANGEL - https://www.youtube.com/watch?v=HkgV_-nJOuE

setCps(140/60/4)

kick$: sound("sbd!4").distort("3:.3")
  ._scope()
.duck("2:3:4").duckattack(.2).duckdepth(.8)

bass$: n(irand(10).sub(7).seg(16)).scale("c:minor")
  .rib(46,1)
  .distort("2.2:.3")
  ._pianoroll().s("sawtooth").lpf(200).lpenv(slider(8,0,8)).lpq(12).orbit(2)

fog$: s("supersaw")
  .detune(1)
  .rel(5)
  .beat(2,32)
  .slow(2)
.orbit(3)
.fm("2").fmh(2.04).room(1).roomsize(6)

riser$: s("pulse").orbit(4).seg(16).dec(.1).fm(time).fmh(time)

