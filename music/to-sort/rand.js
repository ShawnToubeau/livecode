
await samples('github:ShawnToubeau/samples/master');

setCps(120 / 60 / 4);

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

const sd = "46".note().struct("{[0 1 0 0][1 0 0 0][1 0 0 1][1 0 <1 [1 0]> 0]}%4").sound("kicks:8").clip(1).lpf(500)
const hh = note("52")
  .sound("{mine:1}")
  .loopAt(breakNumCycles)
  .slice(4 * breakNumCycles, "{9}%16") // 2 7 9
  .adsr("0:0.3:0.2:0.17")
  .velocity(perlin.range(.8, 1.2))
  .clip(1)
  .almostNever(ply(2))

const mel = 
  n("{[<0 <3 2>> ~ 4] [6 <1 2> ~ 3] [5 ~ 0 2] [4 ~ 5 6]}")
  .scale("F#:minor") // F# G# A B C# D E F#
  .sound("gm_bassoon:3, gm_synth_bass_2:6, gm_voice_oohs:3, gm_choir_aahs:1")
  .room(.3)
  .size(3)
  .lpf(perlin.range(200, 3000).slow(16))
  .shape(.8)
  .postgain(.3)
  .phaser(".2")
  .clip(1)

const drums = stack(
  bd,
  sd,
  hh,
)

const goblin = note(44).sound("goblin:3").clip(1)
 // .loopAt(breakNumCyles)
 // .slice(8 * breakNumCyles, "{0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31}%16")
  // .gain("{0.25 0.5 0.75 1}%1")
  // .room(.3) 
  // .size(3)

// const goblin = sound("goblin:3")
//   .struct("{1 0!15}%4")
//   // .clip(1)
//   // .lpf("{400 800 2000 3000}*4")
//   .lpf(10000)
  

stack(
  drums.postgain(.5),
  // mel,
  // goblin,
)

// Inspo: Pulsewidth

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

const sd = "46".note().struct("{[0 1 0 0][1 0 0 0][1 0 0 1][1 0 <1 [1 0]> 0]}%4").sound("kicks:8").clip(1).lpf(1000)
const hh = note("52")
  .sound("{mine:1}")
  .loopAt(breakNumCycles)
  .slice(4 * breakNumCycles, "{<9>}%16".almostNever(sub("10")))
  .adsr("0:0.3:0.2:0.17")
  .velocity(perlin.range(.8, 1.2))
  .clip(1)
  .almostNever(ply(2))
  .gain(1.2)

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

const drums = stack(
  bd,
  sd,
  hh,
)

const goblin = note(40).sound("goblin:3")
 .loopAt(breakNumCycles)
 // .slice(8 * breakNumCycles, "{23 24 ~ [23 24] ~}%16") // 23
 .slice(8 * breakNumCycles, "{0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31}%16") // 3-4, 12-17, 23-24, 27-29
  // .gain("{0.25 0.5 0.75 1}%1")
  .clip(1)
  .gain(.3)
  .room(.3) 
  .size(3)
  .velocity(perlin.range(.8, 1.2))

// const goblin = sound("goblin:3")
//   .struct("{1 0!15}%4")
//   // .clip(1)
//   // .lpf("{400 800 2000 3000}*4")
//   .lpf(10000)

const bassFilter = slider(9962, 20, 10000, 1)

const bass = note("<f a d e>"
                  .sub("{24 12 5 14}%4")
                  .rarely(sub(4))
                 )
  .s("gm_synth_bass_2:6")
  .euclidrot(15, 16, "<3 2 4>")
  .lpf(bassFilter)
  .release(.3)
  .cut(1)
  .gain(.4)

stack(
  drums.postgain(.5),
  mel,
  bass
  // goblin,
)

// ---

await initHydra()

noise()
.color(() => 0,0,2)
.modulate(noise().scale(0.3))
.scale(3)
.blend(o0)
.out(o0)

osc()
.modulate(2)
.color(0.3,0.4,0.4)
.out(o1)

render(o2)

src(o0)
.layer(
  src(o1)
  .mask(o1)
  .saturate(7)
)
.modulateRotate(o1)
.out(o2)

const melody = "{c e g a f}%{8}"
      .add("{0 7 4, 2}%4")
      .add(-48)
      .scale("C:major")
      .note()
      .sound("sine")

stack(
  melody
 )
.cpm(140 / 4);

// ---

await samples('github:ShawnToubeau/samples/master')
await initHydra()
setCps(180/60/4)

const songProgression =
  "<0@16 1@16 2@32 1@16 0@8>";

const breakNumCyles = 4

