/*
  @title   Array (Lil Data Edit)
  @by      DJ_Dave
  @album   Intercell [The Live Code Edits]
  @license CC BY-NC-SA (code)
  @url     https://instagram.com/lildata.music
*/

// load sample pack...
samples({
  build_bass:  ['snd/bass/build_0.mp3', 'snd/bass/build_1.mp3', 'snd/bass/build_2.mp3', 'snd/bass/build_3.mp3'],
  build_synth: ['snd/synth/build_0.mp3','snd/synth/build_1.mp3','snd/synth/build_2.mp3','snd/synth/build_3.mp3'],
  build_vox:   ['snd/vox/build_0.mp3',  'snd/vox/build_1.mp3',  'snd/vox/build_2.mp3',  'snd/vox/build_3.mp3'],
  drop_vox:    ['snd/vox/drop_0.mp3',   'snd/vox/drop_1.mp3',   'snd/vox/drop_2.mp3',   'snd/vox/drop_3.mp3',
                'snd/vox/drop_4.mp3',   'snd/vox/drop_5.mp3',   'snd/vox/drop_6.mp3',   'snd/vox/drop_7.mp3',
                'snd/vox/drop_8.mp3'],
  verse_vox:   ['snd/vox/verse_0.mp3',  'snd/vox/verse_1.mp3',  'snd/vox/verse_2.mp3',  'snd/vox/verse_3.mp3',
                'snd/vox/verse_4.mp3',  'snd/vox/verse_5.mp3',  'snd/vox/verse_6.mp3',  'snd/vox/verse_7.mp3',
                'snd/vox/verse_8.mp3'],
  sub:    ['snd/bass/sub_0.mp3',  'snd/bass/sub_1.mp3',  'snd/bass/sub_2.mp3'],
  bass:   ['snd/bass/bass_0.mp3', 'snd/bass/bass_1.mp3', 'snd/bass/bass_2.mp3'],
  kick:    'snd/perc/kick.mp3',
  sn:      'snd/perc/sn.mp3',
  cp:     ['snd/perc/cp.mp3', 'snd/perc/cp2.mp3'],
  tom:     'snd/perc/tom.mp3',
  hc:      'snd/perc/hc.mp3',
  shaker:  'snd/perc/shaker.mp3',
  break:   'snd/perc/break.mp3',
  guitar: ['snd/perc/guit1.mp3', 'snd/perc/guit2.mp3'],
}, 'github:lil-data/dj_dave-array_remix/main/');

// hack: https://github.com/tidalcycles/strudel/issues/119
const loopAx = register('loopAx', 
  (l, pat) => pat.loopAt(l).chop(l*8).legato(1).mul(speed(0.99))
);
const setbpm = t => setcps(t/4/60)

setbpm(140)

/*
  So I try...
*/
let build = stack(
  n("<0 1 2 3>").s("bass").bank("build").loopAx(4),
  n("<0 1 2 3>").s("synth").bank("build").loopAx(4),
  n("<0 1 2 3>").s("vox").bank("build").loopAx(4),
)

let predrop = n("0").s("vox").bank("drop").loopAx(2)

/*
  I swear to god I always thought in the end I’d get you back
  Now every day I see your face you give me a heart attack
*/
let drop = stack(
  n(run(8).add(1).slow(8)).s("vox").bank("drop").loopAx(2)
    .mask(cat([
      "1!6 0!2",         "1!3 0 1!2 0 1",
      "1!6 0!2",         "1",
      "0 1!2 0 1!2 0 1", "1",
      "0 1 0 1 0 1 0!2", "1!7 0"
    ]).slow(16)),
  stack(
    stack(
      s("sub(5,16)").end(0.95).mask("[0 1]/8"),
      s("kick(5,16)"),
      s("cp(5,16)").late(3/32),
      s("tom(5,16)").end(0.95).late(4/32)
    ).slow(2)
    .note("[0 1]/4".add(36))
    .mask(cat([
      "[1 [1 0!7]]",
      "[1 [1 0] 0 1 [1 0] 0 1!2]",
      "[1 [1 0]]",
      "[1 [1 0] 0 1 [1 0] 0!3]", 
    ]).slow(8))),
  stack(
    s("guitar").n("[0 1]/8").loopAx(0.5)
      .mask("0!3 1 0!11 1".slow(8)),
    s("break").loopAx(0.5).mask("0!15 1".slow(8)),
    s("hc*4").ply(cat([
      "[~!6 2!7 ~!3]",
      "[[9 ~] [6 ~]] 3 3 2",
      "2 3 [[6 ~] [9 ~]] ~",
      "[2 3] ~!3"
    ]).slow(8))).mask("[1 0]/16"),
  stack(
    s("shaker").loopAx(2),
    s("break").loopAx(0.5).mask("[0!3 [0 1]] [0 [0 1] 0!2]".slow(8)),
    s("cp:1").struct("[~!7 x] ~".slow(4)).gain(0.6),
    s("sn").struct(cat([
      "~ x ~ [~ x] [~!15 x] [x ~ ~ x] [~ x ~ x] x",
      "~ x ~ [~*2 x*2]!2 [~ x ~ ~] ~ [~*2 x*2]",
      "~ x ~ [~ x] [~!15 x] x ~ ~",
      "~ x ~ [~*2 x*2]!2 ~!3",
    ]).slow(8))
  ).mask("[0 1]/16"),
)

