document.addEventListener('DOMContentLoaded', function () {
	const btn = document.querySelector('.nav-toggle');
	const navList = document.querySelector('.nav-list');
	const navLinks = document.querySelectorAll('.nav-list a');
	const navbar = document.querySelector('.navbar');
	const themeToggle = document.querySelector('.theme-toggle');
	const themeIcon = document.querySelector('.theme-icon');
	const themeText = document.querySelector('.theme-text');

	if (!btn || !navList) return;

	const setTheme = (theme) => {
		const isLight = theme === 'light';
		document.body.dataset.theme = isLight ? 'light' : 'dark';
		if (themeToggle) {
			themeToggle.setAttribute('aria-pressed', String(isLight));
			themeToggle.setAttribute('aria-label', isLight ? 'Switch to dark mode' : 'Switch to light mode');
		}
		if (themeIcon) themeIcon.textContent = isLight ? '☀' : '☾';
		if (themeText) themeText.textContent = isLight ? 'Light' : 'Dark';
		localStorage.setItem('portfolio-theme', isLight ? 'light' : 'dark');
	};

	const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
	setTheme(savedTheme);

	if (themeToggle) {
		themeToggle.addEventListener('click', () => {
			const currentTheme = document.body.dataset.theme === 'light' ? 'dark' : 'light';
			setTheme(currentTheme);
		});
	}





	
	btn.addEventListener('click', function () {
		const isOpen = btn.classList.toggle('open');
		navList.classList.toggle('open');
		btn.setAttribute('aria-expanded', isOpen);
	});

	navLinks.forEach(link => {
		link.addEventListener('click', () => {
			if (window.innerWidth <= 860) {
				btn.classList.remove('open');
				navList.classList.remove('open');
				btn.setAttribute('aria-expanded', 'false');
			}
		});
	});

	// Close menu on ESC
	document.addEventListener('keydown', (e) => {
		if (e.key === 'Escape' && navList.classList.contains('open')) {
			btn.classList.remove('open');
			navList.classList.remove('open');
			btn.setAttribute('aria-expanded', 'false');
		}
	});

	// subtle elevated shadow on scroll
	window.addEventListener('scroll', () => {
		if (window.scrollY > 20) navbar.classList.add('scrolled');
		else navbar.classList.remove('scrolled');
	}, { passive: true });

	// Contact form behavior: validation, UX feedback
	const contactForm = document.getElementById('contactForm');
	const feedbackEl = document.querySelector('.form-feedback');
	if (contactForm) {
		contactForm.addEventListener('submit', (e) => {
			e.preventDefault();
			if (!feedbackEl) return;
			const form = contactForm;
			const name = form.name.value.trim();
			const email = form.email.value.trim();
			const message = form.message.value.trim();
			if (!name || !email || !message) {
				feedbackEl.textContent = 'Please complete name, email, and message.';
				feedbackEl.classList.remove('success');
				feedbackEl.classList.add('error');
				return;
			}
			const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			if (!emailRe.test(email)) {
				feedbackEl.textContent = 'Please enter a valid email address.';
				feedbackEl.classList.remove('success');
				feedbackEl.classList.add('error');
				return;
			}

			feedbackEl.textContent = 'Sending...';
			feedbackEl.classList.remove('error', 'success');

			fetch(form.action, {
				method: 'POST',
				body: new FormData(form),
				headers: { 'Accept': 'application/json' }
			})
				.then((response) => {
					if (response.ok) {
						feedbackEl.classList.add('success');
						feedbackEl.textContent = 'Thanks — I will get back to you shortly.';
						contactForm.reset();
					} else {
						feedbackEl.classList.add('error');
						feedbackEl.textContent = 'Something went wrong. Please try again or email me directly.';
					}
				})
				.catch(() => {
					feedbackEl.classList.add('error');
					feedbackEl.textContent = 'Something went wrong. Please try again or email me directly.';
				});
		});
	}

	// Footer copyright year
	const copyrightYear = document.getElementById('copyrightYear');
	if (copyrightYear) copyrightYear.textContent = new Date().getFullYear();

	// Back to top button
	const backToTopBtn = document.getElementById('backToTop');
	window.addEventListener('scroll', () => {
		if (window.scrollY > 300) backToTopBtn.classList.add('show');
		else backToTopBtn.classList.remove('show');
	}, { passive: true });
	backToTopBtn.addEventListener('click', () => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	});

	// Scroll animations with Intersection Observer
	const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -100px 0px' };
	const observer = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.classList.add('fade-in-up');
				observer.unobserve(entry.target);
			}
		});
	}, observerOptions);
	document.querySelectorAll('.project-card, .testimonial-card').forEach(el => observer.observe(el));

	// Stat counter animation
	const countUpNumbers = (element, target) => {
		let current = 0;
		const increment = target / 60;
		const timer = setInterval(() => {
			current += increment;
			if (current >= target) {
				current = target;
				clearInterval(timer);
			}
			element.textContent = target === 100 ? '100%' : (target > 10 ? Math.floor(current) + '+' : current.toFixed(1).replace('.0', ''));
		}, 30);
	};
	const statObserver = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				const span = entry.target.querySelector('span');
				if (span && !span.dataset.animated) {
					span.dataset.animated = 'true';
					const text = span.textContent.replace(/[^0-9]/g, '');
					const target = parseInt(text);
					countUpNumbers(span, target);
				}
				statObserver.unobserve(entry.target);
			}
		});
	}, { threshold: 0.5 });
	document.querySelectorAll('.stat-card').forEach(el => statObserver.observe(el));

	// Tech stack section scroll animation
	document.querySelectorAll('.tech-badge').forEach(el => observer.observe(el));

	// Panorama layout: arrow scroll, dot nav, edge state
	const initPanorama = (trackId, dotsId, itemSelector, options = {}) => {
		const track = document.getElementById(trackId);
		const dotsWrap = document.getElementById(dotsId);
		if (!track || !dotsWrap) return;

		const panorama = track.parentElement;
		const prevBtn = panorama.querySelector('.panorama-prev');
		const nextBtn = panorama.querySelector('.panorama-next');
		if (!prevBtn || !nextBtn) return;

		const cards = Array.from(track.querySelectorAll(itemSelector));

		cards.forEach((card, i) => {
			const dot = document.createElement('button');
			dot.type = 'button';
			dot.className = 'panorama-dot';
			dot.setAttribute('aria-label', `Go to item ${i + 1}`);
			dot.addEventListener('click', () => {
				card.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
			});
			dotsWrap.appendChild(dot);
		});
		const dots = Array.from(dotsWrap.children);

		const setActiveDot = (index) => {
			dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
		};

		const cardObserver = new IntersectionObserver((entries) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					setActiveDot(cards.indexOf(entry.target));
				}
			});
		}, { root: track, threshold: 0.6 });
		cards.forEach(card => cardObserver.observe(card));

		const updateArrowState = () => {
			const maxScroll = track.scrollWidth - track.clientWidth - 1;
			prevBtn.disabled = track.scrollLeft <= 0;
			nextBtn.disabled = track.scrollLeft >= maxScroll;
		};
		updateArrowState();
		track.addEventListener('scroll', updateArrowState, { passive: true });
		window.addEventListener('resize', updateArrowState);

		const scrollByCard = (direction) => {
			const card = cards[0];
			const gap = parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap || 26);
			const amount = (card.getBoundingClientRect().width + gap) * direction;
			track.scrollBy({ left: amount, behavior: 'smooth' });
		};
		prevBtn.addEventListener('click', () => scrollByCard(-1));
		nextBtn.addEventListener('click', () => scrollByCard(1));

		// 3D coverflow tilt: cards rotate away from center as they scroll past
		if (options.tilt && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
			const updateTilt = () => {
				if (window.innerWidth <= 860) {
					cards.forEach((card) => {
						card.style.setProperty('--tilt', '0deg');
						card.style.setProperty('--depth', '1');
					});
					return;
				}
				const trackRect = track.getBoundingClientRect();
				const trackCenter = trackRect.left + trackRect.width / 2;
				cards.forEach((card) => {
					const cardRect = card.getBoundingClientRect();
					const cardCenter = cardRect.left + cardRect.width / 2;
					const delta = Math.max(-1, Math.min(1, (cardCenter - trackCenter) / (trackRect.width / 2)));
					card.style.setProperty('--tilt', (delta * -12).toFixed(2) + 'deg');
					card.style.setProperty('--depth', (1 - Math.abs(delta) * 0.08).toFixed(3));
				});
			};
			updateTilt();
			track.addEventListener('scroll', updateTilt, { passive: true });
			window.addEventListener('resize', updateTilt);
		}
	};

	initPanorama('projectsTrack', 'panoramaDots', '.project-card', { tilt: true });
	initPanorama('testimonialsTrack', 'testimonialsDots', '.testimonial-card');

	// Hero title assembles word-by-word
	const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	const heroH1 = document.querySelector('.hero h1');
	if (heroH1 && !reduceMotion) {
		const words = heroH1.textContent.trim().split(/\s+/);
		heroH1.innerHTML = words
			.map((word, i) => `<span class="hero-word" style="animation-delay:${(0.15 + i * 0.09).toFixed(2)}s">${word}</span>`)
			.join(' ');
	}

	// Assemble-in reveals for structural blocks (separate from the card/testimonial fade-in-up above)
	const assembleGroups = [
		{ selector: '.about-intro, .contact-card, .footer-brand', cls: 'assemble-left' },
		{ selector: '.about-stats, .contact-info, .footer-info', cls: 'assemble-right' },
		{ selector: '.section-header, .tech-header, .footer-actions', cls: 'assemble-up' },
		{ selector: '.stat-card', cls: 'assemble-scale' },
	];
	const assembleObserver = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				const cls = entry.target.dataset.assembleClass;
				if (cls) entry.target.classList.add(cls);
				assembleObserver.unobserve(entry.target);
			}
		});
	}, { threshold: 0.15, rootMargin: '0px 0px -80px 0px' });

	assembleGroups.forEach(({ selector, cls }) => {
		document.querySelectorAll(selector).forEach((el) => {
			el.dataset.assembleClass = cls;
			assembleObserver.observe(el);
		});
	});

	// Floating section momentum
	if (!reduceMotion) {
		const momentumSections = Array.from(document.querySelectorAll('main > section'));

		let targetScroll = window.scrollY;
		let smoothScroll = targetScroll;
		window.addEventListener('scroll', () => { targetScroll = window.scrollY; }, { passive: true });

		const tick = () => {
			smoothScroll += (targetScroll - smoothScroll) * 0.08;

			momentumSections.forEach((el, i) => {
				const rect = el.getBoundingClientRect();
				const center = rect.top + rect.height / 2 - window.innerHeight / 2;
				const depth = 0.02 + (i % 3) * 0.008;
				el.style.setProperty('--parallax', (-center * depth).toFixed(2) + 'px');
			});

			requestAnimationFrame(tick);
		};
		requestAnimationFrame(tick);
	}
});