const drumPat = "{[[8 | 9] [9 8]] [2 3] [8 2] [1!4 | [8 14] | [22 16!2]] [[8 | 9] [8 9]] [2 16] [8 20] [4!4]}%4"
const drums = note(36).sound("breaks:1")
  .loopAt(breakNumCyles)
  .slice(8 * breakNumCyles, drumPat)
  .speed(pick("<0 0 1 2>", [".16", "{.2@8 .3? .22@4}%8", "{.16@5 -.16 .16@2}%8"]))
  .shape(0.3)
  .postgain(2)
  .cut(1)

const cpat = "<0!3 12 10 0!2 12 10 0!2 12 8 10 6 4 0!3 12 10 0!2 12 10 0!2 12 8 10 6 4>"

const introlpf = slider(800, 800, 5000, 200)
const melodyIntro = note("36")
  .add(cpat)
  .sound("champ")
  .slice(16, "<1>") 
  .clip(1)
  .lpf(introlpf)

const cpatSlice = "<10!2 5 5>"
const melodyCore = note("36")
  .add(cpat)
  .sound("champ")
  .slice(16, cpatSlice) 
  .clip(1)

const bass = 
  "d#1".add(cpat)
  .almostNever(add("7"))
  .struct("<1!3 1 1 1!2 1 1 1!2 1 1 1 1 1>")
  .note()
  .sound("sawtooth, gm_fx_brightness, gm_pad_warm").lpf(400).lpq(4).shape(0.8).postgain(0.55)

const arp = n("{0 1 2 3 4 5 6 7}%16")
  .chord("<D#m7@12 Bm7 C#m7 Am7 Gm7>")
  .voicing()
  .sound("sawtooth, white:0:0.1")
  .lpf(400).lpenv(tri.range(0, 10).fast(8)).lpsustain(0.1).lpdecay(0.05)
  .every(3, rev)
  .jux(rev)
  .adsr([0, 0.1, 0.5, 0.2])
  .delay("0.80:0.22:.5")
  .postgain(0.6)

// Visuals 

const shapePat = pick(
  songProgression,
  [
    cpat,
    drumPat,
    drumPat,
  ]
)


const scrollSpeed = pick(
  songProgression,
  [
    .5,
    .75,
    1.5,
  ]
)

const lumaPat = pick(
  songProgression,
  [
    ".08, .03",
    ".04, .01",
    ".04, .01",
  ]
)

const inversion = pick(
  songProgression,
  [
    .3,
    .2,
    .1,
  ]
) 

const oscPat = pick(
  songProgression,
  [
    "40, 0.09, 0.9",
    "40, 0.09, 0.9",
    "-40, -0.04, -0.03",
  ]
)

shape(H(shapePat))
.repeat(5,3, ()=>a.fft[0]*2, ()=>a.fft[1]*2)
.scrollY(.5,H(scrollSpeed))
.layer(
  src(o1)
  .mask(o0)
  .luma(H(lumaPat))
  .invert(H(inversion))
)
.modulate(o1,() => 0.01 + Math.sin(time) * 0.03)
.out(o0)

osc(H(oscPat))
.color(1,0,1)
.modulate(osc(40).rotate(1, 0.9))
.rotate(1, 0.5)
.out(o1)

render(o0)

// Arrangement

const sections = [
  stack(melodyIntro),
  stack(melodyIntro, drums),
  stack(melodyCore, arp, drums, bass)
]

stack(
  pick(
    songProgression,
    sections
  )
)

// ---


await samples('github:daslyfe/lcassets/main');

//   /$$$$$$  /$$$$$$ /$$      
//  /$$__  $$|_  $$_/| $$      
// | $$  \ $$  | $$  | $$      
// | $$  | $$  | $$  | $$      
// | $$  | $$  | $$  | $$      
// | $$  | $$  | $$  | $$      
// |  $$$$$$/ /$$$$$$| $$$$$$$$
//  \______/ |______/|________/

setCps(130 / 60 / 4);
const breakNumCyles = 4

/*

 /\\_/\\
/  o  \\
|      |
|      | 
|      |
|______|
 \\    /
  \\//

*/

const beat = note(38).sound("oil")
 .loopAt(breakNumCyles)
 .slice(8 * breakNumCyles, "{12 ~}%8")
  .clip(1)
  .gain(.7) // .4 .7
  .room(0.5)
  .slow(1)

/*

     .--.
    /  oo  \\
   |  \__/  |
   |  /  \  |
   | /    \ |
   |/_/\\_\|
   /  /\/\  \\
  /  /  \  \  \\
 /  /    \  \  \\
|  /______\  \\
|  `-------'  \\
 \  /\/\/\/  /
  \/\/\/\/\/

*/

