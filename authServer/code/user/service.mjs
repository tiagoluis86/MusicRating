import { loadByCredentials, loadById, } from "./repository.mjs";

export async function login({username, password}){
    return loadByCredentials(username, password);
}

export async function getUser(id) {
    return loadById(id);
}