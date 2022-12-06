let users = [
    {id: 1, login:'admin', password: 'admin', admin: true},
    {id: 2, login:'vinicius', password: 'vinicius', admin: false},
    {id: 3, login:'guest', password: 'guest', admin: true}
]

function formatUser(user) {
    if (!user) return user;
    return {...user, password: undefined};
}

export async function loadById(id) {
    return formatUser(users.find(u => u.id === id));
}

export async function loadByCredentials(username, password) {
    return formatUser(
        users.find(u =>
            u.login === username &&
            u.password === password
        )
    );
}