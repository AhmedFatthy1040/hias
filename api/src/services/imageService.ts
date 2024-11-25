import pool from "../config/db";
import { Image } from "../models/image";

export class ImageService {

  static async uploadImage(name: string, url: string): Promise<Image> {
    const query = `
      INSERT INTO images (name, url, created_at)
      VALUES ($1, $2, NOW()) 
      RETURNING id, name, url, created_at
    `;

    const values = [name, url];
    try {
      const result = await pool.query(query, values);
      return result.rows[0]; // Return inserted image metadata
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error("Error inserting image into the database: " + error.message);
      } else {
        throw new Error("Unknown error occurred");
      }
    }
  }

  // Optional: You can create other methods for fetching or managing images.
}
