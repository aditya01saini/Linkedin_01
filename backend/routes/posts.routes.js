import { Router } from "express";
import { activeCheck, createPost, getAllPost,deletePost } from "../controllers/posts.controller.js";

const router = Router();
import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.route("/").get(activeCheck);
router.route("/post").post(upload.single("media"), createPost);
router.route("/posts").get(getAllPost);
router.route("delete_Post").post(deletePost);

export default router;
