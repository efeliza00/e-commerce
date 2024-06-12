import React from 'react'

const ItemLayout = ({ children, product }: {
    children: React.ReactNode
    product: React.ReactNode

}) => {
    return (
        <div className='min-h-full'>
            {children}
            {product}
        </div>
    )
}

export default ItemLayout