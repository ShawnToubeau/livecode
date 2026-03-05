// SWITCH ANGEL - https://www.youtube.com/watch?v=iu5rnQkfO6M

setCps(140/60/4)

lead$: n("<0 4 0 9 7>*16".add("<7 _ _ 6 5 _ _ 6>*2")).scale("g:minor").trans(-12)
.o(3).s("sawtooth")
  .delay(.4).pan(rand)
  .fm(.5).fmwave('white')
  ._pianoroll()

bass$: n("<7 _ _ 6 5 _ <5 3> <6 4>>*2").scale("g:minor").trans(-24)
  .detune(rand)
.o(4).s("supersaw")._pianoroll()

riser$: s("white!4").att(.4).o(6)

clap$: s("cp!4").o(8).gain(.5)

hat$: s("oh:1/2").bank("RolandTR909").fit().o(5)
._pianoroll()

kick$: s("sbd!4")
  .duck("3:4:5:6")
  .duckdepth(.8)
  .duckattack(.16)
  ._scope()

