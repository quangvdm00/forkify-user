// Products
export interface Product {
    // id?: number;
    // title?: string;
    // description?: string;
    // type?: string;
    // brand?: string;
    // collection?: any[];
    // category?: string;
    // price?: number;
    // sale?: boolean;
    // discount?: number;
    // stock?: number;
    // new?: boolean;
    // quantity?: number;
    // tags?: any[];
    // variants?: Variants[];
    // images?: Images[];

    id?: number;
    name?: string;
    description?: string;
    isEnabled?: boolean;
    discountPercent?: number;
    cost?: number;
    averageRating?: string;
    reviewCount?: string;
    sold?: string;
    shop: Shop;
    categories?: Category[];
    images?: Image[];
    comment?: string[];

    //
    quantity?: number;
}

export interface Image {
    id?: number;
    imageUrl?: string;
    productId?: number;
}

export interface Shop {
    id?: number;
    name?: string;
    description?: string;
    imageUrl?: string;
    isEnabled?: boolean;
    isStudent?: boolean;
    userId?: number;
    lat: string;
    lng: string;
}

export interface Category {
    id?: number;
    name?: string;
    imageUrl?: string;
}

export interface Variants {
    variant_id?: number;
    id?: number;
    sku?: string;
    size?: string;
    color?: string;
    image_id?: number;
}

// export interface Images {
//     image_id?: number;
//     id?: number;
//     alt?: string;
//     src?: string;
//     variant_id?: any[];
// }
