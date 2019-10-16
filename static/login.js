const submitBtn = $('#submit');
const username = $('#username');
const password = $('#password');

submitBtn.click((e) => {
  e.preventDefault();
  const user = {
    username: username.val(),
    password: password.val()
  };
  fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(response => response.json())
    .then(response => {
      const {
        token,
        payload
      } = response.data;
      if (token && user) {
        localStorage.setItem('token', 'Bearer ' + token);
        localStorage.setItem('user', JSON.stringify(payload));
        window.location.replace(window.location.origin + '/profile.html');
      }
    })
    .catch(err => console.error(err.message))
});