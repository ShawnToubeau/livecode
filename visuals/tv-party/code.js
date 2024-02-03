/***********
	TV Party
***********/

// s1.initVideo("http://localhost:8080/video/tv-no-bg") 
// src(s1)
// 	.repeat(
//   		5, // x
//   		3, // y
//   		({time}) => Math.cos(time), // x-offset
//   		({time}) => Math.sin(time/2) // y-offset
// 	)
//     .colorama([.1,.2,.3,.4,.5].smooth().fast(5))
//     .modulatePixelate(noise(25,0.5),1000)
// 	.modulateScale(
//   		osc(1,-.5,0).kaleid(50).scale(.5), // color
//   		15, // multiple
//   		0 // offset
// 	)
//   	.rotate( 
//   		({time}) => Math.sin(time), // angle
//   		({time}) => Math.sin(time*0.1)*0.0005 // speed
// 	)
//   	.layer(
//   		osc(
//           12, // freq
//           1, // sync
//           [1,2,3,4,5].smooth().fast(.51) // offset
//         )
//   			.add(noise(50))
//   			.pixelate(5,5) // pixel-x, pixel-y 
//   			.mask(s0)
//   			.repeat(2,2)
//   			.scale(1.2)
// 	)
//   	.modulateRotate(osc(), .1)
//   	.out()