// Get the user registration form element
let userForm = document.getElementById("user-form");

// Retrieve user entries from local storage
const retrieveEntries = () => {
	let entries = localStorage.getItem("user-entries");
	if (entries) {
		entries = JSON.parse(entries);
	} else {
		entries = [];
	}
	return entries;
};

// Initialize userEntries with retrieved entries
let userEntries = retrieveEntries();

// Display user entries in a table
const displayEntries = () => {
	const entries = retrieveEntries();

	const tableRows = entries.map((entry) => {
		const nameCell = `<td>${entry.name}</td>`;
		const emailCell = `<td>${entry.email}</td>`;
		const passwordCell = `<td>${entry.password}</td>`;
		const dobCell = `<td>${entry.dob}</td>`;
		const acceptTermsCell = `<td>${entry.acceptTerms}</td>`;
		const row = `<tr>${nameCell} ${emailCell} ${passwordCell} ${dobCell} ${acceptTermsCell}</tr>`;
		return row;
	}).join("\n");

	const table = `<table border="2px"><tr> <th>name</th> <th>Email</th> <th>Password</th> <th>dob</th> <th>accepted terms?</th> </tr> ${tableEntries} </table>`;
	let entryDetails = document.getElementById("user-entries");
	entryDetails.innerHTML = table;
};

// Save user form data
const saveUserForm = (event) => {
	event.preventDefault();
	const name = document.getElementById("name").value;
	const email = document.getElementById("email").value;
	const password = document.getElementById("password").value;
	const dob = document.getElementById("dob").value;
	const acceptTerms = document.getElementById("acceptTerms").checked;
	const age = calculateAge(new Date(dob));

	console.log(name);
	console.log(email);
	console.log(password);
	console.log(dob);

	if (age >= 18 && age <= 55) {
		const entry = {
			name,
			email,
			password,
			dob,
			acceptTerms
		};
		userEntries.push(entry);
		localStorage.setItem("user-entries", JSON.stringify(userEntries));
		displayEntries();
	} else {
		alert("Sorry, you must be between 18 and 55 years old to register.");
	}
};

// Calculate age based on birthday
const calculateAge = (birthday) => {
	const ageDifferenceMs = Date.now() - birthday.getTime();
	const ageDate = new Date(ageDifferenceMs);
	return Math.abs(ageDate.getUTCFullYear() - 1970);
};

// Attach event listener for form submission
userForm.addEventListener("submit", saveUserForm);

// Display entries when the page loads
displayEntries();
