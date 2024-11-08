const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const slides = document.querySelector('.slides');
let currentIndex = 0;
let startX = 0;
let isSwiping = false;

function updateSlider() {
	const slideWidth = slides.clientWidth;
	slides.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
}

// Обработчики для кнопок переключения слайдов
prevBtn.addEventListener('click', () => {
	currentIndex = currentIndex > 0 ? currentIndex - 1 : 2; // 2 — это последний индекс слайдера
	updateSlider();
});

nextBtn.addEventListener('click', () => {
	currentIndex = currentIndex < 2 ? currentIndex + 1 : 0; // 2 — это последний индекс слайдера
	updateSlider();
});

window.addEventListener('resize', updateSlider);

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
