const trs = .4
n = 3
a = () => shape(3, 0.5, 0.09)
    .rotate(() => time * 2)
    .repeat([2, 1].smooth()
        .fast(trs), [2, 1].smooth()
        .fast(trs))
a()
    .add(a()
        .scrollX(0.5 / n)
        .scrollY(0.5 / n), 1)
    .modulate(o1, 0.5)
    .modulate(src(o1)
        .color(10, 10)
        .add(solid(-14, -14))
        .rotate(() => time * 2), 0.005)
    .add(src(o1)
        .scrollY(0.012, 0.02), .5)
    //     	.invert()
    .out(o1)

src(o1)
    .colorama(1.2)
    .posterize(4)
    .saturate(0.7)
    .contrast(6)
    .mult(solid(), 0.15)
    .add(o3, .5)
    .out(o2)

osc(0.5, 1.25)
    .mult(shape(1, 0.09)
        .rotate(1.5))
    .diff(gradient())
    .add(shape(2, 2)
        .blend(gradient(1)))
    .colorama(1)
    .modulate(noise()
        .modulate(noise()
            .scrollY(1, 0.0625)))
    .blend(o3)
    .color(1, -0.5, -0.75)
    .out(o3)

s2.initVideo("http://localhost:8080/video/flwrs/flwrs")

src(s2)
    //     .scrollX(.5, .05)
    //     .scrollY(.5, .025)
    //     .pixelate(256, 256)
    //     .luma([0.05, .45].smooth().fast(4))
    //     .thresh([0, 0.5].smooth().fast(1))
    //     .posterize(1.3)
    //     .mult(o2, .8)
    //     .add(o3, [.2, .8].smooth().fast(1))
    .out()