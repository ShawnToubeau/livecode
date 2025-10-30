await samples('github:ShawnToubeau/samples/master');

setCps(127 / 60 / 4);

mel1: note("{a2 b2 c2 d2}%16"
                   .rev()
                   .add("7 | 4 | 0"))
  .s("supersaw")
  .room(1.1)
  .size(1.2)
  .delay(.1)
  .clip(.7)
  .phaser(1.4)

mel2: note("{f a c <e d>}%8".add("7 | 4 | 10"))
.s("supersaw")
  .lpf(1200)
  .hpf(600)
  .hpq(10)
.fm(slider(2,0,8,1))
.fmh(slider(6,0,8,1))
.fmdecay(0.25)
.dist("2")
.euclidRot(11, 16, "2")
.postgain(.5)
.clip(1)

noise: s("white")
  .euclidRot("15",16,2)
  .decay(saw.fast(4).range(.01, .1))
  .postgain(.8)


  bumpin_that: s("vec1_sounds:<65 66>")
  .fast(8)
  .hpf(1400)
  .lpf(1000)
  .distort("<3:.5>")
  ._scope()

  