const drums = stack(
  sound("jbd:23")
    .struct("{1}%4")
    .postgain(3)
    .room(0.05)
  ,
  sound("{~ ~ joh:2 ~}%16")
    .struct("{1}%16")
    .postgain(0.9),
).gain(.8);

/*

    /\\_/\\
   | o o |
   |_____|
   |     |
   |_____|
   //   \\
  //\\_/\\ 

*/

const bass = note("<e2 [g1 | g2] a1 c2>")
  .sound("gm_synth_brass_1, sawtooth")
  .struct("<1 0>*16") // 16 32
  .clip(1)
  .gain(1);

/*

    /\___/\
   |  o o  |
   |  /|\  |
   | /  \  |
   | |  | |
   | |__| |
   | |  | |
   | /  \  |
   | |  | |
   | |__| |
   /\___/\

*/

const vocal1 = note(38).sound("oil")
 .loopAt(breakNumCyles)
 .slice(8 * breakNumCyles, "{4 5 6 7}%8") // 8 slow 16 fast
  .release(0)
  .clip(1)
  .gain(.7)
  .room(0.5)

/*

         /\
        /  \
       /    \
      /------\
     |  o o  |
     |        |
     |        |
     \________/

*/

const melody = 
  note("<e2 [g1 | g2] a1 c2>")
  .struct("{1 0}*16") // 8 slow 16 fast
  .sound("gm_fx_brightness, gm_pad_warm")
  .lpf(2000) // 200 800 2000 4000
  .lpq(5)
  .shape(.8)
  .postgain(.7)

/*

     /\        /\
    /  \      /  \
   |    \    |    \
   | o o |   | o o |
   |        |   |        |
   |        |   |        |
   \________/ \________/

*/

const peak = note(38).sound("oil")
 .loopAt(breakNumCyles)
 .slice(8 * breakNumCyles, "{4 5 6 7 8 9 10 11}%8")
  .clip(1)
  .room(.2)

/*

         .-"-.._..-".-"/
        / o | o | o \      \
       /   |   |   \      \
      |   |   |   |      \
     |   |___|___|   |    |
     |_,_/_/_/_/_|_/   |/
       `-._/   \___.-'

*/

const vocal2 = note(38).sound("oil")
 .loopAt(breakNumCyles)
 .slice(8 * breakNumCyles, "{13 14 10 11 1 2}%8")
  .clip(1)
  .room(.6)
  .hpf(900) // 500 900

const songProgression =
  "<0@3 1@4 2@5 3@6 4@6 5@1 6@6 5@1 4@6 5@1 3@6 2@6 1@2>";

const sections = [
  stack(beat),
  stack(beat, drums),
  stack(beat, drums, bass),
  stack(beat, drums, bass, vocal1),
  stack(beat, drums, bass, vocal1, melody),
  stack(peak),
  stack(beat, drums, bass, melody, vocal2),
]

stack(
  pick(
    songProgression,
    sections
  )
)

// ---

await samples('github:daslyfe/lcassets/main');

setCps(130 / 60 / 4);
// const breakNumCyles = 4

const footwork = [
  "{[0]}%4",
  "{[1][0]}%4",
  "{[1]}%4",
  "{[1 0 0 1][0 1 0 1][0 0 1 0][1 0 1 0]}%4",
  "{[1 0 1 0][0 1 0 1][0 0 1 0][1 0 1 0]}%4",
  "{[1 0 0 1][0 0 1 0][1 0 1 0][1 0 1 0]}%4",
  "{[1 0 0 1][0 1 0 1][1 0 0 1][0 0 1 0]}%4",
  "{[1 0 0 1][0 0 1 1][1 0 0 1][1 0 1 0]}%4",
  "{[1 0 0 1][1 1 0 1][0 0 1 0][1 0 0 0]}%4",
  "{[1 0 1 1][0 0 1 0][1 1 0 0][1 0 0 0]}%4",
  "{[1 0 1 1][0 0 0 1][1 0 1 0][0 0 1 0]}%4",
  "{[1 0 0 0][1 0 1 1][0 1 0 1][1 1 0 0]}%4",
  "{[1 0 0 1][0 1 0 0][0 1 0 1][1 0 1 0]}%4",
  "{[1 0 1 1][0 1 0 1][0 0 1 0][1 0 0 0]}%4",
  "{[1 0 0 1][1 0 1 0][1 0 0 1][1 1 0 0]}%4",
  "{[1 0 1 1][0 0 1 0][1 0 1 1][0 0 1 0]}%4",
  "{[1 1 0 1][0 1 0 0][1 1 0 0][1 0 0 0]}%4",
  "{[1 1 0 1][0 0 1 0][1 1 0 1][0 1 0 0]}%4",
  "{[1 1 0 1][1 0 0 1][1 0 0 1][1 0 1 0]}%4", // good
  "{[1 0 1 0][1 1 0 1][1 0 0 1][1 0 0 1]}%4",
  "{[1 1 1 1][0 0 1 0][1 1 1 1][0 0 1 0]}%4",
  "{[1 0 1 1][0 0 1 0][1 0 1 1][1 1 1 1]}%4",
  // "{[1 0 1 1][0 1 0 1]}%4",
];

