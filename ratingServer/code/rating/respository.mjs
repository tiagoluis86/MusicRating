const ratings = {}

export async function saveRating(userId, albumId, rating) {    
    const albuns = ratings[`${userId}`] || {};
    albuns[`${albumId}`] = {rating};
    ratings[`${userId}`] = albuns;
    console.log(JSON.stringify(ratings))
    return {user: userId, album: albumId, rating: rating}
}

export async function getByUser(userId) {
    const albuns = ratings[userId] || {};
    console.log(JSON.stringify(albuns))
    return Object.entries(albuns)    
    .map(obj => ({
        album: parseInt(obj[0]), 
        rating: obj[1].rating
    }));
}