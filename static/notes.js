const socket = io.connect('http://localhost:3000');

(() => {
    socket.on('note add', (note) => {
        addNote(note);
    });
    socket.on('note edit', (note) => {
        editNote(note.id, note.text);
    });
    fetch('http://localhost:3000/api/notes/', {
        headers: {
            'authorization': localStorage.getItem('token')
        }
    })
        .then(response => response.json())
        .then(response => {
            $('#spinner').remove();
            response.data.map(note => {
                addNote(note);
            })
        })
        .catch(err => console.error(err.message));

    $('h2').css('text-align', 'center');
})();

$('#addButton').click((e) => {
    e.preventDefault();
    const note = {
        text: $('#text').val()
    };
    fetch('http://localhost:3000/api/notes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': localStorage.getItem('token')
        },
        body: JSON.stringify(note)
    })
        .then(response => response.json())
        .then(response => {
            socket.emit('note add', { note: response.data });
            addNote(response.data);
            $('#addModal').modal('hide');
        })
        .catch(err => console.error(err.response));
});

$('#editButton').click((e) => {
    e.preventDefault();
    const id = $('#noteId').attr('class');
    const note = {
        text: $('#editedText').val()
    };
    fetch(`http://localhost:3000/api/notes/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'authorization': localStorage.getItem('token')
        },
        body: JSON.stringify(note)
    })
        .then(response => response.json())
        .then(response => {
            console.log('hello');
            editNote(id, note.text);
            socket.emit('note edit', {
                id,
                text: note.text
            })
            $('#editModal').modal('hide');
        })
        .catch(err => console.error(err.response));
});

function addNote(note) {
    const li = document.createElement('li');
    li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center"');
    li.id = note._id;

    const div = document.createElement('div');

    const editButton = document.createElement('button');
    editButton.setAttribute('data-toggle', 'modal');
    editButton.setAttribute('data-target', '#editModal');
    editButton.classList.add('btn', 'btn-warning');
    editButton.append('Edit');
    editButton.addEventListener('click', (e) => {
        e.preventDefault();
        $('#editedText').val(note.text);
        $('#noteId').addClass(note._id);
    });
    
    const deleteButton = document.createElement('button');
    deleteButton.id = 'deleteButton';
    deleteButton.classList.add('btn', 'btn-danger');
    deleteButton.append('Delete');
    deleteButton.addEventListener('click', (e => {
        e.preventDefault();
        fetch(`http://localhost:3000/api/notes/${note._id}`, {
            method: 'DELETE',
            headers: {
                'authorization': localStorage.getItem('token')
            }
        })
            .then(response => response.json())
            .then(response => window.location.reload())
            .catch(err => console.error(err.response))
    }));

    div.append(editButton, deleteButton);

    const p = document.createElement('p');
    p.classList.add('mb-1');
    p.append(note.text);

    li.append(p, div);
    $('.list-group')[0].append(li);
};

function editNote(noteId, newText) {
    console.log('hello');
    $(`#${noteId} p`).html(newText);
}