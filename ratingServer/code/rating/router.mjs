import express from "express";
import { getAlbunsByUser, rate } from "./service.mjs";

const router = express.Router();

function parseId(id) {
  const newId = parseInt(id);
  return isNaN(newId) ? null : newId;
}
function parseRatingUser(res, {user = null, album = null, rating = null}) {
  user = parseId(user);  
  if (user == null) {
    return res.status(400).send("Invalid user!");
  }

  album = parseId(album);
  if (album == null) {
    return res.status(400).send("Invalid album!");
  }

  rating = parseFloat(rating);
  if (isNaN(rating)) {
    return res.status(400).send("Invalid rating!");
  }
  return {user, album, rating};
}
/* Rate an album */
router.put('/:id/rating', async function(req, res, _) {
  const data = {
    album: req.params.id,
    ...req.body
  };

  const rating = parseRatingUser(res, data);
  if (!rating) return;
  
  return res.json(await rate(rating));
});

router.get("/rated/:userId", async function(req, res, _) {
  const userId = parseId(req.params.userId);
  return userId ? 
    res.json(await getAlbunsByUser(userId)) : 
    res.status(400).statusMessage("Invalid user id!");
});

export default router;