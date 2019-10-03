window.onload = () => {
    const pathame = window.location.pathname;
    if (pathame === '/') {
        setActive('index');
    } else {
        const dot = pathame.indexOf('.');
        const currentPathname = pathame.substring(1, dot);
        setActive(currentPathname);
    }

    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (token && user) {
        $('#loggedOut').css('display', 'none');
        $('#loggedIn').css('display', 'flex');
    } else {
        $('#loggedOut').css('display', 'flex');
        $('#loggedIn').css('display', 'none');
    }
};

$('#signout').click((e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.replace(window.location.origin + '/login.html');
})

function setActive(pageName) {
    const pages = [
        'index',
        'users',
        'notes',
        'join',
        'login',
        'profile',
    ];
    pages.map(page => {
        if (pageName === page) {
            $(`#${page}`).addClass('active');
        } else {
            $(`#${page}`).removeClass('active');
        }
    })
}