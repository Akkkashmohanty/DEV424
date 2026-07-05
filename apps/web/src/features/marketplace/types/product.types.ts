export interface Product {
    id: number

    seller_id: number

    name: string

    description: string

    price: number

    stock: number

    category: string

    image_url: string | null

    is_active: boolean

    created_at: string
}

export interface ProductCreate {
    name: string

    description: string

    price: number

    stock: number

    category: string

    image_url?: string | null
}

export interface ProductUpdate {
    name?: string

    description?: string

    price?: number

    stock?: number

    category?: string

    image_url?: string | null

    is_active?: boolean
}