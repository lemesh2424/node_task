(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    fetch(`http://localhost:3000/api/users/${user.id}`, {
        headers: {
            authorization: localStorage.getItem('token')
        }
    })
        .then(response => response.json())
        .then(response => {
            $('#username').append(response.data.username);
            $('#notesCount').append(response.data.notesCount);
        })
        .catch(err => console.error(err));
    
})();

$('#editButton').click((e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('user'));
    $('#editedUsername').val(user.username);
})

$('#submitEdit').click((e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('user'));
    const newUser = {
        username: $('#editedUsername').val()
    };
    fetch(`http://localhost:3000/api/users/${user.id}`, {
        method: 'PUT',
        headers: {
            authorization: localStorage.getItem('token'),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
    })
        .then(response => response.json())
        .then(response => window.location.reload())
        .catch(err => console.error(err.response));
});

$('#deleteButton').click((e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('user'));
    fetch(`http://localhost:3000/api/users/${user.id}`, {
        method: 'DELETE',
        headers: {
            authorization: localStorage.getItem('token')
        }
    })
        .then(response => response.json())
        .then(response => {
            $('#signout').trigger('click');
        })
        .catch(err => console.error(err));
});