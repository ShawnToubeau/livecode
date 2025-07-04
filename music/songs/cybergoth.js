await samples('github:ShawnToubeau/samples/master');

setCps(140 / 60 / 4);

bd$: sound("kick:0")
  .struct("{1!4}%4")  
  .dist(.8)
  .lpf("{6000}%4")
  .attack(0.1)
  .sustain(.9)
  .decay(.2)
  .velocity(perlin.range(.9, 1.3))
  .clip(1) 
._scope()
  
$: sound("fill:0")
  .struct("{1!4}%4")
  .clip(1)


$: sound("cp")
  .struct("{1 ~}%4")
  .clip(1)

$: sound("ch")
  .coarse(3)
  .struct("{1!4}%8").sometimesBy(.1, ply("2"))
  .clip(1)

_$: sound("fx")
  .coarse(10) // 2 | 6
  .crush(8)
  .begin(0.15) // .1 | .125 | .15
  .struct("{1!4}%4")
  .clip(.75)
  .gain(.15)
  ._scope()
