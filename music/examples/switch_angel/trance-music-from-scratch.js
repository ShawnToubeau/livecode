// SWITCH ANGEL - https://www.youtube.com/watch?v=GWXCCBsOMSg

setCps(140/60/4)

kick$: s("sbd!4").beat("0,4,8,11,14", 16)._pianoroll()

bass$: n("3@3 4 5@3 6*2".add("-14,-21")).scale("g:minor").s("supersaw")
  .seg(16)
.room(.5).lpf(1000).lpenv(2)

clap$: s("cp!4").o(5).beat("0,4,8,11,14", 16)

lead$: n("0@2 <-7 [-5 -2]>@3 <0 -3 2 1>@3".add(7).add("<5 4 0 <0 2>>"))
.scale("g:minor").s("supersaw").trans(-12).delay(.7).pan(rand)
  .fm(.5).fmwave("brown")
.room(.5).lpf(2000).lpenv(2)._pianoroll()

_riser$: s("pulse!16").dec(.1).fm(time).fmh(time).o(4)
