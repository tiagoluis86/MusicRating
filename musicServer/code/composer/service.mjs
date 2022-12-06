import { insertComposer, loadComposers, removeComposer, updateComposer } from "./repository.mjs";

export async function listComposers() {
    return loadComposers();
}

export async function saveComposer(composer) {
    if (!composer.id) {
        return insertComposer(composer);
    }
    return updateComposer(composer);    
}

export async function deleteComposer(id) {
    return removeComposer(id);
}