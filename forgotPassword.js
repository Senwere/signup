
document.getElementById('resetPasswordForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form from submitting

  // Get form values
  var usernameOrEmail = document.getElementById('username').value;
  var newPassword = document.getElementById('password').value;
  var confirmPassword = document.getElementById('confirmPassword').value;

  // Retrieve users from local storage
  var users = JSON.parse(localStorage.getItem('users'));

  // Find user by username or email
  var foundUser = users.find(function(user) {
    return user.username === usernameOrEmail || user.email === usernameOrEmail;
  });

  if (foundUser) {
    if (newPassword === confirmPassword) {
      // Set the new password for the found user
      foundUser.password = newPassword;

      // Update the modified user object in the users array
      var userIndex = users.indexOf(foundUser);
      users[userIndex] = foundUser;

      // Save updated users array to local storage
      localStorage.setItem('users', JSON.stringify(users));

      // Display a success message to the user
      alert(`Your password has been reset successfully,your new password is ${newPassword}`);

      // Redirect to login page
      window.location.href = 'login.html';
    } else {
      // Passwords don't match
      alert('Passwords do not match. Please enter the same password in both fields.');
    }
  } else {
    // User not found
    alert('User not found. Please check your username or email.');
  }
});
