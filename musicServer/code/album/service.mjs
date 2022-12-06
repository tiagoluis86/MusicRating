import { loadComposer} from "../composer/repository.mjs";
import { insertAlbum, loadAlbuns, updateAlbum} from "./repository.mjs";

export async function listAlbuns() {
    return loadAlbuns();
}

export async function saveAlbum(album) {
    if (!await loadComposer(album.composer)) {
        return null;
    }

    if (!album.id) {
        return insertAlbum(album);
    }

    return updateAlbum(album)
}

export async function removeAlbum(id) {
    if (listAlbuns.length === 0) return false;
    const prevSize = albuns.length;
    albuns = albuns.filter(x => x.id !== id);
    return albuns.length !== prevSize;
}