// const drumpat = pick(
//   "<0 [0 <[0 0 ~] [0 0 ~] [0 0 ~] 1>]>",
  
// )

const drumpat = [
    "{[1 1 0 1][1 0 0 1][1 0 0 1][1 0 1 0]}%4",
    "{1}%16",
  ]

const bd = "48"
  .note()
  .sound("jbd:8") // 5 (lpf=400-3000, room=.3), 8 (room=.3, hpf=300-2000) 
  .struct(pick(
    "0",
    drumpat
  ))  
  .room(.1)
  .shape(.4)
  .lpf(800)
  .decay(.2)
  .sustain(.6)
  .velocity("{.8 .7 .5 .6}%16")

const sd = "46".note().struct("{[0 1 0 0][1 0 0 0][1 0 0 1][1 0 1 0]}%4").sound("sd:10")

const hhpat = [
  "{[0]}%4",
  "{[1 1]}%4",
  "{[1 1][1 1][1 1][1 [1!4]]}%4",
  "{[1 0 0 1][0 1 1 1]}%4",
  "{[1 1 1 1]}%4",
];
const ohpat = [
  "{[0]}%4",
  "{[0 0 1 0]}%4",
  "{[0 0 1 0][0 0 1 1]}%4",
  "{[0 0 1 1][0 0 1 1]}%4",
];

const hh = sound("{jch:13}%16").struct("{1 0 0 0}%16")
const oh = sound("{joh:2}").struct(pick("2", ohpat)) 

const drums = stack(
  bd,
  sd,
  hh,
  oh,
  // .swingBy(.1, 16)
  // .almostNever(ply("2"))
  // .postgain(3),
  // sound("{~ ~ joh:2 ~}%16")
  //   .struct("{1}%16")
  //   .postgain(0.9),
  // sound("jbd:7").struct("{1 ~}%4").almostNever(ply(2)),
  
  // 
  // sound("jcp:23").struct("{0 1}%8")// jcp:23
);

const mel = 
  note("<e2 [g1 | g2] a1 c2>")
  .struct("1*16") // 8 slow 16 fast
  .sound("gm_synth_brass_2")
  .lpf(2000) // 200 800 2000 4000
  .lpq(5)
  .shape(.8)
  .postgain(.7)

const bass = note("<e2 [g1 | g2] a1 c2>/4")
  .sound("gm_synth_brass_1, sawtooth")
  .struct("{1}%16")
  .clip(1)
  .gain(1.5);

stack(
  drums,
  // mel
  // bass
)


await samples('github:daslyfe/lcassets/main');
await samples('github:ShawnToubeau/samples/master');

setCps(130 / 60 / 4);
// const breakNumCyles = 4

const footwork = [
  "{[0]}%4",
  "{[1][0]}%4",
  "{[1]}%4",
  "{[1 0 0 1][0 1 0 1][0 0 1 0][1 0 1 0]}%4",
  "{[1 0 1 0][0 1 0 1][0 0 1 0][1 0 1 0]}%4",
  "{[1 0 0 1][0 0 1 0][1 0 1 0][1 0 1 0]}%4",
  "{[1 0 0 1][0 1 0 1][1 0 0 1][0 0 1 0]}%4",
  "{[1 0 0 1][0 0 1 1][1 0 0 1][1 0 1 0]}%4",
  "{[1 0 0 1][1 1 0 1][0 0 1 0][1 0 0 0]}%4",
  "{[1 0 1 1][0 0 1 0][1 1 0 0][1 0 0 0]}%4",
  "{[1 0 1 1][0 0 0 1][1 0 1 0][0 0 1 0]}%4",
  "{[1 0 0 0][1 0 1 1][0 1 0 1][1 1 0 0]}%4",
  "{[1 0 0 1][0 1 0 0][0 1 0 1][1 0 1 0]}%4",
  "{[1 0 1 1][0 1 0 1][0 0 1 0][1 0 0 0]}%4",
  "{[1 0 0 1][1 0 1 0][1 0 0 1][1 1 0 0]}%4",
  "{[1 0 1 1][0 0 1 0][1 0 1 1][0 0 1 0]}%4",
  "{[1 1 0 1][0 1 0 0][1 1 0 0][1 0 0 0]}%4",
  "{[1 1 0 1][0 0 1 0][1 1 0 1][0 1 0 0]}%4",
  "{[1 1 0 1][1 0 0 1][1 0 0 1][1 0 1 0]}%4", // good
  "{[1 0 1 0][1 1 0 1][1 0 0 1][1 0 0 1]}%4",
  "{[1 1 1 1][0 0 1 0][1 1 1 1][0 0 1 0]}%4",
  "{[1 0 1 1][0 0 1 0][1 0 1 1][1 1 1 1]}%4",
  // "{[1 0 1 1][0 1 0 1]}%4",
];

