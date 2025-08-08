let cc = await midin('Midi Fighter Twister')

setCps(120 / 60 / 4);

mel: sound("stab").note("{d2!3 <c2 d#2>}")
  .struct("{[1 ~][1 1]}%8")
  .lpf(cc(6).range(0, 1200))
  .dist(.5)
  .crush(10)
  .clip(.8)
  ._scope()

bass: sound("kick")
  .note("{c2 d#2}/4")
  .struct("{[1]}%4")
  .lpf(cc(7).range(0, 2000))
  .dist(.5)
  .postgain(.5)
  .clip(1)