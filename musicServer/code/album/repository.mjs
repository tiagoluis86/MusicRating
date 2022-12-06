let albuns = []
let id = 0; 

export async function loadAlbuns() {
    return albuns;
}

export async function insertAlbum(album) {
    id++;
    const saved = {id, ...album};
    albuns.push(saved);
    return saved;
}

export async function updateAlbum(album) {
    let removed = await removeAlbum(album.id);
    if (!removed) return null;
    albuns.push(album);
    return album;
}