/*
  Where’d you go?
  I saw your face and moments later I was on the floor 
  (I swear to god I always thought in the end I’d get you back)
  Putting the pieces together but still you needed more
  It’s still so hard to see you cry I just want answers for
  What else I could possibly give you now it’s all for show
  Where’d you go?
  Pieces together but still you
  On the floor / needed more
  Hard to see you cry I just want
  Answers for / wherе’d you go?
  Face and moments later I was
  On thе floor, where’d you go? Where’d you go? Where’d you go?
*/
let verse = stack(
  n(run(8).slow(8)).s("vox").bank("verse").loopAx(2),
  s("bass:[0 0 [0 1] [1 2]]/8, sub:[1 2]/8")
    .note(cat([
      "[0!7 7] [1!3 5] [0!7 12] [7 4 5 [5 12]]",
      "[0 [0 .. 7]] [1!3 5] [0!7 12] [7 4 5 [5 2]]"
    ]).slow(8)).add(36)
    .struct(cat([
      "x@3!5 x x@3!5 x",
      "x@3!5 x x@3!5 x", 
      "[[x@3 x@3 x@2] [x*8]] [x@3!5 x]",
      "x@3!5 x x@3!5 x",
    ]).slow(8))
    .mask(cat(["1","1","1 0 0 [0 1]","1","1","1","1","1"]).slow(8))
    .slow(2)
)

let postverse = stack(
  n("[8 ~]/2").s("vox").bank("verse").loopAx(2),
  n("[~ 0]/2").s("vox").bank("drop").loopAx(2),
  s("bass:2, sub:2").note("[2 5]").add(36)
    .struct("[~@2 x@3!10]")
    .mask("[1!7 0]")
    .slow(4)
)

arrange(
  [16, build],
  [2, predrop],
  [16, drop],
  [16, verse],
  [4, postverse]
).fontFamily("x3270")
  .theme("[teletext algoboy terminal abcdef androidstudio atomone aura bespin darcula dracula duotoneDark eclipse githubDark gruvboxDark materialDark nord okaidia solarizedDark sublime tokyoNight tokyoNightStorm vscodeDark xcodeDark bbedit duotoneLight githubLight gruvboxLight materialLight noctisLilac solarizedLight tokyoNightDay xcodeLight]/54")
  .color("[fuschia [aquamarine dodgerblue] [hotpink] blueviolet deeppink [cornsilk indigo] crimson cyan]/27")
  .punchcard({fold:1,flipTime:1,vertical:1})

