var showPasswordToggle = document.getElementById('showPasswordToggle');
var passwordInput = document.getElementById('password');

// Regular expression pattern for password validation
var passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).{8,}$/;

showPasswordToggle.addEventListener('change', function() {
  if (this.checked) {
    passwordInput.type = 'text';
  } else {
    passwordInput.type = 'password';
  }
});

document.getElementById('usernameForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form from submitting

  var username = document.getElementById('username').value;
  var password = passwordInput.value;

  // Check if the password meets the required pattern
  if (!passwordPattern.test(password)) {
    alert('Invalid password. Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.');
    return; // Stop further execution
  }
  
  // Retrieve existing users from local storage
  var users = JSON.parse(localStorage.getItem('users')) || [];

  // Get the user index from the URL parameter
  var urlParams = new URLSearchParams(window.location.search);
  var userIndex = parseInt(urlParams.get('userIndex'));

  // Update the username and password for the specific user
  users[userIndex].username = username;
  users[userIndex].password = password;

  // Store the updated users array in local storage
  localStorage.setItem('users', JSON.stringify(users));

  // Redirect to the login page
  window.location.href = 'login.html';
});