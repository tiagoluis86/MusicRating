let composers = []
let id = 0;

export async function loadComposer(id) {
    return composers.find(c => c.id === id)
}

export async function loadComposers(){
    return composers;
}

export async function insertComposer(composer) {
    id++;
    const saved = {id, ...composer};
    composers.push(saved);
    return saved;
}

export async function removeComposer(id) {
    if (composers.lenght === 0) return false;
    const prevSize = composers.length;
    composers = composers.filter( x => x.id !== id);
    return composers.length !== prevSize; 
}

export async function updateComposer(composer) {
    let removed = await removeComposer(composer.id);
    if (!removed) return null;
    composers.push(composer);
    return composer;
}