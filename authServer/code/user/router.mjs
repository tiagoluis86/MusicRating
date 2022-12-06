import express from 'express';
import { getUser, login } from  "./service.mjs";

const router = express.Router();

function parseUser(res, {username = null, password = null}) {
    if (username == null) {
        res,sendStatus(401);
        return null;
    }

    if (password == null) {
        res.sendStatus(401);
        return null;
    }

    return {username, password}
}

/*User login*/
router.post('/login', async function(req, res, _) {
    const usr = parseUser(res, req.body);
    if (!usr) return;
    
    const user = await login(usr);
    return user ? res.json(user) : res.sendStatus(401);
});

router.get("/:id", async function(req, res, _){
    let id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.status(400).send("Invalid ID!");
    }

    const user = await getUser(id);
    return user ? res.json(user) : res.sendStatus(404);
});

export default router;