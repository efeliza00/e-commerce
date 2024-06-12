import React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Rating } from 'react-simple-star-rating'
import { Button } from './ui/button';

type Product = {
    category: string;
    description: string;
    id: number;
    image: string;
    price: number;
    rating: {
        rate: string;
        count: number;
    };
    title: string;
};

type ProductCardProps = {
    product: Product;
    isAddtoCartButton?: "show" | "hide";
}

const ProductCard: React.FC<ProductCardProps> = ({ product, isAddtoCartButton = "show" }) => {
    return (
        <Card className='h-96 max-h-[30rem] w-full hover:bg-slate-100/95 dark:hover:bg-slate-900/30 duration-300 cursor-pointer'>
            <CardHeader className='h-2/3 w-full'>
                <div className='h-full relative'>
                    <Image sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" fill objectFit="contain" src={product?.image} quality={100} priority alt={product?.title} />
                </div>
            </CardHeader>
            <CardContent className='h-2/6'>
                <CardTitle className='max-h-full line-clamp-2'>{product.title}</CardTitle>
                <h4 className="text-muted-foreground scroll-m-20 text-lg font-mediumtracking-tight">
                    $ {product?.price}
                </h4>
                <Rating size={20} readonly initialValue={Number(product.rating?.rate)} allowFraction tooltipDefaultText={product.rating?.rate} />
            </CardContent>
            {isAddtoCartButton === "show" && (
                <CardFooter>
                    <Button size="lg" className='w-full text-white hover:bg-yellow-500/60 duration-300 group'>
                        Add to Cart <i className="ml-4 fi fi-rs-shopping-cart-add mt-1 group-hover:scale-[1.5] duration-300"></i>
                    </Button>
                </CardFooter>
            )}
        </Card>
    );
};

export default ProductCard;
