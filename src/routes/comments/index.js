const { Router } = require('express');
const { commentController } = require('../../controllers');

const router = Router();

router.post('/comments', commentController.createComment);
router.get('/comments/:commentId', commentController.getOneComment);
router.delete('/comments/:id', commentController.deleteComment);

module.exports = router;