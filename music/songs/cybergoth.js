await samples('github:ShawnToubeau/samples/master');

setCps(150 / 60 / 4);

const breakNumCycles = 4

bd$: sound("kick:0")
  .struct("{1!4}%4")  
  .dist(1.5)
  .lpf(2000)
  .velocity(perlin.range(.9, 1.3))
  .clip(1) 
._scope()
  
_$: sound("fill:0")
  .struct("{1!4}%4")
  .clip(1)


_$: sound("cp")
  .beat("4, 8", 8)
  .clip(1)

$: sound("ch")
  // .dist(1.1)
  .struct("{1 ~}%8")
  .sometimesBy(.1, ply("2"))
  .clip(1)

_$: sound("fx")
  .coarse(3)
  .scrub("{[<0.15@4:1.2> <0@4:.5>]}%16")
  .hpf(400)
  .lpf(1200)
  .clip(1)
  .gain(.5)
  ._scope()

mel_1: note("{f <a d>}%8".sub(12))
.s("supersaw")
.dist(1.5)
.euclid(15,16)
.hpf(slider(300,50,1800,50))
// .postgain(2)
.clip(1)