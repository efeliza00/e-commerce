
import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import React from 'react'

const ProductsLayout = ({ children, product }: {
    children: React.ReactNode
    product: React.ReactNode

}) => {
    return (
        <div className="px-0 relative h-screen max-h-screen container">
            <Navbar />
            {children}
            {product}
            <Footer />
        </div>
    )
}

export default ProductsLayout