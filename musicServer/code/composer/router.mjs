import express from 'express';
import { removeComposer } from "./repository.mjs";
import { listComposers, saveComposer } from "./service.mjs";

const router = express.Router();

function parseComposer(res, {name = null, genre = null}) {
    if (name == null) {
        res.status(400).send("Nome não pode ser nulo : / ");
        return null;
    }

    if (genre = null) {
        res.status(400).send("Gênero não pode ser nulo : (");
        return null;
    }

    return {name, genre};
}

/* GET users listing */
router.get('/', async function(req, res, _){
    const composers = await listComposers();
    return res.json(composers);
});

router.post("/", async function(req, res, _) {
    const composer = parseComposer(res, req.body);
    if (!composer) return;    
    res.status(201).json(await saveComposer(composer));
});
  
router.put("/:id", async function(req, res, _) {
    let id = parseInt(req.params.id);
    if (isNaN(id)) {
      res.status(400).send("Invalid id!");
    }
  
    const composer = {id, ...parseComposer(res, req.body)};
    const updated = await saveComposer(composer);
  
    if (updated) {
      res.json(updated);
    } else {
      res.sendStatus(404);
    }
});
  
router.delete("/:id", async function(req, res, _) {
    let id = parseInt(req.params.id);
    if (isNaN(id)) {
      res.status(400).send("Invalid id!");
    }
    let deleted = await removeComposer(id);
    res.sendStatus(deleted ? 200 : 404);
});
  
export default router;