// const drumpat = pick(
//   "<0 [0 <[0 0 ~] [0 0 ~] [0 0 ~] 1>]>",
  
// )

const drumpat = [
    "{[1 1 0 1][1 0 0 1][1 0 0 1][1 0 1 0]}%4",
    "{1 ~}%16",
  ]

const bd = "36"
  .note()
  .sound("kicks:9") // 5 (lpf=400-3000, room=.3), jbd:8 (room=.3, hpf=300-2000) 
  .struct(pick(
    "0",
    drumpat
  ))  
  .clip(1)
  .room(.2)
  .shape(.4)
  // .lpf("{<400 2000 800 3000>}%8")
  .decay(.2)
  .sustain(.6)
  .release(0.3)
  .velocity("{.8 .7 .5 .6}%16")

const sd = "46".note().struct("{[0 1 0 0][1 0 0 0][1 0 0 1][1 0 1 0]}%4").sound("sd:10")

const hhpat = [
  "{[0]}%4",
  "{[1 1]}%4",
  "{[1 1][1 1][1 1][1 [1!4]]}%4",
  "{[1 0 0 1][0 1 1 1]}%4",
  "{[1 1 1 1]}%4",
];
const ohpat = [
  "{[0]}%4",
  "{[0 0 1 0]}%4",
  "{[0 0 1 0][0 0 1 1]}%4",
  "{[0 0 1 1][0 0 1 1]}%4",
];

const hh = sound("{jch:13}%16").struct("{1 0 0 0}%16")
const oh = sound("{joh:2}").struct(pick("1", ohpat)) 

const drums = stack(
  // bd,
  // sd,
  // hh,
  // oh,
  // .swingBy(.1, 16)
  // .almostNever(ply("2"))
  // .postgain(3),
  // sound("{~ ~ joh:2 ~}%16")
  //   .struct("{1}%16")
  //   .postgain(0.9),
  // sound("jbd:7").struct("{1 ~}%4").almostNever(ply(2)),
  
  // 
  // sound("jcp:23").struct("{0 1}%8")// jcp:23
);

const mel = 
  note("<e2 [g1 | g2] a1 c2>")
  .struct("1*16") // 8 slow 16 fast
  .sound("gm_synth_brass_2")
  .lpf(2000) // 200 800 2000 4000
  .lpq(5)
  .shape(.8)
  .postgain(.7)

const bass = note("<e2 [g1 | g2] a1 c2>/4")
  .sound("gm_synth_brass_1, sawtooth")
  .struct("{1}%16")
  .clip(1)
  .gain(1.5);

stack(
  drums,
  // mel
  // bass
)

await samples('github:ShawnToubeau/samples/master');

setCps(120 / 60 / 4);

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

// "{[0]}%4",
//   "{[1 1]}%4",
//   "{[1 1][1 1][1 1][1 [1!4]]}%4",
//   "{[1 0 0 1][0 1 1 1]}%4",
//   "{[1 1 1 1]}%4",

const sd = "46".note().struct("{[0 1 0 0][1 0 0 0][1 0 0 1][1 0 1 0]}%4").sound("kicks:8").clip(1).lpf(500)
// const hh = "36".note().struct("{1}%8").sound("{hh:3 hh:6}%4").gain("{.2 .5}%8")
const hh = note("52")
  .sound("{mine:1}")
  .loopAt(breakNumCycles)
  // .slice(8 * breakNumCycles, "{8 ~ 4 [~ 4 9]}%16, {13 ~}%16") // 4 ~ [4 11] 8
  .slice(8 * breakNumCycles, "{[4 ~ [13 9] 8]}%4") // pick-like 4 5 8 9 13 17 24 28 30 // hh-like 22 
  .adsr("0:0.1:0.2:0")
  .velocity(perlin.range(.8, 1.2))
  .clip(1)
  .gain(.5)


 // .loopAt(breakNumCyles)
 // .slice(8 * breakNumCyles, "{0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31}%16")
  // .gain("{0.25 0.5 0.75 1}%1")
  // .room(.3) 
  // .size(3)

