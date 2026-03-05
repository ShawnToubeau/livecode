setCps(130 / 60 / 4);

_$: sound("fill")
  .struct(
    "{1@2}%8"
  )
  .dist(1.4)
  .room(.2)
  .roomsize(3)
  .lpf(0) // 600
  .postgain(1.4)
  .clip(1)
  .o(2)
  ._scope()

_riser$: s("pulse!16")
  .dec(.1) //  
  // .fm(.4)
  .fm(slider(0.6,.4,2))
  .fmh("<3 _ 4 _ 5 1>*2")
  .lpf(0) // 1200
  .o(4)
._scope()

_kick$: sound("sbd!4").distort("3:.5")
  .duck("2:3:4").duckattack(.2)
  .duckdepth(.8)
  ._scope()

_clap$: s("cp").beat("8, 16", 16).dist("3:.15").bank("RolandTR909").lpf(0) // 10k


_lead$: n("<7 9 0 4 0>*16"
         .add("<6 _ _ 5 _ 3 _ _ 7>*2")
        )
  .scale("c:minor")
  .transpose("-7") // -14 | -7
  .s("sawtooth")
  .o(3)
  .delay(.25)
  .pan(rand)
  .fm(.15)
  .fmwave('white')
  .lpf(0) // 1200
  ._pianoroll()

_trans01: sound("fx")
  .scrub("{0.1:.5!4 0.15:.6!4}")
  .struct("x*16")
  .dist("1.5:.5")
  .crush(6)
  .lpf(800)
  .clip(1)
  .postgain(saw.range(0.1, .4).fast(4))
  .lpf(0) // 0
  ._scope()
  
_kick$: sound("sbd")
  .struct("{[1 ~ 1 ~] [1 ~ 1 1]}%4") 
  .lpf(0) // 1000
  .distort("2:0.5")
  .duck("2:3:4").duckattack(.2)
  .duckdepth(.8)
  .velocity("{1.3 1.4 1.5 1.6}")
._pianoroll()

_clap$: s("cp!4").dist("3:.35").o(2).bank("RolandTR909")
  .lpf(0) // 5k

_hat$: s("oh").beat("0,8",16).bank("RolandTR909").o(3)
._pianoroll()

_mana_star$: 
  s("fx:1")
  .scrub("{0.1@4:1}%1")
  ._scope()

_lead$: n("<7 9 0 4 0>*8"
         .sub("<6 _ _ 5 _ 4>*2")
        )
  .scale("c:minor")
  .s("stab")
  .transpose("-14")
  .o(4)
  .clip(.5)
  .dist("3:.45")
  .delay(.25)
  .pan(rand)
  .lpf(0) // 2k
  ._pianoroll()