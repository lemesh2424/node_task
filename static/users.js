(() => {
    fetch('http://localhost:3000/api/users/', {
        headers: {
            'authorization': localStorage.getItem('token')
        }
    })
        .then(response => response.json())
        .then(response => {
            response.data.map(user => {
                const li = document.createElement('li');
                li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center"');
                li.append(user.username);
                const span = document.createElement('span');
                span.classList.add('badge', 'badge-primary', 'badge-pill');
                span.append(`Notes count: ${user.notesCount}`);
                li.append(span);
                $('.list-group')[0].append(li);
            })
        })
        .catch(err => console.error(err.response));

    $('h2').css('text-align', 'center');
})();