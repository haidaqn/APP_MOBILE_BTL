export interface RootInvoice {
    totalCount: number;
    success: boolean;
    users: Invoice[]
}

export interface Invoice {
  _id: string
  products: ProductInvoice[]
  status: string
  total: number
  orderBy: string
  createdAt: string
  updatedAt: string
  __v: number
}

export interface ProductInvoice {
  product_id: string
  count: number
  price: number
  _id: string
}
