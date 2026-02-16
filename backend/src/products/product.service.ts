import mongoose from "mongoose";
import path from "path";
import { randomUUID } from "crypto";
import type { Request, Response } from "express";
import productModel from "./product.model.js";
import userModel from "../users/user.model.js";
import * as awsS3Service from "../aws-s3/aws-s3.service.js";
import e from "express";

type ProductUpdatePayload = {
  title?: string;
  description?: string;
  quantity?: number;
  price?: number;
  images?: string[];
};

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getImageFiles(req: Request) {
  if (!Array.isArray(req.files)) {
    return [] as Express.Multer.File[];
  }

  return req.files as Express.Multer.File[];
}

async function uploadProductImages(files: Express.Multer.File[]) {
  if (!files.length) {
    return [] as string[];
  }

  const uploads = files.map(async (file) => {
    const ext = path.extname(file.originalname || "");
    const key = `images/${randomUUID()}${ext}`;
    await awsS3Service.uploadFile({
      key,
      buffer: file.buffer,
      contentType: file.mimetype,
    });
    return key;
  });

  return Promise.all(uploads);
}

async function deleteProductImages(keys: string[]) {
  if (!keys.length) {
    return;
  }

  await Promise.all(keys.map((key) => awsS3Service.deleteFile(key)));
}

async function getAllProducts(req: Request, res: Response) {
  const query = typeof req.query.t === "string" ? req.query.t.trim() : "";

  if (query) {
    await sleep(300);
    const regex = new RegExp(`^${query}`, "i");
    const products = await productModel.find({
      title: regex,
    });
    return res.json(products);
  }

  const products = await productModel.find();
  res.json(products);
}

async function createProduct(req: Request, res: Response) {
  const { title, description, quantity, price } = req.body;
  const imageFiles = getImageFiles(req);

  if (!req.userId) {
    return res.status(401).json({ message: "token is invalid" });
  }

  if (imageFiles.length === 0) {
    return res.status(400).json({ message: "at least one image is required" });
  }

  let uploadedImages: string[] = [];

  try {
    uploadedImages = await uploadProductImages(imageFiles);
    const newProduct = await productModel.create({
      title,
      description,
      quantity,
      price,
      images: uploadedImages,
      author: new mongoose.Types.ObjectId(req.userId),
    });

    await userModel.findByIdAndUpdate(req.userId, {
      $push: {
        products: {
          product: newProduct._id,
          title: newProduct.title,
          price: newProduct.price,
        },
      },
    });

    res.status(201).json(newProduct);
  } catch (error) {
    await deleteProductImages(uploadedImages);
    res.status(500).json({ message: "failed to create product" });
  }
}

async function getProductById(req: Request, res: Response) {
  const id = req.params.id;
  const product = await productModel.findById(id);

  if (!product) {
    return res.status(404).json({ message: "product not found" });
  }

  res.json(product);
}

async function deleteProduct(req: Request, res: Response) {
  const id = req.params.id;

  const deletedProduct = await productModel.findByIdAndDelete(id);
  if (!deletedProduct) {
    return res.status(404).json({ message: "product not found" });
  }

  await deleteProductImages(deletedProduct.images || []);

  await userModel.updateMany(
    { "products.product": deletedProduct._id },
    { $pull: { products: { product: deletedProduct._id } } },
  );

  res.json({ message: "product deleted" });
}

async function updateProduct(req: Request, res: Response) {
  const id = req.params.id;
  const { title, description, quantity, price } = req.body;
  const imageFiles = getImageFiles(req);

  const updates: ProductUpdatePayload = {};
  if (title !== undefined) updates.title = title;
  if (description !== undefined) updates.description = description;
  if (quantity !== undefined) updates.quantity = quantity;
  if (price !== undefined) updates.price = price;

  const existingProduct = await productModel.findById(id);
  if (!existingProduct) {
    return res.status(404).json({ message: "product not found" });
  }

  let uploadedImages: string[] = [];

  try {
    if (imageFiles.length > 0) {
      uploadedImages = await uploadProductImages(imageFiles);
      updates.images = uploadedImages;
    }

    const updatedProduct = await productModel.findByIdAndUpdate(id, updates, {
      returnDocument: "after",
    });

    if (!updatedProduct) {
      await deleteProductImages(uploadedImages);
      return res.status(404).json({ message: "product not found" });
    }

    if (uploadedImages.length > 0) {
      await deleteProductImages(existingProduct.images || []);
    }

    if (title !== undefined || price !== undefined) {
      try {
        await userModel.updateMany(
          { "products.product": updatedProduct._id },
          {
            $set: {
              "products.$[p].title": updatedProduct.title,
              "products.$[p].price": updatedProduct.price,
            },
          },
          { arrayFilters: [{ "p.product": updatedProduct._id }] },
        );
      } catch {
        console.log(e);
      }
    }

    res.json(updatedProduct);
  } catch (error) {
    await deleteProductImages(uploadedImages);
    res.status(500).json({ message: "failed to update product" });
  }
}

export const ProductService = {
  getAllProducts,
  createProduct,
  getProductById,
  deleteProduct,
  updateProduct,
};
