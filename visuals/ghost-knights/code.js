s2.initVideo("http://localhost:8080/video/ghost-knights/dancing-knight-no-bg")

n = 3
a = () => shape(3, 0.25, 0.009)
	.rotate(() => time / -40)
	.repeat(n, n)
a()
	.add(a()
		.scrollX(0.5 / n)
		.scrollY(0.5 / n), 1)
	.modulate(o1, 0.5)
	.modulate(src(o1)
		.color(10, 10)
		.add(solid(-14, -14))
		.rotate(() => time / 40), 0.005)
	.add(src(o1)
		.scrollY(0.012, 0.02), 0.5)
	.out(o1)
src(o1)
	.colorama(1.2)
	.posterize(4)
	.saturate(0.7)
	.contrast(6)
	.mult(solid(), 0.15)
	.out(o2)

src(s2)
	.repeat(4, 4,
		({
			 time
		 }) => Math.sin(time * 2) - Math.PI, ({
												  time
											  }) => Math.cos(time * 2) - Math.PI
	)
	.color(
		[0.5, .8].smooth(),
		[0, .4, .1].smooth(),
		[0, .2, .8, .4].smooth()
	)
	.modulateScale(noise([1, 2, 3, 4, 6].smooth()), -.7, .7)
	// 		.kaleid(4)
	.add(o0, [.4, .5].smooth())
	.add(o2, .3) // bg texture
	// 		.invert()
	.scale(({
				time
			}) => Math.sin(time / 5) + 1.5, .5)
	// 		.pixelate(50, 500) // increase scale speed descrease intensity ^
	// 		.modulateScrollY(osc(1), .1, ({
	// 			time
	// 		}) => Math.sin(time / 8000))
	.out()