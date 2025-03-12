import multer from "multer";
import FormData from "form-data";
import fetch from "node-fetch";

const upload = multer({ storage: multer.memoryStorage() });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const uploadMiddleware = upload.single("photo");
    await new Promise((resolve, reject) => {
      uploadMiddleware(req, res, (err) => {
        if (err) return reject(err);
        resolve();
      });
    });

    const photo = req.file;
    const id = req.body.id;

    if (!photo) {
      return res.status(400).json({ error: "No photo file provided" });
    }
    if (!id) {
      return res.status(400).json({ error: "No ID provided" });
    }

    const originalFilename = photo.originalname;
    const fileExtension = originalFilename.split(".").pop();
    const newFilename = `title.${fileExtension}`;

    const formData = new FormData();
    formData.append("photo", photo.buffer, {
      filename: newFilename,
      contentType: photo.mimetype,
    });
    formData.append("id", id);

    const response = await fetch("http://thedragonmm.com:8000/upload_title", {
      method: "POST",
      body: formData,
      headers: formData.getHeaders(),
    });

    if (!response.ok) {
      throw new Error(`Server responded with ${response.status}`);
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error("Error in upload handler:", error);
    return res
      .status(500)
      .json({ error: error.message || "Internal server error" });
  }
}