const mel = 
  n("{[<0 <3 2>> ~ 4] [6 <1 2> ~ 3] [5 ~ 0 2] [4 ~ 5 6]}")
  .scale("F#:minor") // F# G# A B C# D E F#
  .sound("gm_bassoon:3, gm_synth_bass_2:6, gm_voice_oohs:3, gm_choir_aahs:1")
  .room(.3)
  .size(3)
  .lpf(perlin.range(200, 3000).slow(16))
  .shape(.8)
  .postgain(.3)
  .phaser(".2")
  .clip(1)

const drums = stack(
  bd,
  sd,
  hh,
)



const goblin = note(44).sound("goblin:3").clip(1)
 // .loopAt(breakNumCyles)
 // .slice(8 * breakNumCyles, "{0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31}%16")
  // .gain("{0.25 0.5 0.75 1}%1")
  // .room(.3) 
  // .size(3)

// const goblin = sound("goblin:3")
//   .struct("{1 0!15}%4")
//   // .clip(1)
//   // .lpf("{400 800 2000 3000}*4")
//   .lpf(10000)
  

stack(
  drums.postgain(.5),
  // mel,
  // goblin,
)

// ---

await samples('github:ShawnToubeau/samples/master');

setCps(120 / 60 / 4);

const bd = "36"
  .note()
  .sound("kicks:9")
  .struct("{[1 1 0 1][1 0 0 1][1 0 0 1][1 0 1 0]}%4")  
  .room(.2)
  .shape(.4)
  .lpf("{<400 2000 800 3000>}%8")
  .decay(.2)
  .sustain(.6)
  .release(0.3)
  .velocity("{.8 .7 .5 .6}%16")
  .clip(1) 

const sd = "46".note().struct("{[0 1 0 0][1 0 0 0][1 0 0 1][1 0 1 0]}%4").sound("kicks:8").clip(1).lpf(500)
const hh = "36".note().struct("{1}%8").sound("{hh:3 hh:6}%4").gain("{.2 .5}%8")

const mel = 
  n("{[<f# <b a>> ~ c#] [e <g# a> ~ b] [d ~ f# a] [c# ~ d e]}")
  .scale("F#:minor") // F# G# A B C# D E F#
  .sound("gm_bassoon:3, gm_synth_bass_2:6, gm_voice_oohs:3, gm_choir_aahs:1")
  .room(.8)
  .size(3)
  .lpf(perlin.range(200, 3000).slow(16))
  .shape(.8)
  .postgain(.5)
  .phaser(".2")
  .clip(1)

const drums = stack(
  bd,
  sd,
  hh,
)

stack(
  drums,
  mel
)

// ---

/*
  @title Euclid Workout
  @by Switch Angela
  @license CC BY-NC-SA
*/

setCps(128/60/4)

const kickFill = slider(27, 0, 32, 1)
const kickRot = slider(2,0,8,2)
const snareFill = slider(1, 0, 32, 1)
const melodyseed = slider(629, 0, 1000, 1)
const melodyFill = slider(15, 0, 16, 1)
const bassFilter = slider(20, 20, 10000, 1)

const drums = stack(
  s("bd:17").euclidrot(kickFill, 32, kickRot).cut(1).slow(2),
  s("sd").euclidrot(snareFill, 32, 8).slow(2),
  s("hh:0!16").gain(.1).cut(2),
).bank("RolandMC303").shape(.2).postgain(.7).almostNever(ply(2))

const bass = note("<f@4 a@4>".sub("{24 12 5 12}%16")).s("sawtooth").euclidrot(5, 16, "<3 1>").lpf(bassFilter).release(1).cut(2)

const mel = note(irand(14).segment(16).add(3).scale('C:pentatonic')).ribbon(melodyseed, 3)
  .euclidRot(melodyFill, 16, 4)
  // .n affects the number of partials in the sawtooth synth
  .s("sawtooth").n(rand.range(1, 10))
  .gain(.2).clip(0.01).release(0.9).pan(sine.fast(2))

stack(drums, bass, mel).room(.1)

// ---

const melody = "{c e g a f}%{16}%1"
      .add("{0 7 4}%8")
      .add(-48)
      .scale("C:pentatonic")
      .note()
      .sound("sawtooth")
      .lpf("{4000 2500 1200 800 1600}%8")

