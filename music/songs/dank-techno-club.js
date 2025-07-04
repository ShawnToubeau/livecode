await samples('github:ShawnToubeau/samples/master');

setCps(127 / 60 / 4);

// "{d2 c2 b2 <a2 b2>}%8"
// "{a2 b2 c2 d2}%8"
_techno_synth: note("{a2 b2 c2 d2}%8")
  .s("supersaw")
  .gain(2)
  .room(1.3)
  .delay(.1)
  
  .clip(1)
  .phaser(1.4)

cp_2: sound("cp:1")
  .bank("RolandTR909")
  .struct("{1 ~ [1 0] ~}%8") 
  .shape(.8)
  .lpf(1300)
  // .gain(1)

noise: s("white")
  .euclidRot("15",16,2)
  .decay(saw.fast(4).range(.01, .1))
  .postgain(.8)

// "{c2 d#2!2 <~ e2>}%16"
// "{b#2!2}%8"
techno_bass: note("{c2 d#2!2 <~ e2>}%16").
  s("seq:1")
  .shape(.65)
  .lpf(slider(4620, 600, 10000, 10))
  .release(0.3)
  .decay(saw
   .fast(2)
   .range(.01, .7)
  )
  .penv(.1)
  .pan("{<.35 .5 .65>}%4")
  .pdecay(.001)
  .panchor(.001)
  .pattack("0 .1 .25 .5")
  .room(.1)
  .size(1.2)
  .velocity(perlin.range(.8, 1.2))
  .gain(.6)
  .clip(1)

const mel3Fm = slider(2,0,8,1) // 6
const mel3Fmh = slider(3,0,8,1) // 2

_bouncy_mel: note("{f a d <e d>}%8".sub(8))
.s("sine")
.fm(mel3Fm)
.fmh(mel3Fmh)
// .fmdecay(0.05)
.shape(.9)
.postgain(.6)
.euclidRot(13, 16, "<2>").hpf(400)
.clip(1)

dub_kick: s("kicks")
  .struct("{1 [1!2, 0] 0 [1!2, 0]}%4").n(1) // %4 | %8
  // .struct("{[1 1 0 1][1 0 0 1][1 1 0 1][1 0 0 1]}%4").n(0)
  .shape(.5)
  .lpf(slider(1300, 300, 2000, 10))
  .dist(".75:1")
  .gain(1)
  .clip(.9)
  .room(.1)
  .velocity(perlin.range(1.15, 1.24))