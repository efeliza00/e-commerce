import React from 'react'

const ItemLayout = ({ children, product }: {
    children: React.ReactNode
    product: React.ReactNode

}) => {
    return (
        <div className="px-0 relative h-screen max-h-screen container">
            {children}
            {product}
        </div>
    )
}

export default ItemLayout