const kickpat = "{[1 0 0 0] [0 0 0 0] [0 1 0 0] [0 0 0 0]}%4";

const snarepat = "{[0] [1 0 0 0] [0 0 1 0] [0]}%4";
const hpat = "{1}%16";

const drums = stack(
  "36".note().struct(kickpat).sound("bd:6"),
     "36".note().struct(snarepat).sound("sd:6"),
  "36".note().struct(hpat).sound("{hh:3 hh:6}%4").gain("{.2 .5}%16")
  
 // kickpat.struct().sound("bd:2")
  
).when("0 0 1 0", ply(2))


stack(
  melody,
  drums
).cpm(127/4)

const melody = "{c e g a f}%{8}%1"
      .add("{0 7 4}%16")
      .add(-48)
      .scale("C:pentatonic")
      .note()
      .sound("sawtooth")
      // .lpf("{4000 2500 1200 800 1600}%16")
      // .adsr([0, 0.1, 0.5, 2])

const kickpat = "{[1 0 0 0] [0 1 0 0] [0 1 0 0] [0 1 0 0]}%4";
const snarepat = "{[0] [1 0 0 0] [0 0 1 0] [0]}%4";
const hpat = "{1}%8";

const drums = stack(
  "36".note().struct(kickpat).sound("bd:6"),
  "36".note().struct(snarepat).sound("sd:6"),
  "36".note().struct(hpat).sound("{hh:3 hh:6}%4").gain("{.2 .5}%8")
)
  // .when("0 0 1 0", ply(2))


stack(
  melody,
  // drums
).cpm(127/4)

// "Waa2"
// @license CC BY-NC-SA 4.0 https://creativecommons.org/licenses/by-nc-sa/4.0/
// @by Felix Roos

note(
  "a4 [a3 c3] a3 c3"
  .sub("<7 12 5 12>".slow(2))
  .off(1/4,x=>x.add(7))
  .off(1/8,x=>x.add(12))
)
  .slow(2)
  .clip(sine.range(0.3, 2).slow(28))
  .s("sawtooth square".fast(2))
  .cutoff(cosine.range(500,4000).slow(16))
  .gain(.5)
  .room(.5)
  

const footwork = [
  "{[0]}%4",
  "{[1][0]}%4",
  "{[1]}%4",
  "{[1 0 0 1][0 1 0 1][0 0 1 0][1 0 1 0]}%4",
  "{[1 0 1 0][0 1 0 1][0 0 1 0][1 0 1 0]}%4",
  "{[1 0 0 1][0 0 1 0][1 0 1 0][1 0 1 0]}%4",
  "{[1 0 0 1][0 1 0 1][1 0 0 1][0 0 1 0]}%4",
  "{[1 0 0 1][0 0 1 1][1 0 0 1][1 0 1 0]}%4",
  "{[1 0 0 1][1 1 0 1][0 0 1 0][1 0 0 0]}%4",
  "{[1 0 1 1][0 0 1 0][1 1 0 0][1 0 0 0]}%4",
  "{[1 0 1 1][0 0 0 1][1 0 1 0][0 0 1 0]}%4",
  "{[1 0 0 0][1 0 1 1][0 1 0 1][1 1 0 0]}%4",
  "{[1 0 0 1][0 1 0 0][0 1 0 1][1 0 1 0]}%4",
  "{[1 0 1 1][0 1 0 1][0 0 1 0][1 0 0 0]}%4",
  "{[1 0 0 1][1 0 1 0][1 0 0 1][1 1 0 0]}%4",
  "{[1 0 1 1][0 0 1 0][1 0 1 1][0 0 1 0]}%4",
  "{[1 1 0 1][0 1 0 0][1 1 0 0][1 0 0 0]}%4",
  "{[1 1 0 1][0 0 1 0][1 1 0 1][0 1 0 0]}%4",
  "{[1 1 0 1][1 0 0 1][1 0 0 1][1 0 1 0]}%4",
  "{[1 0 1 0][1 1 0 1][1 0 0 1][1 0 0 1]}%4",
  "{[1 1 1 1][0 0 1 0][1 1 1 1][0 0 1 0]}%4",
  "{[1 0 1 1][0 0 1 0][1 0 1 1][1 1 1 1]}%4",
];

const footworksnare = [
  "{[0][1][0][1]}%4",
  "{[0 0 0 1][0]}%4",
  "{[0 0 0 1][0][0 0 0 1][0 0 1 0]}%4",
  "{[0 0 0 1][0 0 1 0]}%4",
  "{[0 0 0 1][0][1][0]}%4",
];

