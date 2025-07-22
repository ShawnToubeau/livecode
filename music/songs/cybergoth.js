// await samples('github:ShawnToubeau/samples/master');

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

$: sound("leads:0")
  .struct("{1!4}%4")
  .clip(1)
  // .lpf(slider(2200,50,4000,50))


_$: sound("cp:2")
  // .beat("4", 4)
  .clip(1)

$: sound("ch")
  .dist(4)
  .coarse(3)
  .struct("{1}%8")
  .sometimesBy(.1, ply("2"))
  .postgain(.2)
  .clip(1)


$: sound("fx")
  // .note("{c1@6 e1@2 d1@4 f1@4}/4")
  // .coarse(3)
  // .crush(7)
  .scrub("{[<0.12:.2> ]}%4") // <0@4:.5>
  .hpf(500)
  .lpf(2000)
  .clip(1)
  // .gain(.5)
  ._scope()

_mel_1: note("{f <a d>}%8".sub(12))
.s("supersaw")
.dist(1.5)
.euclid(15,16)
.hpf(slider(950,50,1800,50))
// .postgain(2)
.clip(1)