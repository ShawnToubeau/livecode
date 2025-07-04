// hush()

shape([3, 4, 5].fast(5))
	.repeat(
		5, // x
		3, // y
		({
			 time
		 }) => Math.cos(time), // x-offset
		({
			 time
		 }) => Math.sin(time / 2) // y-offset
	)
	.colorama([.1, .2, .3, .4, .5]
		.fast(5))
	.modulatePixelate(noise(2, 0.5), 1000)
	.modulateScale(
		osc(7, 5, 1)
			.kaleid([2, 3, 4, 5].fast(10))
			.scale([.01, 1].smooth()), // color
		15, // multiple
		0 // offset
	)
	.rotate(
		({
			 time
		 }) => -Math.sin(time), // angle
		({
			 time
		 }) => Math.sin(time * 0.1) * 0.005 // speed
	)
	.modulateRotate(osc(), .1)
	.out()


// hush()

shape([3, 4, 5].fast(5))
	// 	.repeat(
	// 		5, // x
	// 		3, // y
	// 		({
	// 			 time
	// 		 }) => Math.cos(time), // x-offset
	// 		({
	// 			 time
	// 		 }) => Math.sin(time / 2) // y-offset
	// 	)
	// 	.colorama([.1, .2, .3, .4, .5]
	// 		.fast(5))
	// 	.modulatePixelate(noise(2, 0.5), 100)
	.modulateScale(
		osc([1, 10, 20, 15].fast(10), 5, 1)
			// 			.kaleid([2, 3, 4, 5].fast(10))
			.scale([.1]), // color
		15, // multiple
		0 // offset
	)
	// 	.rotate(
	// 		({
	// 			 time
	// 		 }) => -Math.sin(time), // angle
	// 		({
	// 			 time
	// 		 }) => Math.sin(time * 0.1) * 0.005 // speed
	// 	)
	.modulateRotate(noise([3, 12].fast(10)), [.1, .6].smooth().fast(10))
	.out()


// licensed with CC BY-NC-SA 4.0 https://creativecommons.org/licenses/by-nc-sa/4.0/
// ee_1 . EYE IN THE SKY
//example of mask and function modulation
// e_e // @eerie_ear
noise(18, 4)
	//   .colorama()
	.thresh([.5, .1].fast(20))
	//   .posterize(2)
	//   .kaleid(5)
	.mask(
		shape([3, 6].fast(10), 0.25).modulateScale(
			noise(4.5, 0.5)
		)
	)
	.mask(shape(400, 1, 2.125))
	.modulateScale(osc(3, 3, 0.05))
	.mult(osc(20, 0.05, 2.4).kaleid(50), 0.25)
	.scale([.5, 2].fast(15), 0.65, 0.5)
	.modulate(noise(8))
	.saturate(6)
	.posterize(4, 0.2)
	.scale([2, 4].fast(10))
	.out();

