setCps(127 / 60 / 4);

const breakNumCycles = 4

_synth: note("<d3 <b2 c3>>")
  .s("supersaw")
  .gain(1.4)
  .room(1.3)
  .delay(".4") // .4 | 1
  .sustain(1.4)
  .release(.2)
  .lpf(600)
  .lpenv(1.5)
  .clip(1)

_hh: sound("hh")
  .bank("RolandTR909")
  .struct("{[0 1 0 1]}%1") 
  .gain(1.2)

_crystal_synth_mel_1: note("c2").s("synth")
  .slice(4 * breakNumCycles, "{6}%4") // "{6}%4" | "{<4 6> 2 6 2}%4"
  .shape(.4)
  .lpf("{<400 600 800 900>}")
  .delay(.3)
  .clip(1)

_crystal_synth_mel_2: note("{~ c3 ~ f3}").s("synth")
  .slice(4 * breakNumCycles, "{3}%4") // "{3}%4" | "{3 2 6 2}%8"
  .shape(.4)
  .lpf(1800)
  .delay(.1)
  .room(1.3)
  .gain(.4)
  .clip(.9)

_dan: sound("kicks").beat("0, 4, 8, 11, 14", 16).clip(1)

_sd: sound("sd:8") // :8, :16
  .bank("RolandTR909")
  .beat("4,12", 16) 
  .gain(1.4)