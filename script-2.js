window.onload = function () {
	// get action elements
	let testimonials = document.querySelector('ul');
	let leftNavButton = document.querySelector('a.left');
	let rightNavButton = document.querySelector('a.right');

	// create events handlers
	testimonials.addEventListener('click', activateItem);
	leftNavButton.addEventListener('click', previousItem);
	rightNavButton.addEventListener('click', nextItem);
}

// event handlers
function activateItem(e) {
	let listItem = e.target;

	if (listItem.localName !== 'li') {
		listItem = e.target.parentNode;
	}

	let dataItemNum = parseInt(listItem.getAttribute('data-item'));
	selectItem(dataItemNum);
}

function previousItem(e) {
	let listItem = document.querySelector('li.active');
	let dataItemNum = parseInt(listItem.getAttribute('data-item'));

	if (dataItemNum === 1) {
		return;
	}
	else {
		dataItemNum--;
	}

	let nextItem = selectItem(dataItemNum);

	if (!isVisible(nextItem)) {
		scrollToItem(dataItemNum);
	}
}

function nextItem(e) {
	let listItem = document.querySelector('li.active');
	let dataItemNum = parseInt(listItem.getAttribute('data-item'));

	if (dataItemNum === 8) {
		return;
	}
	else {
		dataItemNum++;
	}

	let nextItem = selectItem(dataItemNum);

	if (!isVisible(nextItem)) {
		scrollToItem(dataItemNum);
	}
}

// helper functions
function deselectItem() {
	let testimonialAuthors = document.querySelector('ul');
	let activeItem = testimonialAuthors.querySelector('.active');
	let testimonial = document.querySelector('.testimonial.active');

	testimonial.classList.remove('active');
	activeItem.classList.remove('active');
}

function selectItem(itemNumber) {
	let nextItem = document.querySelector(`li[data-item='${ itemNumber }']`);
	let testimonial = document.querySelector(`.testimonial[data-item='${ itemNumber }']`);

	deselectItem();
	nextItem.classList.add('active');
	testimonial.classList.add('active');

	return nextItem;
}

function scrollToItem(itemNumber) {
	let authors = document.querySelector('ul');
	let width = authors.scrollWidth;
	let half = itemNumber > 4 ? 1 : 0;
	let scrollWidth = (width / 2) * half;
	authors.scrollLeft = scrollWidth;
}

function isVisible(el) {
	var bounding = el.getBoundingClientRect();

    return (
        bounding.left >= 0 &&
        bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}
