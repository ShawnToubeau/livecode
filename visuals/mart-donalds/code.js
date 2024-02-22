/***************
 Mart Donalds
 ***************/

const k = 3
const d = Math.PI / k
const modScrollSpeed = .1

s0.initVideo("http://localhost:8080/video/mart-donalds/mart-donalds")

src(s0)
	.modulate(noise(6)
		.pixelate(5, 5)
		.rotate(
			({
				 time
			 }) => Math.sin(time * 2)
		)
		.scrollY([0, 5].smooth()
			.fast(modScrollSpeed))
		.scrollX([5, 0].smooth()
			.fast(modScrollSpeed))
	)
	// 			.scrollY(d / 2)
	// 		.scrollX(d / 2)
	.scale([1, .75].smooth()
		.fast(.5))
	.rotate(({
				 time
			 }) => Math.sin(time) / 5)
	// 		.kaleid(k)
	// 			.rotate(0, ({
	// 				time
	// 			}) => Math.sin(time / 10) / 100)
	// 			.modulateScale(osc(), 1, 2)
	// 			.mult(gradient(0))
	.colorama([.1, 1].smooth()
		.fast(.3)
	)
	.out()