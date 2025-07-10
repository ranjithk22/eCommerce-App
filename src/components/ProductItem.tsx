import { useNavigate } from "react-router-dom"
import type { ProductTypes } from "../pages/Products"


function ProductItem({ productDetails }: { productDetails: ProductTypes }) {

    const navigate = useNavigate()

    const onProductDetailsClick = () => {
        navigate(`/products/${productDetails.id}`)
    }
    return (
        <>
            {productDetails && (
                <div className="flex items-center justify-between border-2 border-gray-400 p-3 bg-gray-100 rounded-2xl mb-3 gap-2">
                    <div className="flex items-center">
                        <img className="w-[100px] mr-2" src={productDetails.images[0]} alt="" />
                        <h3 className="text-2xl">{productDetails.name}</h3>
                    </div>

                    <div> ₹{productDetails.price} </div>
                    <div>
                        <button className="btn-sm mr-2" onClick={onProductDetailsClick}>More Details</button>
                    </div>
                </div>
            )}
        </>
    )
}

export default ProductItem