const hh = [
  "{[0]}%4",
  "{[1 1]}%4",
  "{[1 1][1 1][1 1][1 [1!4]]}%4",
  "{[1 0 0 1][0 1 1 1]}%4",
  "{[1 1 1 1]}%4",
];
const oh = [
  "{[0]}%4",
  "{[0 0 1 0]}%4",
  "{[0 0 1 0][0 0 1 1]}%4",
  "{[0 0 1 1][0 0 1 1]}%4",
];

const bdslide = slider(13, 0, 21, 1).div(22);
const sdslide = slider(0.22077, 0, 0.99);
const hhslide = slider(0.65835, 0, 0.99);
const ohslide = slider(0.99, 0, 0.99);

const drums = stack(
  "48"
    .note()
    .struct(chooseInWith(bdslide.sometimes(add(0.1)), footwork))
    .sound("bd:35")
    .degradeBy(0.1),
  "48".note().struct(chooseInWith(sdslide, footworksnare)).sound("sd:17"),
  "48".note().struct(chooseInWith(hhslide, hh)).sound("hh:2").cut(12).fast(1),
  "48"
    .note()
    .struct(chooseInWith(ohslide, oh))
    .sound("hh:19")
    .late(0.001)
    .cut(12)
);

const arp = n("{0 1 2 3 4 5 6 7}%16")
  // .chunk(4, x=>x.add(2))
  .chord("<Cm7 Am7  G^7 Gm7>")
  .voicing()
  .every(3, rev)
  .adsr([0, 0.1, 0.2, 0.1])
  .delay("0.40:0.22:.2");


stack(drums, arp, 
      
      // midicmd("clock*48*2").midi("tout")
     ).cpm(140 / 4);


// sad machine
const melody = `
  {eb@2.5 eb@2.5 eb@2.5 bb g bb@0.8 g f}!3
  {eb@3 eb@3 eb@3 bb c4 g@2 g f}
  `
      .add(-48)
      .scale("E:major")
      .note()
      .sound("z_tan")
  .slow(10)

stack(melody )
  // .cpm(140 / 4);

// ---

await samples('github:daslyfe/lcassets');

setCps(124 / 60 / 4);

const oil = n("{1}%16".add("<1 2@3>"))
  .begin(tri.slow(4).range(1, 0.1))
  .sometimes((x) => x.ply("[2 | 4]"))
  .sound("oil")
  .pan(sine.fast("<1 .5 2 4>"))
  .release(0)
  .clip(1)
  .gain(0.8).room(0.5);

const drums = stack(
  sound("jbd:7").struct("{1}%4").almostNever(ply(2)),
  sound("{jch jch joh:2 jch}%16").struct("{1}%16"),
  sound("jcp:3").struct("{0 1}%4")
).gain(0.8);

const mel = note("{0 2 ~ 3 5 4}%16".add("{ 0 2 4 0 3}%8").scale('g pentatonic'))
  .sometimes(ply(2))
  .release(0.4)
  .sound("{[sawtooth | gm_koto | gm_electric_guitar_jazz]}%16")
  .pan(tri.fast(4))
  // .phaser(0.5);

const bass = note("<e2 [g1 | g2] a1 c2>/4")
  .sound("gm_synth_brass_1, sawtooth")
  .struct("{1}%16")
  .clip(1)
  .gain(1.5);

stack(oil, drums, mel, bass);

// ---

const arp = n("{0 1 2 3 4 5 6 7}%16")
  .chord("<D#m7 Bm7 C#m7 Am7 Gm7>")
  .voicing()
  .sound("gm_lead_2_sawtooth, gm_lead_3_calliope")
  .lpf(300).lpenv(tri.range(0, 10).fast(8)).lpsustain(0.1).lpdecay(0.05)
  .jux(rev)
  .adsr([0, 0.1, 0.5, 0.2])
  .delay("0.40:0.12:.25")
  .postgain(0.6)

// ---

const something = "{1 2 1 3 <[1 2] ~ 4!2>}".scale("c3:minor")
  .note()
  .add(note("0, .5"))
  .s('square').gain(.8)
  .cutoff(perlin.range(400, 2000))
  .decay(perlin.range(0.5, .2))
  .sustain(0.4)
  .delay(.3)
  .room(1.4).size(5)
  .scope()

  // ---

  const sas = register('sas', (mapping, pat) => {
  mapping = Array.isArray(mapping) ? mapping : [mapping]
  return pat.fmap((v) => {
    v = Array.isArray(v) ? v : [v];
    v = Object.fromEntries(mapping.map((prop, i) => [prop, v[i]]));
    return v;
  });
})