import mongoose from "mongoose";

const variantSchema = new mongoose.Schema(
  {
    name: { type: String }, // e.g. Size / Color
    value: { type: String }, // e.g. XL / Red
    price: { type: Number },
    stock: { type: Number, default: 0 },
    sku: { type: String }
  },
  { _id: false }
);

const reviewSummarySchema = new mongoose.Schema(
  {
    averageRating: { type: Number, default: 0 },
    totalReviews: { type: Number, default: 0 }
  },
  { _id: false }
);

const shippingSchema = new mongoose.Schema(
  {
    weight: Number,
    dimensions: {
      length: Number,
      width: Number,
      height: Number
    },
    isFreeShipping: { type: Boolean, default: false }
  },
  { _id: false }
);

const productSchema = new mongoose.Schema(
  {
    // BASIC INFO
    name: {
      type: String,
      required: true,
      trim: true
    },

    slug: {
      type: String,
      default: 'product-slug',
      lowercase: true
    },

    description: {
      type: String
    },

    shortDescription: String,

    brand: {
      type: String,
      index: true
    },

    // CATEGORY
    category: {
      type: String,
      required: true
    },

    subcategory: {
      type: String
    },
    brand: {
      type: String
    },

    // PRICING
    price: {
      type: Number,
      required: true
    },

    salePrice: Number,

    costPrice: Number,

    currency: {
      type: String,
      default: "INR"
    },

    // INVENTORY
    stock: {
      type: Number,
      default: 0
    },

    sku: {
      type: String,
      unique: true
    },

    lowStockThreshold: {
      type: Number,
      default: 5
    },

    // VARIANTS
    variants: [variantSchema],

    // IMAGES
    images: [
      {
        url: String,
        alt: String
      }
    ],

    defaultImage: String,

    // RATINGS
    reviewsSummary: reviewSummarySchema,

    // SHIPPING
    shipping: shippingSchema,

    // FLAGS
    isFeatured: {
      type: Boolean,
      default: false
    },

    isActive: {
      type: Boolean,
      default: true
    },

    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "published"
    },

    // SEO
    metaTitle: String,
    metaDescription: String,

    tags: [String]
  },
  { timestamps: true }
);

export default mongoose.model("products", productSchema);
