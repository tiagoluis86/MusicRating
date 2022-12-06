import { getByUser, saveRating } from "./repository.mjs";

export async function rate({user, album, rating}) {
    return saveRating(user, album, rating);
}

export async function getAlbunsByUser(userId) {
    return getByUser(userId);
}