/*
▓▓█▓▓█▓█▓▓▓▓▓▓▓▓████▓▓▓█▓█▓▓▓▓▓▓▓▓▓▒▓▒▒▒▒▓███████▓▓▓▓▓▓▓▓▓▒▒▒▒▒▒▓▓▓▓▓▓▓▓▓▒▓▒▒▒▒░░░░░░░░░░░
▓▓▓▓██▓█▓▓▓▓▓▓▓▓███▓▓▓▓▓▓█▓▓▓▓▓▓▓▓▒▒▓▒▒░▒▓████████▓▓▓▓▓▒▒▓▒▒▒▒▒▒▒▒▓▓▓▓▓▓▓▒▓▓▒▒▒▒░░░░░░░░░░
▓▓▓██▓██▓▓▓▓▓▓████▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒▒▒░░▓██████████████▓▓▓▓▒▒▒▒▒▒▓▓▓▓▓▓▓▓▒▓▓▓▒▒▒░░░░░░░░░░
▓▓█▓▓██▓▓▓▓▓▓▓█▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒▒▓▒▒░▒▓█████████████████▓▓▓▓▒▒▓▓▓▓▓▓▓▓▓▒▓▓▓▓▒▒▒▒░░░░░░░░
▓█▓▓██▓▓▓▓▓▓▓██▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒▒▓▒░░▒████████████████▓▓███▓▓▓▓▓▓▓▓▓▓▓▓▒▓▓▓▓▓▓▒▒▒▒░░░░░░
█▓▓██▓▓▓▓▓▒▓███▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒▒▒▒░░░▒████████████████▓▓▓▓██▓▒▒▓▓▓▓▓▓█▓░▓█▓▓▓▓▓▒▒▒▒░░░░░
█▓██▓▓▓▓▓▓▓███▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒▒▒▒▒░░▒███████████████▓▓▓▓▓▒▒▒▓▓▒▓▓▓▓▓▓█▓▒▓██▓▓▓▓▒▒▒▒░░░░░
███▓▓▓▓▓▓▓▓▓█▓▓▓▒▓▓▓▓▓▓▓▓▓▓▓▒▒▒▒▒▒▒░░░▒█████████████▓▓▓▓▒▒▒▒▒░▒▓▓▒▓▓▓▓██▒▒████▓▓▓▓▒▒▒░░░░░
███▓▓▓▓▓▓▓▓▓▓▓▓▒▒▓▓▓▓▓▓▓▓▓▓▒▒▒▒▒▒▒░░░░▓███████████▓▓▓▓▓▓▓▓▓▓▒▒▒▓▓▓▓▓████▒▓████▓▓▓▓▒▒▒░░░░░
█▓▓▓▓▓▓█▓▓▓▓▓▓▒▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒▒▒▒░░░░▒▓█▓███████████▓▓▓▓▓▓▓▒▒░▒▓█▓▓▓███▓▒▓████▓▓▓▓▓▒▒░░░░░
█▓▓▓▓███▓▓▓▓▒▒▒▓▓▓▓▓▓▓▓▓▒▓▓▒▒▒▒▒▒░░░░▒▓▓▓▓██████▓▓██▓▓▓▓▓▒▒▒▒▒▒▓▓█▓▓███▓▒█████▓▓▓▓▓▒▒░░░░░
██▓▓████▓▓▓▒▒▒▓▓▓▓▓▓▓▓▓▓▒▒▒▒▒▒▒▒░░░░░▓▓▓▓▓▓▓▓▓██▓▓▓█▓▓▓▓▓▒▒▒▒▒░▒▒▓▓▓▓▓▓▒▒██████▓▓▓▓▓▒▒░░░░
█▓██████▓▓▒▒▒▓▓▓▓▓▓▓▓▓▓▒▒▒▒▒▒▒▒▒░░░░▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒▒▒▒▒▒▓█▓▓▓▒▓▓█████▓▓▓▓▓▓▒▒░░░
███████▓▓▒▒▒▓▓▓▓▓▓▓▓▓▓▒▒▒▓▒▒▒▒▒░░░▒▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒▒▒▒▒▒▒▒▓▓▓▓▒▓▓▓█▓▓▓▓▓▓▓▓▓▓▒▒░░
██████▓▓▒▒▓▓▓▓▓▓▓▓▓▓▓▓▒▒▓▓▒▒▒▒▒░░▒▒▒▒▓▓▓▓▓▓▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓▓▓▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒░
█████▓▓▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▓▓▒▒▒▒▒░▒▒▒▒▓▓▓▓▓▓▓▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓▓▓▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒
█████▓▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▓▓▓▒▒▒▒░░▒▒▒▒▓▓▓▓▓▓▓▓▓▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓▓▓▓▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
████▓▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒▒▒▒▒▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓▓▓▓▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
███▓▒▒▓▓▓▓▓▓▓▓▒▓▓▓▓▓▓▓▓▓▒▒▒▒▒▒▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓▓▓▒▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
██▓▒▒▓▓▓▓▓▓▓▓▓▒▒▓▓▓▓▒▓▓▒▒▒▒▒▒▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓▓▒▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
██▓▒▒▓▓▓▓▓▓▓▓▓▓▒▒▓▓▓▓▓▒▓▒▒▒▒▓▓▓▓▓█▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓▓▒▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
█▓▒▒▓▓▓▓▓▓▓▓▓▓▓▒▒▓▓▓▒▒▓▒▒▒▓▓▓▓▓▓█████▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒▒▒▒▒▒▒▒▒▒▓▓▒▒▒▓▓▓█████▓▓▓▓▓▓▓▓▓▓
▓▓▒▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒▓▒▒▒▒▓▓▓▓▓▓▓████████▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒▒▒▒▒▒▒▓▓▒▒▒▓██████▓▓▓▓▓▓▓▓▓▓▓
▓▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒▓▓▒▒▓▓█▓▓▓▓▓███████████▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒▒▒▓▓▓▒▒▒▓████▓▓▓▓▓▓▓▓▓████
▓▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒▒▓▓▓▓▓▓▓▓▓▓▓█████████████▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▓▓▓▓▓▓▒▒▓████▓▓▓▓▓▓▓▓█████
▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒▓▓▓▓▓██▓▓▓▓▓███████████████▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▓█████████████████
▒▒▓▓▓▓▓▓▓▓▓▓▓▓▒▓▓▓▓▒▒▓▓▓▓██▓▓▓▓▓████████████████▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▓█████████████████
▒▓▓▓▓▓▓▓▓▓▓▓▓▒▓▓▓▓▓▓▓▒▓▓▓▓█▓▓▓▓▓▓████████████████▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▓▓▓▓▓▓▓▓█████████████████
▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓███▓▓▓▓▓▓███▓▓▓▓▓████████████████▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒▓▓▓▓▒▒█████████████████
▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓█████▓▓▓▓▓▓██▓▓▓▓▓██████████████▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒▒▓▓▓▒▒▓████████████████
▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓██████▓▓▓▓▓▓█▓▓▓██▓████▓▓██████▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒▒▓▓▓▒▒▒▓███████████████
▒▓▓▓▓▓▓▓▓▓▓▓▓█▓████████▓▓▓▓▓▓▓▓▓▓███████▓▓██████▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒▓▓▓▓▓▓███████▓▓█
▓▓▓▓▓▓▓▓▓▓▓▓██▓█████████▓▓▓▓▓█▓▓▓████████▓▓██████▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒
▒▓▓▓▓▓▓▓▓▓███████████████▓▓▒▓▓▓▓▓█████████▓▓█████▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒▒▓▓▓▓▓▓▓▓▓▒▒▒░░
▒▓▓▓▓▓▓▓▓█████████████████▓▓▒▓▓▓▓▓████████▓▓█████▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒▓▓▓▓▓▓▓▓▒▒▒▒░░
▒▓▓▓▓▒▓▓███████████████████▓▓▓▓▓▓▓█████████▓▓█████▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒▓▓▓▓▓▓▓▓▒▒▒▒░
▒▓▓▓▓▓▓█████████████████████▓▓▒▓▓▓▓▓███████▓▓████▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒░▒▓▓▓▓▓▓▓▓▒▒▒▒
▒▓▓▓▒▓██████▓████████████████▓▓▒▒▓▓▓███████▓▓██████▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒▒▓▓▓▓▓▓▒▒▒▒▓
▒▓▓▒▓▓████████████████████████▓▓▒▒▓▓███████▓██████████▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▓▓▓▓▓▓▓▓▓▓▓▓
▒▒▓▓▓██████████████████████████▓▓▒▒▓▓██████▓▓██████████▓▓▓▓▓▓▓▓▓▓▓▓▓████████▒▓█▓▓▓██████▓▓
▒▒▓▓▓███████████████████████████▓▓▒▒▓▓████████████████▓▓▓▓▓▓▓▓▓▓▓▓██████████▓▓███▓▓███████
▒▒▓▓█████████████████████████████▓▓▒▒▓▓▓███████████████▓▓▓▓▓▓▓▓▓▓████████████▒▓████▓▓▓▓▓▓▓
▒▒▒▓█████████████████████████████▓▓▓▒▒▓▓▓▓██████████████▓▓▓▓▓▓▓▓▓▓▓▓▓▓███▓▓▓▓▒▒▓▓▓▓▒▓▒▒▓▓▓
▒▒▒▓████████████████████████████▓▓▓▓▓▒▒▓▓▓▓████████████▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▓▓▓▓▒▒▒▒▒░▒
*/
