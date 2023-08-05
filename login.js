const usee = document.getElementById('usee');
const names = document.getElementById('nxt');
const nextSection = document.getElementById('nextsection');


document.onreadystatechange = function() {
  if (document.readyState === 'interactive') {

  

    function showSpinner() {
      document.getElementById('spinnerContainer').style.visibility = 'visible';
      // document.getElementById('back').style.display = 'none';
      document.querySelector('.loginForm').style.visibility = 'hidden';
    }

    function hideSpinner() {
      // document.getElementById('back').style.display = 'block';
    
      document.querySelector('.loginForm').style.visibility = 'visible';
      document.getElementById('spinnerContainer').style.visibility = 'hidden';
    }

    showSpinner(); // Show the spinner on load
    setTimeout(function() {
      hideSpinner(); // Hide the spinner after five seconds
    }, 5000); // 5000 milliseconds = 5 seconds
  }
};
// Hide all sections except the first one
const sections = document.querySelectorAll('section');
sections.forEach((section, index) => {
  if (index !== 0) {
    section.style.display = 'none';
  }
});

// Add event listener to the link
usee.addEventListener('click', showNextSection);

function showNextSection() {
  // Check if username or email and password fields are empty
  const usernameOrEmail = document.getElementById('usernameOrEmail').value;
  const password = document.getElementById('password').value;

  if (usernameOrEmail.trim() === '' || password.trim() === '') {
    alert('Username or email and password fields must not be empty.');
    return; // Don't proceed to the next section
  }

  // Find the currently visible section
  const visibleSection = document.querySelector(".login-section");

  // Hide the current section
  visibleSection.style.display = 'none';

  // Show the next section
  const nextSectionElement = visibleSection.nextElementSibling;
  if (nextSectionElement) {
    nextSectionElement.style.display = 'block';
  } else {
    // If there is no next section, show the first section again
    sections[0].style.display = 'block';
  }
}

// Adjust the section sizes on window resize
window.addEventListener('resize', adjustSectionSizes);

function adjustSectionSizes() {
  const sections = document.querySelectorAll('section');

  sections.forEach(section => {
    section.style.height = window.innerHeight + 'px';
  });
}

// Call the function initially to set the initial section sizes
adjustSectionSizes();

function myFunction() {
  var x = document.getElementById("myLinks");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}

let showPasswordToggle = document.getElementById('showPasswordToggle');
let passwordInput = document.getElementById('password');

showPasswordToggle.addEventListener('change', function() {
  if (this.checked) {
    passwordInput.type = 'text';
  } else {
    passwordInput.type = 'password';
  }
});

// Function to handle form submission
document.querySelector('.loginForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form from submitting

  // Get form values
  let usernameOrEmail = document.getElementById('usernameOrEmail').value;
  let password = document.getElementById('password').value;

  // Check if either of the fields is empty
  if (usernameOrEmail.trim() === '' || password.trim() === '') {
    alert('Username or email and password fields must not be empty.');
    return; // Don't proceed with login
  }

  // Retrieve users from local storage or initialize an empty array
  let users = JSON.parse(localStorage.getItem('users')) || [];

  // Find user by username or email
  let foundUser = users.find(function(user) {
    return user.username === usernameOrEmail || user.email === usernameOrEmail;
  });

  // Check if user exists and credentials match
  if (foundUser && foundUser.password === password) {
    // Redirect to main website page
    window.location.hash = '#nextsection';
    foundUser.loginAttempts = 0;

    // Save the logged-in user in local storage
    localStorage.setItem('currentUser', JSON.stringify(foundUser));

    // Call the track function
    track(event);

    // Print the full name of the logged-in user
    names.innerHTML = 'Welcome' + ' ' + foundUser.fullName;
  } else if (foundUser) {
    // User exists but wrong password
    if (foundUser.loginAttempts === undefined) {
      foundUser.loginAttempts = 1;
    } else {
      foundUser.loginAttempts++;
    }
    if (foundUser.loginAttempts >= 3) {
      // Redirect to index page after three failed attempts
      alert('You have exceeded the maximum number of login attempts. Please try again later.');
      window.location.href = 'index.html';
    } else {
      alert('Invalid password. Please try again.');
    }
  } else {
    // User does not exist, redirect to signup page
    alert('No such user found. Please go to sign up.');
    window.location.href = 'signup.html';
  }

  // Save updated users array to local storage
  localStorage.setItem('users', JSON.stringify(users));
});





// Function to handle tracking
function track(event) {
  event.preventDefault();
// console.log('tracking')
  if (!checkLogin()) {
    alert("Please Login First");
    return;
  }

  let trackingId = document.querySelector("#trackingId").value;
  let productDetail = document.querySelector(".product-detail");
  
  let product = {
    123456: {
      id: "123432456",
      name: "iPhone 12",
      status: "Delivered",
    },
    456789: {
      id: "43543",
      name: "iPhone 11",
      status: "Out for delivery",
    },
    987654: {
      id: "987642",
      name: "iPhone 10",
      status: "Shipped",
    },
    654321: {
      id: "3245234543",
      name: "iPhone 9",
      status: "Cancelled",
    },
  };

  if (!product.hasOwnProperty(trackingId)) {
    productDetail.innerHTML = "<h4>No Product Found!<br>Check Your Details</h4>";
    return;
  }
  // Attach the event listener to the button after the DOM has loaded
  document.addEventListener('DOMContentLoaded', function() {
  let trackButton = document.querySelector(".tracking-button");
  trackButton.addEventListener("click", track);
  });  

  let selectedProduct = product[trackingId];
  let productId = document.getElementById("productId");
  let productName = document.getElementById("productName");
  let productStatus = document.getElementById("productStatus");

  productId.innerHTML = selectedProduct.id;
  productName.innerHTML = selectedProduct.name;
  productStatus.innerHTML = selectedProduct.status;
  let trackingDetail = document.querySelector(".detail");
  trackingDetail.style.visibility = 'visible';
  
};


// Function to handle tracking another product
function trackAnother(event) {
  event.preventDefault();
  document.querySelector(".detail").style.visibility = 'hidden';
}

// Function to handle user logout
function logout() {
  localStorage.removeItem("currentUser");
  alert("Logged Out Successfully");
  document.querySelector(".loginInButton").innerHTML =
    '<a onclick="showLogin(event)" href="#">Login</a>';
}

// Function to check if a user is logged in
function checkLogin() {
  let currentUser = localStorage.getItem("currentUser");
  if (currentUser && currentUser.length > 0) {
    return true;
  }
  return false;
}
