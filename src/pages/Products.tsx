
import { useEffect, useState } from "react"
import supabase from "../config/supabase"

import { useDispatch } from "react-redux"
import type { AppDispatch } from "../store/Store"
import { loadProducts } from "../store/ProductsSlice"
import ProductItem from "../components/ProductItem"


export interface ProductTypes {
    id: number,
    name: string,
    description: string,
    price: number,
    images: string[],
    created_at: string,
    quantity: number
}
const Products = () => {
    const [products, setProducts] = useState<ProductTypes[]>([])
    const dispatch = useDispatch<AppDispatch>()

    const loadData = async () => {
        const res = await supabase.from('products').select('*')

        if (res.data) {
            setProducts(res.data)
            dispatch(loadProducts(res.data))
        }
    }

    useEffect(() => {
        loadData()
    }, [])
    console.log(products)

    return (
        <div>
            <h3 className="text-3xl mb-3">Products</h3>
            {products && products.map((productDetails) => {
                return <ProductItem key={productDetails.id} productDetails={productDetails} />
            })}
        </div>
    )
}

export default Products