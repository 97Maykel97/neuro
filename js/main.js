// бургер меню

window.addEventListener('DOMContentLoaded', () => {
	const menu = document.querySelector('.navigation__list'),
		menuItem = document.querySelectorAll('.navigation__item'),
		hamburger = document.querySelector('.hamburger');

	// Открытие/закрытие меню при клике на бургер
	hamburger.addEventListener('click', e => {
		e.stopPropagation(); // предотвращаем распространение события, чтобы не закрыть меню сразу
		hamburger.classList.toggle('hamburger_active');
		menu.classList.toggle('navigation__list_active');
	});

	// Закрытие меню при клике на пункт меню
	menuItem.forEach(item => {
		item.addEventListener('click', () => {
			hamburger.classList.remove('hamburger_active');
			menu.classList.remove('navigation__list_active');
		});
	});

	// Закрытие меню при клике вне меню или бургера
	document.addEventListener('click', e => {
		// Проверяем, был ли клик вне меню и бургера
		if (!menu.contains(e.target) && !hamburger.contains(e.target)) {
			hamburger.classList.remove('hamburger_active');
			menu.classList.remove('navigation__list_active');
		}
	});

	// Предотвращаем закрытие меню при клике внутри самого меню
	menu.addEventListener('click', e => {
		e.stopPropagation();
	});
});

// конец бургер меню

// слайдер секции about

const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const slides = document.querySelector('.slides');
let currentIndex = 0;
let startX = 0;
let isSwiping = false;
let autoSlideInterval = null;

function updateSlider() {
	const slideWidth = slides.clientWidth;
	slides.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
}

// Функция для запуска автопереключения слайдов
function startAutoSlider() {
	if (autoSlideInterval) return; // Не запускаем, если автопереключение уже активно

	autoSlideInterval = setInterval(() => {
		currentIndex = currentIndex < 2 ? currentIndex + 1 : 0; // 2 — это последний индекс слайдера
		updateSlider();
	}, 5000); // Переключение слайдов каждые 5 секунды
}

// Функция для остановки автопереключения слайдов
function stopAutoSlider() {
	if (autoSlideInterval) {
		clearInterval(autoSlideInterval);
		autoSlideInterval = null;
	}
}

// Обработчики для кнопок переключения слайдов
prevBtn.addEventListener('click', () => {
	currentIndex = currentIndex > 0 ? currentIndex - 1 : 2; // 2 — это последний индекс слайдера
	updateSlider();
	stopAutoSlider(); // Останавливаем автопереключение, если пользователь вручную переключил слайд
});

nextBtn.addEventListener('click', () => {
	currentIndex = currentIndex < 2 ? currentIndex + 1 : 0; // 2 — это последний индекс слайдера
	updateSlider();
	stopAutoSlider(); // Останавливаем автопереключение, если пользователь вручную переключил слайд
});

window.addEventListener('resize', () => {
	updateSlider();
	// Если ширина экрана в пределах 375px и 768px, включаем автопереключение
	if (window.innerWidth <= 768 && window.innerWidth >= 375) {
		startAutoSlider();
	} else {
		stopAutoSlider();
	}
});

// Для мобильных устройств и сенсорных экранов
slides.addEventListener('touchstart', e => {
	isSwiping = true;
	startX = e.touches[0].clientX; // Запоминаем начальную позицию касания
});

slides.addEventListener('touchmove', e => {
	if (!isSwiping) return;

	const moveX = e.touches[0].clientX;
	const diffX = startX - moveX; // Определяем, на сколько сдвинулось касание

	// Если разница значительная, переключаем слайды
	if (Math.abs(diffX) > 50) {
		if (diffX > 0) {
			// Свайп влево (следующий слайд)
			currentIndex = currentIndex < 2 ? currentIndex + 1 : 0;
		} else {
			// Свайп вправо (предыдущий слайд)
			currentIndex = currentIndex > 0 ? currentIndex - 1 : 2;
		}
		updateSlider();
		isSwiping = false; // Завершаем свайп
	}
});

slides.addEventListener('touchend', () => {
	isSwiping = false; // Завершаем свайп
});

// Для десктопа и мыши
slides.addEventListener('mousedown', e => {
	isSwiping = true;
	startX = e.clientX; // Запоминаем начальную позицию мыши
	e.preventDefault(); // Предотвращаем выделение текста при перетаскивании
});

slides.addEventListener('mousemove', e => {
	if (!isSwiping) return;

	const moveX = e.clientX;
	const diffX = startX - moveX;

	// Если разница значительная, переключаем слайды
	if (Math.abs(diffX) > 50) {
		if (diffX > 0) {
			// Перетаскивание вправо (следующий слайд)
			currentIndex = currentIndex < 2 ? currentIndex + 1 : 0;
		} else {
			// Перетаскивание влево (предыдущий слайд)
			currentIndex = currentIndex > 0 ? currentIndex - 1 : 2;
		}
		updateSlider();
		isSwiping = false; // Завершаем перетаскивание
	}
});

