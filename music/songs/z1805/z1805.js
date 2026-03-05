setCpm(140 / 4)

const colors = {
  drums: "#e500a4",
  kick: "white",
  perc: "#7209b7",
  bass: "#e63946",
  synth: "#4361ee",
  riser: "#06c9c6",
  fx: "#3BC14A",
  vox1: "#78BC61",
  vox2: "#2541B2",
  vox3: "#D57A66",
  tran: "#7B4B94"
};

const kick = sound("kick!4")
  .lpf(slider(900, 0, 900))
  .duck("1:2:3:4:bass:6").duckattack(.2).duckdepth(.8)
  .velocity(perlin.range(.9, 1.1).slow(2))
  .color(colors.kick)._punchcard()

const percloop1 = sound("loop:1")
  .scrub("0".seg("1".sometimesBy(.1, add("3"))))
  .lpf(slider(3000, 400, 3000))
  .color(colors.perc)._punchcard()


const riser = s("pulse!16")
  .dec(.1).o(3)
  .color(colors.riser)._punchcard()

const vox = s("vox:1")
  .scrub(saw.seg(8))
  .chop(32)
  .loopAt(16)
  .diode("2:.4")
  .orbit(6)
  .duck("10").duckattack(.6).duckdepth(.3)
  .delay(.25)
  .note("c5".trans("{-1 0 3}/4"))
  .color(colors.vox1)._scope()

const bass = n(irand(10).seg(4).add("<0 _ _ 4 _ _ 1 _>"))
  .rib(13, 4)
  .s("supersaw")
  .postgain(slider(0.54))
  .orbit(5)
  .color(colors.bass)._punchcard()

const synth = s("synth:2")
  .scrub(saw.slow(1).seg(16))
  .lpf(slider(8000, 0, 8000))
  .dist("1:.5")
  .note("{c2!3 d#2!2 f2!3 d2}/2")
  .clip(1)
  .color(colors.synth)._punchcard()

const fx = s("fx:3")
  .scrub("0.1:1.5".seg(2))
  .crush(6)
  .delay(.1)
  .color(colors.fx)._punchcard()

const vox2 = s("vox:3").scrub("0:1.1".seg(1 / 2))
  .hpf(500)
  .compressor("-6:2:10:.002:.02")
  .crush(10)
  .room(.1)
  .delay(.2)
  .note("c2")
  .color(colors.vox2)._punchcard()

const vox3 = s("vox:4").scrub("0:1".seg(1 / 6))
  .hpf(200)
  .compressor("-6:2:10:.002:.02")
  .dist("2:.25")
  .room(.1)
  .delay(.2)
  .note("c2".add(3))
  .color(colors.vox3)._punchcard()

const tran = s("snare:1")
  .scrub("{[0.3:.5 0.35:.75]}".seg(8))
  .lpf("400")
  .postgain(.25)
  .lpf(800)
  .color(colors.tran)._punchcard()

const part1 = stack(
  kick,
  percloop1,
)

const part2 = stack(
  kick,
  percloop1,
  bass.lpf(1400)
)

const part3 = stack(
  kick,
  bass.lpf("{<800 900 1200 800>}/2"),
  percloop1,
  synth.lpf(400) // init @ 400
)

const part4 = stack(
  synth.lpf(saw.range(600, 8000).rev().slow(4))
)

const part5 = stack(
  synth.lpf(600),
  vox2,
)

const part6 = stack(
  kick,
  percloop1.scrub("0".seg("4")),
  bass.lpf(400),
  synth
)

const part7 = stack(
  bass.lpf(400),
  synth,
  vox.lpf(saw.range(600, 3000).slow(8)),
)

const riserFm = saw.range(0, 10).slow(8)

const part8 = stack(
  bass.lpf(400),
  synth.lpf(1400),
  riser.fm(riserFm).fmh(riserFm).gain(.25),
  vox.postgain(.4),
)

const part9 = stack(
  bass.lpf(400),
  synth.lpf(2000),
  riser.fm(riserFm).fmh(riserFm).gain(.25),
  vox
    .scrub(saw.seg(8).fast("{<1 2 1 4 8 16>}"))
    .note("<c5>".trans(-1)).hpf(400)
    .delay(.1)
    .postgain(.5)
)

const part10 = stack(
  vox.scrub(saw.seg(8).fast(16)).note("c5".trans("{-1 0 3}/6")).postgain(.5),
  vox3,
  bass.lpf(800),
  riser.fm(7).fmh(3).gain(.15),
)

const part11 = stack(
  kick,
  bass.lpf(berlin.range(400, 3000).fast(4)),
  vox.scrub(saw.seg(8).fast(16)).note("c5".trans("{-1 0 3}")).postgain(.5),
  percloop1.scrub("0".seg("4"))
)

const part12 = stack(
  kick,
  bass.bpf(berlin.range(600, 1000).fast(4)).postgain(.5),
  tran,
)

const length = 4;

arrange(
  [8 * length / 2, part1], // 8*2
  [1 / 2, fx],
  [8 * length, part2], // 8*2
  [8 * length, part3], // 8*2
  [4, part4], // 8
  [2, part5],
  [8 * length, part6], //8*2
  [8, part7], // 8
  [8, part8], // 4
  [6, part9],
  [6, part10],
  [8 * length, part11], // 8*4
  [8 * length, part12], // 8*2
).pianoroll()
