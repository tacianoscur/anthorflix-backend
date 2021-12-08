const { Router } = require('express');
const { movieController } = require('../../controllers');

const router = Router();

router.post('/movies', movieController.createMovie);
router.get('/movies', movieController.getMovies);
router.get('/movies/:id/ratings', movieController.getMovieRatings);
router.get('/movies/:id/ratings/average', movieController.getMovieRatingAverage);
router.get('/movies/:id', movieController.getOneMovie);
router.put('/movies/:id', movieController.updateMovie);
router.delete('/movies/:id', movieController.deleteMovie);

module.exports = router;