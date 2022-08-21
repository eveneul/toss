$(function () {
	// 헤더 스크롤

	// $(window).scroll(function (e) {
	// 	let scrollVal = $(this).scrollTop();
	// 	console.log(scrollVal);

	// 	if (scrollVal <= 10) {
	// 		gsap.to('.header', {
	// 			'background-color': 'transparent',
	// 		});
	// 	} else {
	// 		gsap.to('.header', {
	// 			yPercent: -100,
	// 		});
	// 	}
	// });

	const headerAni = gsap
		.from('.header', {
			yPercent: -100,
			paused: true,
			duration: 0.4,
		})
		.progress(1);

	ScrollTrigger.create({
		start: 'top top',
		end: 99999,
		onUpdate: (self) => {
			self.direction === -1 ? headerAni.play() : headerAni.reverse();
		},
	});

	$(window).scroll(function (e) {
		let scrollVal = $(this).scrollTop();

		if (scrollVal <= 10) {
			gsap.to('.header', {
				'background-color': 'rgba(255,255,255, 0)',
				'backdrop-filter': 'none',
				'border-bottom': 'none',
			});
		} else {
			gsap.to('.header', {
				'background-color': 'rgba(255,255,255, 0.9)',
				'backdrop-filter': 'blur(10px)',

				'border-bottom': '1px solid #e5e8ea',
			});
		}
	});

	// 메인 동영상 재생 2.5초 후 텍스트 올라오게

	gsap.set('.sc-visual .content-area', {
		opacity: 0,
		y: 100,
	});

	setTimeout(() => {
		gsap.to('.sc-visual .content-area', {
			duration: 2,
			y: 0,
			opacity: 1,
		});
	}, 2800);

	// Info 텍스트 한 줄씩 올라오게

	const infoText = $('.sc-info .sc-title p');

	infoText.each((idx, el) => {
		gsap.from(el, {
			opacity: 0,
			y: 20,
			scrollTrigger: {
				trigger: el,
				start: 'top center',
				end: '+=100',
			},
		});
	});

	// about 텍스트 한줄씩 올라오고 (스크롤), 카운트

	function numCount() {
		$('.about-item .item-num span').each(function () {
			$(this)
				.prop('Counter', 0)
				.animate(
					{ Counter: $(this).text() },
					{
						duration: 3000,
						easing: 'swing',
						step: function (now) {
							$(this).text(Math.ceil(now));
						},
					}
				);
		});
	}

	$('.about-item').each((idx, el) => {
		gsap.from(el, {
			opacity: 0,
			y: 50,
			scrollTrigger: {
				trigger: el,
				start: 'top center',
				end: '+=100',
				// markers: true,
			},
			// onEnter: () => {
			// 	const num = $(this).find('.item-num span');
			// 	console.log(num);
			// 	num.prop('Counter', 0).animate(
			// 		{ Counter: num.text() },
			// 		{
			// 			duration: 3000,
			// 			easing: 'swing',
			// 			step: function (now) {
			// 				$(this).text(Math.ceil(now));
			// 			},
			// 		}
			// 	);
			// },
		});
	});

	// 서비스 각 섹션별 텍스트 위로 올라오게

	// 투자

	gsap.to('.investment .ico-box', {
		xPercent: -500,
		scrollTrigger: {
			trigger: '.investment',
			start: 'center center',
			end: 'bottom center',
			scrub: 1,
		},
	});

	//

	let visionArr = gsap.utils.toArray('.vision-item');

	// gsap.to('.vision-list', {
	// 	xPercent: -85,
	// });

	// gsap.to(visionArr, {
	// 	xPercent: -50 * (visionArr.length - 1),
	// 	ease: 'none',
	// 	scrollTrigger: {
	// 		trigger: '.vision-list',
	// 		pin: true,
	// 		scrub: 1,
	// 		snap: 1 / (visionArr.length - 1),
	// 		// base vertical scrolling on how wide the container is so it feels more natural.
	// 		end: 'bottom top',
	// 	},
	// });

	// 무한 롤링 배너 (배너 클론으로 복사)

	$('.investor-list').clone().appendTo('.sc-investor .rolling-area');

	// 탭 매뉴

	const btns = $('.loan .sub-title-area span');
	const imgs = $('.loan .screen-img img');
	btns.click(function (e) {
		const tabId = $(this).data('tab');

		btns.removeClass('active');
		$(this).addClass('active');
		imgs.removeClass('active');
		$('#' + tabId).addClass('active');
	});

	// 투자자 캔버스

	const canvas = document.querySelector('canvas');
	const ctx = canvas.getContext('2d');

	canvas.width = 1200;
	canvas.height = 675;

	const frameCount = 100;

	const currentFrame = (idx) => {
		return `asset/images/capture/capture${idx.toString()}.jpg`;
	}; // 리턴 필수

	const images = [];
	const card = {
		frame: 0,
	};

	for (let i = 0; i < frameCount; i++) {
		const img = new Image();
		img.src = currentFrame(i + 1);
		images.push(img);
	}

	gsap.to(card, {
		frame: frameCount - 1,
		snap: 'frame',
		ease: 'none',
		scrollTrigger: {
			trigger: '.sc-investor',
			scrub: 0.5,
			start: 'top 90%',
			end: 'bottom center',
		},
		onUpdate: render,
	});

	images[0].onload = render;

	function render() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.drawImage(images[card.frame], 0, 0);
	}

	//

	gsap.to('.sc-about .bg', {
		'scrollTrigger': {
			trigger: '.sc-about',
			start: 'top bottom',
			end: 'center 70%',
			// markers: true,
			scrub: true,
		},
		'width': '100%',
		'border-radius': 0,
	});
});
