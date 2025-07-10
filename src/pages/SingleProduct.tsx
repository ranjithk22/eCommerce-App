import { useNavigate, useParams } from "react-router-dom"
import Navbar from "../components/Navbar"
import { useEffect, useState } from "react"
import type { ProductTypes } from "./Products"
import type { RootState } from "../store/Store"
import { useSelector } from "react-redux"

function SingleProduct() {
    const id = useParams().id
    const [product, setProduct] = useState<ProductTypes>({
        id: 0,
        name: '',
        description: '',
        price: 0,
        images: [],
        created_at: '',
        quantity: 0
    })
    const [currentImage, setCurrentImage] = useState<string>('')
    const productsData = useSelector((state: RootState) => state.productsData.products)
    const [cartItemQuantity, setCartItemQuantity] = useState<number>(1)
    const [errorMessage, setErrorMessage] = useState<string>('')

    const navigate = useNavigate()

    useEffect(() => {
        if (id) {
            let tempProduct = productsData.filter(item => item.id === Number(id))
            setProduct(tempProduct[0])
            setCurrentImage(tempProduct[0].images[0])
        }
    }, [])

    useEffect(() => {
        setCurrentImage(product.images[0])
    }, [product])

    const decrementQuantity = () => {
        if (cartItemQuantity > 1) {
            setCartItemQuantity(cartItemQuantity - 1)
            setErrorMessage('')
        }
        else if (cartItemQuantity === 1) {
            setErrorMessage('Minimum quantity is 1')
            setTimeout(() => {
                setErrorMessage('')
            }, 1000)
        }
    }
    const incrementQuantity = () => {
        if (cartItemQuantity < product.quantity) {
            setCartItemQuantity(cartItemQuantity + 1)
            setErrorMessage('')
        }
        else if (cartItemQuantity === product.quantity) {
            setErrorMessage(`The Maximum quanity is ${product.quantity}`)
            setTimeout(() => {
                setErrorMessage('')
            }, 1000)
        }
    }
    return (
        <div>
            <Navbar />
            <div className="container pt-5">
                <div className="flex justify-between">
                    <h2 className="text-3xl">Product Details</h2>
                    <button className="btn-sm" onClick={() => navigate('/')}>Back to all products</button>
                </div>
                <div className="flex my-5 gap-3">
                    <div>
                        {product.images.length > 1 && (
                            <div>
                                {product.images.map((item, index) => <img className="w-[100px] mb-5 rounded-md border border-gray-300 cursor-pointer" key={index} src={item} onClick={() => setCurrentImage(item)} />)}
                            </div>
                        )}
                    </div>
                    <div className="flex-3/5">
                        {currentImage && <img className="w-[100%] mb-5" src={currentImage} alt="" />}

                    </div>
                    <div className="flex-2/5 w-[400px] border border-gray-300 p-2">
                        <h3 className="text-3xl">{product.name}</h3>
                        <p className="my-3 text-xl">Price:₹{product.price}</p>
                        <p>Description: {product.description}</p>
                        <div className="my-3 flex gap-2">
                            <span>Quantity:</span>
                            <div className="flex gap-2 justify-start">
                                <button className="btn-sm" onClick={decrementQuantity}>-</button>
                                <input type="text" value={cartItemQuantity} className="w-[20px] text-center focus-visible:outline-none"
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCartItemQuantity(Number(e.target.value))} />
                                <button className="btn-sm" onClick={incrementQuantity}>+</button>
                            </div>
                        </div>
                        {cartItemQuantity > product.quantity && <p className="text-sm text-red-400 mt-2">The no of products in stock are less than {product.quantity + 1}</p>}
                        {errorMessage && <p className="text-sm text-red-400 mt-2">{errorMessage}</p>}
                        <button className="btn mt-3" disabled={cartItemQuantity > product.quantity} onClick={() => console.log('Clicked')}>Add to Cart</button>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default SingleProduct