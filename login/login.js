
const loginForm = document.querySelector('.loginForm');

// Check for the username and password with the credentials provided

loginForm.addEventListener('submit', function(e) {
  e.preventDefault(); 
  const username = loginForm.elements['username'].value;
  const password = loginForm.elements['password'].value;

  if(validateLogin(username,password)){
    window.location.href = '../resume/resume.html';
    }
    else{
        alert("Invalid username/password.")
    }
});

// The function to validate credentials

function validateLogin(username,password) {
    const validUsername = localStorage.getItem('username');
    const validPassword = localStorage.getItem('password');

    if (username === validUsername && password === validPassword) {
        return true;
    } else {
      return false;
    }
}

// To prevent the browser to be able to go back to the login page

document.addEventListener('DOMContentLoaded', function() {
  history.pushState(null, null, document.URL);
  window.addEventListener('popstate', function() {
    history.pushState(null, null, document.URL);
  });
});

function preventback() { window.history.forward(); }
setTimeout("preventback()", 0);
window.onunload = function() { null };