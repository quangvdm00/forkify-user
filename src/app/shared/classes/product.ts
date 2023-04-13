import { Category } from "./category";
import { ProductImage } from "./product-image";
import { Shop } from "./shop";

// Products
export interface Product {
    id?: number;
    title?: string;
    type?: string;
    brand?: string;
    collection?: any[];
    category?: string;
    price?: number;
    sale?: boolean;
    discount?: number;
    stock?: number;
    new?: boolean;
    quantity?: number;
    tags?: any[];
    variants?: Variants[];
    // images?: Images[];

    //Back-end
    name?: string;
    description?: string;
    discountPercent?: number;
    cost?: number;
    averageRating?: number;
    reviewCount: number;
    sold: number;
    shop?: Shop;
    categories: Category[];
    images: ProductImage[];
}

export interface Variants {
    variant_id?: number;
    id?: number;
    sku?: string;
    size?: string;
    color?: string;
    image_id?: number;
}

export interface Images {
    image_id?: number;
    id?: number;
    alt?: string;
    src?: string;
    variant_id?: any[];
}