import express from "express";
import { listAlbuns, saveAlbum } from "./service.mjs";

const router = express.Router();

function parseAlbum(res, {name = null, composer = null, year = null, grade = null}) {
    if (name == null) {
      res.status(400).send("Name can't be null");
      return null;
    }

    composer = parseInt(composer);
    if (isNaN(composer)) {
      res.status(400).send("Invalid composer id!");
      return null;
    }

    year = parseInt(year);
    if (isNaN(year) || year < 1950 || year > new Date().getFullYear()) {
      res.status(400).send("Invalid year!");
      return null;
    }

    return {name, composer, year};
  }

router.get('/', async function(req, res, _) {    
    res.json(await listAlbuns());
});

router.post("/", async function(req, res, _) {
    const album = parseAlbum(res, req.body);
    if (!album) return;  

    const saved = await saveAlbum(album);  
    return saved ? res.status(201).json(saved) :
        res.status(400).send("Invalid composer!");
});  

export default router;