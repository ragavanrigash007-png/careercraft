document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    // Toggle the menu on button click
    menuToggle.addEventListener('click', function() {
        // Toggle the 'active' class on the navigation menu
        navMenu.classList.toggle('active');
        
        // Update the button's ARIA attribute for accessibility
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true' || false;
        menuToggle.setAttribute('aria-expanded', !isExpanded);
        
        // Optional: Change the icon (e.g., from bars to X)
        const icon = menuToggle.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times'); // Use a close icon
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars'); // Use a menu icon
        }
    });

    // Optional: Close the menu when a link is clicked (useful for single-page sites)
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                menuToggle.querySelector('i').classList.remove('fa-times');
                menuToggle.querySelector('i').classList.add('fa-bars');
            }
        });
    });
});


//login.js code
// --- Toggle between Sign Up & Sign In forms ---

const showSignup = document.getElementById("show-signup");
const showSignin = document.getElementById("show-signin");
const signupForm = document.getElementById("signup-form");
const signinForm = document.getElementById("signin-form");

// Switch to Sign In form
showSignin.addEventListener("click", (e) => {
  e.preventDefault();
  signupForm.classList.add("hidden");
  signinForm.classList.remove("hidden");
});

// Switch to Sign Up form
showSignup.addEventListener("click", (e) => {
  e.preventDefault();
  signinForm.classList.add("hidden");
  signupForm.classList.remove("hidden");
});

// --- Sign Up form handler ---
signupForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const username = document.getElementById("signup-username").value.trim();
  const email = document.getElementById("signup-email").value.trim();
  const password = document.getElementById("signup-password").value.trim();

  if (!username || !email || !password) {
    alert("Please fill in all fields!");
    return;
  }

  // Save to localStorage (for demo)
  if (localStorage.getItem(email)) {
    alert("Email already registered! Try signing in.");
  } else {
    const userData = {
      username: username,
      email: email,
      password: password
    };
    localStorage.setItem(email, JSON.stringify(userData));
    alert("Signup successful! Please sign in.");
    
    // Switch automatically to Sign In form
    signupForm.classList.add("hidden");
    signinForm.classList.remove("hidden");
  }

  // Reset form fields
  signupForm.reset();
});

// --- Sign In form handler ---
signinForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("signin-email").value.trim();
  const password = document.getElementById("signin-password").value.trim();

  const userData = JSON.parse(localStorage.getItem(email));

  if (userData && userData.password === password) {
    alert(`Welcome back, ${userData.username}! 🎉`);
    // You can redirect to your home page here:
    // window.location.href = "index.html";
  } else {
    alert("Invalid email or password!");
  }

  signinForm.reset();
});
