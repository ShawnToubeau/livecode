noise(18, 4)
    .colorama()
    .thresh([.5, .1].fast(20))
    // 	  .posterize(2)
    //   .kaleid(5)
    // 	.mask(
    // 		shape([3, 6].fast(10), 0.25).modulateScale(
    // 			osc(4.5, 0.5)
    // 		)
    // 	)
    // 	.mask(shape([4, 400], 1, 4.125))
    .modulateScale(osc(.3, 3, 0.5))
    .mult(osc(20, 0.05, 2.4)
//           .kaleid(50)
        , 0.25)
    .scale([.5, 1, 2].fast(.15), 0.65, 0.5)
    .modulate(noise(8), .5)
    .saturate(110)
    // 	.posterize(4, 0.2)
    .scale([2, 4].fast(1))
    .out(o1);
shape([3, 4, 5].smooth().fast(12))
    .repeat(
        [1, 3].smooth(), // x
        [3, 1].smooth(), // y
        ({
             time
         }) => Math.cos(time), // x-offset
        ({
             time
         }) => Math.sin(time) // y-offset
    )
    // 		.colorama([.1, .2, .3, .4, .5]
    // 		.fast(5))
    // 		.modulatePixelate(osc(1, 1.5), .10)
    .modulateScale(
        noise([2, 3, 1, 8].fast(1), 10, 1)
            // 						.kaleid([2, 3, 4, 5].fast(10))
            .scale([1]), // color
        9, // multiple
        0 // offset
    )
    .mult(o1)
    // 		.rotate(
    // 			({
    // 				 time
    // 			 }) => -Math.sin(time / 10), // angle
    // 			({
    // 				 time
    // 			 }) => Math.sin(time * 0.1) * 0.05 // speed
    // 		)
    .modulateRotate(noise([3, 12].fast(10)), [.1, .6].smooth().fast(10))
    .out()