slides.addEventListener('mouseup', () => {
	isSwiping = false; // Завершаем перетаскивание
});

slides.addEventListener('mouseleave', () => {
	isSwiping = false; // Завершаем перетаскивание, если курсор покинул область слайдера
});

// Инициализация автопереключения при загрузке страницы
if (window.innerWidth <= 768 && window.innerWidth >= 375) {
	startAutoSlider();
}
// конец слайдера секции about

// слайдер information
document.addEventListener('DOMContentLoaded', function () {
	const slides = document.querySelectorAll('.information__slide'); // Все слайды
	const dots = document.querySelectorAll('.information__dot'); // Все точки
	let currentSlide = 0; // Индекс текущего слайда

	let isMouseDown = false; // Проверка, нажата ли мышь
	let startX = 0; // Начальная позиция мыши или пальца
	let scrollStart = 0; // Начальная позиция слайдов

	// Функция для показа слайда
	function showSlide(index) {
		const offset = -index * 100; // Сдвиг слайдов влево на 100% для показа нужного слайда
		document.querySelector(
			'.information__slides'
		).style.transform = `translateX(${offset}%)`;

		// Обновляем активную точку
		dots.forEach((dot, i) => {
			dot.classList.toggle('active', i === index);
		});
	}

	// Функция для переключения слайдов
	function nextSlide() {
		currentSlide = (currentSlide + 1) % slides.length; // Переход к следующему слайду
		showSlide(currentSlide);
	}

	function prevSlide() {
		currentSlide = (currentSlide - 1 + slides.length) % slides.length; // Переход к предыдущему слайду
		showSlide(currentSlide);
	}

	// Инициализация слайдера
	showSlide(currentSlide);

	// Автоматическое переключение слайдов каждые 5 секунд
	setInterval(nextSlide, 5000);

	// Обработчик для точек
	dots.forEach((dot, index) => {
		dot.addEventListener('click', function () {
			currentSlide = index;
			showSlide(currentSlide);
		});
	});

	// Обработчики для перетаскивания слайдов с помощью мыши
	const slider = document.querySelector('.information__slider');
	slider.addEventListener('mousedown', e => {
		isMouseDown = true;
		startX = e.pageX; // Запоминаем начальную позицию мыши
		scrollStart = document.querySelector('.information__slides').offsetLeft; // Запоминаем начальную позицию слайдов
	});

	slider.addEventListener('mouseleave', () => {
		isMouseDown = false; // Выход мыши из области слайдера
	});

	slider.addEventListener('mouseup', () => {
		isMouseDown = false; // Отпускание кнопки мыши
	});

	slider.addEventListener('mousemove', e => {
		if (!isMouseDown) return; // Если не нажата кнопка мыши, ничего не делаем

		const moveX = e.pageX - startX; // Сколько пикселей переместился указатель
		const slideContainer = document.querySelector('.information__slides');

		slideContainer.style.transform = `translateX(${scrollStart + moveX}px)`; // Двигаем слайды вместе с мышью

		if (moveX < -50) {
			// Если переместили на достаточное расстояние влево
			nextSlide();
			isMouseDown = false;
		} else if (moveX > 50) {
			// Если переместили на достаточное расстояние вправо
			prevSlide();
			isMouseDown = false;
		}
	});

	// Обработчики для перетаскивания слайдов на мобильных устройствах
	slider.addEventListener('touchstart', e => {
		isMouseDown = true;
		startX = e.touches[0].pageX; // Начальная позиция пальца
		scrollStart = document.querySelector('.information__slides').offsetLeft; // Запоминаем начальную позицию слайдов
	});

	slider.addEventListener('touchend', () => {
		isMouseDown = false; // Отпускание пальца
	});

	slider.addEventListener('touchmove', e => {
		if (!isMouseDown) return; // Если не нажата кнопка мыши или не проведено касание

		const moveX = e.touches[0].pageX - startX; // Сколько пикселей переместился палец
		const slideContainer = document.querySelector('.information__slides');

		slideContainer.style.transform = `translateX(${scrollStart + moveX}px)`; // Двигаем слайды вместе с пальцем

		if (moveX < -50) {
			// Если переместили на достаточное расстояние влево
			nextSlide();
			isMouseDown = false;
		} else if (moveX > 50) {
			// Если переместили на достаточное расстояние вправо
			prevSlide();
			isMouseDown = false;
		}
	});
});
