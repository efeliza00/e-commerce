import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import React from 'react'

const ProductsLayout = ({ children, product }: {
    children: React.ReactNode
    product: React.ReactNode

}) => {
    return (
        <>
            {children}
            {product}
        </>
    )
}

export default ProductsLayout