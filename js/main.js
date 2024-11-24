$(document).ready(function () {
	//news slider

	$(".news__inner").owlCarousel({
		loop: true,
		nav: true,
		dotsEach: true,
		navText: [
			"<button class='news__prev'></button>",
			"<button class='news__next'></button>",
		],
		navElement: "div",
		responsive: {
			0: {
				items: 1,
				nav: false,
			},
			768: {
				items: 2,
				margin: 21,
				nav: false,
			},
			992: {
				items: 3,
				nav: false,
			},
			1440: {
				nav: true,
			},
		},
	});

	//more slider

	$(".more .slides").owlCarousel({
		loop: true,
		items: 1,
		dots: false,
	});

	$(".more .prev").click(function () {
		$(".more .slides").trigger("prev.owl.carousel");
	});

	$(".more .next").click(function () {
		$(".more .slides").trigger("next.owl.carousel");
	});

	//information slider

	$(".information__slides").owlCarousel({
		loop: true,
		items: 1,
		dots: true,
		dotsEach: true,
	});

	// бургер меню

	const menu = document.querySelector(".navigation__list"),
		menuItem = document.querySelectorAll(".navigation__item"),
		hamburger = document.querySelector(".hamburger");

	// Открытие/закрытие меню при клике на бургер
	hamburger.addEventListener("click", (e) => {
		e.stopPropagation(); // предотвращаем распространение события, чтобы не закрыть меню сразу
		hamburger.classList.toggle("hamburger_active");
		menu.classList.toggle("navigation__list_active");
	});

	// Закрытие меню при клике на пункт меню
	menuItem.forEach((item) => {
		item.addEventListener("click", () => {
			hamburger.classList.remove("hamburger_active");
			menu.classList.remove("navigation__list_active");
		});
	});

	// Закрытие меню при клике вне меню или бургера
	document.addEventListener("click", (e) => {
		// Проверяем, был ли клик вне меню и бургера
		if (!menu.contains(e.target) && !hamburger.contains(e.target)) {
			hamburger.classList.remove("hamburger_active");
			menu.classList.remove("navigation__list_active");
		}
	});

	// Предотвращаем закрытие меню при клике внутри самого меню
	menu.addEventListener("click", (e) => {
		e.stopPropagation();
	});

	// конец бургер меню
});
