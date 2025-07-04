await samples('github:ShawnToubeau/samples/master');

setCps(115 / 60 / 4);

const breakNumCycles = 4

const bd = "36"
  .note()
  .sound("kicks:9")
  .struct("{[1 1 0 1][1 0 0 1][1 0 0 1][1 0 1 0]}%4")  
  .room(.2)
  .shape(.4)
  .lpf("{<400 2000 800 3000>}%4")
  .decay(.2)
  .sustain(.6)
  .release(0.3)
  .velocity("{.8 .7 .5 .6}%16")
  .clip(1) 
  .gain(1)

const sd = "46".note().struct("{[0 1 0 0][1 0 0 0][1 0 0 1][1 0 <1 [1 0]> 0]}%4").sound("kicks:8").clip(1).lpf(1000)
const hh = note("52")
  .sound("{mine:1}")
  .loopAt(breakNumCycles)
  .slice(4 * breakNumCycles, "{<9 ~ 9 [9@2]>}%16")
  .velocity(perlin.range(.8, 1.2))
  .clip(1)
  .almostNever(ply(2))
  .gain(2)

const mel = 
  n("{[<0 <3 2>> ~ 4] [6 <1 2> ~ 3] [5 ~ 0 2] [4 ~ 5 <6 3>]}")
  .scale("F#:minor") // F# G# A B C# D E F#
  .sound("gm_bassoon:3, gm_synth_bass_2:6, gm_voice_oohs:3, gm_choir_aahs:1")
  .room(.3)
  .size(3)
  .lpf(perlin.range(2000, 3000).slow(16))
  .shape(.8)
  .postgain(.15)
  .phaser(".2")
  .clip(1)

const noise = s("white")
  .euclidRot("15",16,2)
  .decay(saw.fast(4).range(.01, .1))
  .postgain(.8)

const drums = stack(
  // bd,
  sd,
  hh,
  noise,
)

const goblinFilter = slider(3914, 20, 10000, 1)
const goblinRot = slider(3, 0, 16, 1)

const goblin = note("{<[40 44], [42 38]>}%2").sound("goblin:3")
 .loopAt(breakNumCycles)
 // .slice(8 * breakNumCycles, "{23 24 ~ [23 24] ~}%16")
 .slice(8 * breakNumCycles, "{0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31}%16")
  .clip(1)
  .decay(saw
         .fast(2)
         .range(.01, .7)
        )
  .penv(1)
  // .pan("<.35 .5 .65>")
  .pdecay(.001)
  .panchor(.001)
  .pattack(0.01)
  // .jux(rev)
  // .euclidRot(goblinRot, 16, 1)
  .gain(1.3)
  // .gain("{0.25 0.5 0.75 1}%1")
  .room(.1)
  .size(1.2)
  .lpf(goblinFilter)
  .velocity(perlin.range(.8, 1.2))
  .phaser(.2)

const bassFilter = slider(8601, 20, 10000, 1)

const bass = note("<f a d e d>"
                  .sub("{24 12 5 14}%16")
                  .rarely(sub(4))
                 )
  .s("gm_synth_bass_2:6")
  .euclidrot(15, 16, "<3 2 4>")
  .lpf(bassFilter)
  .release(.3)
  .cut(1)
  .gain(.4)

const mel2 = 
  note("{f a d e d}%16")
  .s("gm_bassoon:3, gm_synth_bass_2:6, gm_voice_oohs:3, gm_choir_aahs:1")
  .euclidrot(9, 16, "<3 2 4>")
  .clip(1)

const mel3Fm = slider(8,0,8,1) // 6
const mel3Fmh = slider(2,0,8,1) // 2

const mel3 = note("{f a d e d}%16".sub(20))
.s("sine").fm(mel3Fm).fmh(mel3Fmh).fmdecay(0.15).shape(.9).postgain(.6)
.euclidRot(13, 16, "<2>").hpf(400)
.clip(1)

stack(
  // drums,
  // mel2,
  // mel3,
  // bass,
  // goblin,
)