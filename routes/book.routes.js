const { Router } = require("express");
const bookController = require("../controllers/book.controller.js");
const authMiddleware = require("../middleware/auth.middleware.js");
const uploadMiddleware = require("../middleware/upload.middleware.js");



const router = Router();

router.post(
  "/upload",
  [
    authMiddleware.verifyToken,
    authMiddleware.isSeller,
    uploadMiddleware.single("file"),
  ],
  bookController.uploadBooks
);
router.get(
  "/seller",
  [authMiddleware.verifyToken, authMiddleware.isSeller],
  bookController.getBooksBySeller
);
router.put(
  "/:id",
  [authMiddleware.verifyToken, authMiddleware.isSeller],
  bookController.updateBook
);
router.delete(
  "/:id",
  [authMiddleware.verifyToken, authMiddleware.isSeller],
  bookController.deleteBook
);
router.get("/", bookController.getAllBooks);
router.get("/:id", bookController.getBookById);

module.exports = router;
