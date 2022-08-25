$(function () {
	const mobile = 768;

	// 헤더 스크롤

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

	// 햄버거 매뉴

	$('.m-btn').click(function () {
		$(this).toggleClass('active');
		$('.header').toggleClass('active');
		if ($('.header').hasClass('active')) {
			$('html, body').css({ overflow: 'hidden', height: '100%' });
		} else {
			$('html, body').css({ overflow: 'auto', height: 'auto' });
		}
	});

	// 메인 동영상 재생 2.5초 후 텍스트 올라오게

	gsap.set('.sc-visual .content-area', {
		opacity: 0,
		y: 100,
	});

	if ($(window).width() >= 769) {
		//768px 이상
		setTimeout(() => {
			gsap.to('.sc-visual .content-area', {
				duration: 2,
				y: 0,
				opacity: 1,
			});
		}, 2800);
	} else if ($(window).width() <= mobile) {
		//767 이하
		console.log('767이하?');
		gsap.to('.sc-visual .content-area', {
			duration: 2,
			y: 0,
			opacity: 1,
		});
	}

	//메인 동영상

	if ($(window).width() <= mobile) {
		const video = $('.video-area video');
		video.get(0).pause();
	}
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

	function format_number(x) {
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	}

	$('.about-item .num').each(function (idx, el) {
		const value = {
			val: $(this).text(),
		};

		const numEffect = gsap.timeline({
			scrollTrigger: {
				trigger: el,
				start: 'top 80%',
				end: '+=100',
			},
		});
		numEffect
			.addLabel('a')
			.from(
				value,
				{
					duration: 2,
					ease: 'circ.out',
					val: 0,
					roundProps: 'val',
					onUpdate: function () {
						el.innerText = format_number(value.val);
					},
				},
				'a'
			)
			.from(
				$(this).parents('.about-item'),
				{
					opacity: 0,
					y: 50,
				},
				'a'
			);
	});

	// 서비스 각 섹션별 텍스트 위로 올라오게

	$('.sc-service .title-area').each(function (idx, el) {
		const child = $(this).find('> *');

		gsap.from(child, {
			scrollTrigger: {
				trigger: el,
				start: 'top 80%',
			},
			opacity: 0,
			yPercent: 50,
			stagger: 0.2,
		});
	});

	// 송금

	$('.wire-item').each(function (i, el) {
		gsap.from(el, {
			opacity: 0,
			y: 100,
			duration: 1,
			scrollTrigger: {
				trigger: el,
				start: 'top 70%',
			},
		});
	});

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

	// 가로 스크롤

	let totalWidth = 0;
	const visionEls = $('.vision-item');
	const visionElWidth = $('.vision-item').innerWidth();
	const visionItemW = $('.vision-item').width() / 2;

	totalWidth = (visionEls.length * visionElWidth) / 2 - visionItemW;

	basePosition();

	gsap.to('.vision-list', {
		x: -totalWidth,
		scrollTrigger: {
			trigger: '.sc-vision',
			start: 'bottom bottom',
			end: '+=300%',
			scrub: true,
			pin: true,
		},
	});

	function basePosition() {
		const innerW = $('.sc-vision .inner-s').width() / 2;

		gsap.set('.vision-list', {
			x: innerW - visionItemW,
		});
	}

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

	// 숫자 카운트 부분 배경 애니메이션

	const bgEffect = gsap.timeline({
		scrollTrigger: {
			trigger: '.sc-about',
			start: 'top bottom',
			end: 'bottom 20%',
			scrub: true,
		},
	});

	bgEffect
		.to('.sc-about .bg', {
			'width': '100%',
			'border-radius': 0,
		})
		.to('.sc-about .bg', {
			'width': '100%',
			'border-radius': 0,
		})
		.to('.sc-about .bg', {
			'width': '80%',
			'border-radius': 30,
		});

	// 투자부분 텍스트

	gsap.from('.investment .desc-area', {
		opacity: 0,
		y: 100,
		scrollTrigger: {
			trigger: '.investment .mock-up',
			start: 'top 40%',
		},
	});
});
