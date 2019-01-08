window.onload = function (e) {
	// select action elements
	let searchInput = document.querySelector('input');
	let searchButton = document.querySelector('.search-button');
	let resultsDropDown = document.querySelector('.results');
	let cancelButton = document.querySelector('[data-action=cancel]');
	let proceedButton = document.querySelector('[data-action=proceed]');

	// setup event handlers
	searchButton.addEventListener('click', showAndFocusSearch);
	searchInput.addEventListener('input', showResults);
	resultsDropDown.addEventListener('click', showPopup);
	cancelButton.addEventListener('click', cancelPopup);
	proceedButton.addEventListener('click', selectResult);
}

/* Ensure search input is visible and has focus */
function showAndFocusSearch(e) {
	let searchInput = document.querySelector('input');
	searchInput.style.visibility = 'visible';
	searchInput.focus();
}

/* Fake ajax call to get results and populate them in the dropdown list, or hide when field is empty */
function showResults(e) {
	let searchTextBox = e.target;
	let resultsDropDown = document.querySelector('.results');
	clearResults();

	if (searchTextBox.value) {
		getResults().then(({ results }) => {
			results.forEach((searchResult) => {
				let resultItem = document.createElement('li');
				resultItem.textContent = searchResult;
				resultsDropDown.appendChild(resultItem);
			});

			resultsDropDown.style.display = 'block';
		});
	}
	else {
		resultsDropDown.style.display = 'none';
		cancelPopup();
	}
}

/* Open popup and display selected item */
function showPopup(e) {
	if (e.target.localName !== 'li') {
		return;
	}

	let popup = document.querySelector('dialog');
	let heading = popup.querySelector('h2');
	heading.textContent = e.target.textContent;
	popup.show();
}

/* Clear and close popup, then focus search */
function cancelPopup(e) {
	let popup = document.querySelector('dialog');
	popup.querySelector('h2').textContent = '';

	popup.close();
	showAndFocusSearch();
}

/* Save selected item in search box, then clear results */
function selectResult(e) {
	let popup = document.querySelector('dialog');
	let heading = popup.querySelector('h2');
	let searchInput = document.querySelector('input');

	searchInput.value = heading.textContent;
	cancelPopup();
	clearResults();
}

/* Clear results of the drop down list */
function clearResults() {
	let resultsDropDown = document.querySelector('.results');

	let range = document.createRange();
	range.selectNodeContents(resultsDropDown);
	range.deleteContents();
}

/* Fake call to get search data */
function getResults() {
	return Promise.resolve({
		results: [
			'Partial Match',
			'Autofill Match',
			'Other Match'
		]
	});
}
