dootdoot: note("{c2 [ab1 c2] <f1 eb1> ~}%8") 
  .s("sbd:6")
  .lpf("{800 600 400}/4")
  .lpenv("500")
  .clip(1)

boss_battle: note("{c2 d2 <eb2 cb2>}") // "{<c2!4 d2!4>}"
  .s("sstab")
  .loopAt(.5)
  // .loop(.75)
  // .loopEnd("<.5 .25>")
  .lpf("{1000 600}/4") // "{600 2000}/4"
  .lpa("{.5 .25}/2")
  // .lpenv("<2 1 -1 -2>/4") // "<4 2 1 -1 -2 -4>/4"
  .attack(.05)
  .fast(2)
  .clip(1)
  ._scope()

  powerline_3k_kick: s("sbd:5")
  .struct("{1 [1 1] 0 [1, 1]}%8")
  .lpf(1800)
  .dist("1:.5")
  .gain(1.5)
  .velocity(perlin.range(1.25, 1.5))

gabber_kick: s("sbd:3")
  .struct("{[1 ~ 1 ~] [1 ~ 1 1]}%4") 
  .lpf(1200)
  .sustain(.8)
  .gain(1.5)
  .clip(1)
  .velocity("{1.3 1.4 1.5 1.6}")