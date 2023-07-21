// Create account form submission
document.getElementById('signupForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form from submitting

  // Get form values
  var fullName = document.getElementById('fullName').value;
  var address = document.getElementById('address').value;
  var dob = document.getElementById('dob').value;
  var gender = document.querySelector('input[name="gender"]:checked').value;
  var email = document.getElementById('email').value;
  var phone = document.getElementById('phone').value;

  // Create user object
  var user = {
    fullName: fullName,
    address: address,
    dob: dob,
    gender: gender,
    email: email,
    phone: phone,
    username: "", // Placeholder for username
    password: "" // Placeholder for password
  };

  // Save user to local storage
  var users = JSON.parse(localStorage.getItem('users')) || [];
  users.push(user);
  localStorage.setItem('users', JSON.stringify(users));

   // Get the user index of the newly created user
   var userIndex = users.length - 1;
   
  // Redirect to username and password creation page, passing user index as parameter
  window.location.href = 'createUsername.html?userIndex=' + (users.length - 1);
});


var countryCodeSelect = document.getElementById('countryCode');
var phoneNumberInput = document.getElementById('phone');

// Define an array of countries with their mobile dial codes
var countries = [
  { name: 'United States', code: '+1' },
  { name: 'United Kingdom', code: '+44' },
  // Add more countries as needed
];

// Populate the country code select options
countries.forEach(function(country) {
  var option = document.createElement('option');
  option.text = country.name + ' (' + country.code + ')';
  option.value = country.code;
  countryCodeSelect.appendChild(option);
});

// Set the initial value of the phone number input based on the selected country code
countryCodeSelect.addEventListener('change', function() {
  var selectedCountryCode = this.value;
  phoneNumberInput.value = selectedCountryCode;
});