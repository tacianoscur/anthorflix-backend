const { Router } = require('express');
const { ratingController } = require('../../controllers');

const router = Router();

router.post('/ratings', ratingController.createRating);
router.get('/ratings/:id/comments', ratingController.getRatingComments);
router.put('/ratings/:id', ratingController.updateRating);

module.exports = router;