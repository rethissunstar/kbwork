import AWS from "aws-sdk";
import fs from "fs/promises";
import { createReadStream } from "fs";
import path from "path";
import deskmatData from "../seeds/deskmatData.json" assert { type: "json" };
import dotenv from "dotenv";

dotenv.config();

// Configure AWS SDK
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

// Create S3 service object
const s3 = new AWS.S3();

// Upload images to S3
async function uploadImages() {
  const currentDirectory = path.dirname(new URL(import.meta.url).pathname);
  const imageDir = path.join(currentDirectory, "../assets/images/deskmats");
  const images = await fs.readdir(imageDir);

  for (const image of images) {
    const imagePath = path.join(imageDir, image);
    const imageStream = createReadStream(imagePath);
    const key = `product-images/${image}`;

    // Extract imageRef from image filename
    const imageRef = parseInt(image.split(".")[0]); // Assumes image filename is the reference number, like 1.jpg

    // Upload image to S3
    const params = {
      Bucket: "kb-fanatics-deskmats",
      Key: key,
      Body: imageStream,
      ACL: "public-read",
    };

    const s3UploadResponse = await s3.upload(params).promise();

    // Update the seedData with the new imageURL
    const product = deskmatData.find((p) => p.imageRef === imageRef);
    if (product) {
      product.imageURL = s3UploadResponse.Location;
    }
  }

  const deskmatDataPath = path.join(currentDirectory, "../seeds/deskmatData.json");
  await fs.writeFile(deskmatDataPath, JSON.stringify(deskmatData, null, 2));
}

uploadImages().catch(console.error);
