const submitBtn = $('#submit');
const username = $('#username');
const password = $('#password');
const confirmation = $('#confirmation');

submitBtn.click((e) => {
  e.preventDefault();
  const user = {
    username: username.val(),
    password: password.val(),
    confirmation: confirmation.val()
  };
  fetch('http://localhost:3000/api/auth/join', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })
    .then(response => response.json())
    .then(response => {
      window.location.replace(window.location.origin + '/login.html');
    })
    .catch(err => console.error(err.message))
});