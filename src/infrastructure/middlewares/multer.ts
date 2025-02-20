import multer from "multer";

// Multer Storage in Memory (Buffer)
const storage = multer.memoryStorage();
const upload = multer({ storage });

export { upload };
