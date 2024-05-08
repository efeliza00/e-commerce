"use client"
import { useContext, useRef } from 'react'
import Image from 'next/image'
import { Carousel, CarouselContent, CarouselItem } from './ui/carousel'
import Autoplay from "embla-carousel-autoplay"
import { ContextProducts } from '@/app/page'

const HeroCards = () => {
    const products = useContext(ContextProducts) || []
    const plugin = useRef(
        Autoplay({ delay: 4000 })
    )

    return (
        <Carousel
            plugins={[plugin.current]}
            className="w-full max-w-xs"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
        >
            <CarouselContent>
                {products?.map((product) => (
                    <CarouselItem key={product?.id}>
                        <Image className='h-96 w-full' src={product?.image} width={1920} height={1080} alt={`${product?.title}`} priority />
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
    )
}

export default HeroCards