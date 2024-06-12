"use client"
import Image from "next/image";
import { getHeroProducts } from "@/api/products";
import { aboutUs } from "@/components/constants/about-us";
import ProductCard from "@/components/product-card";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createContext, useContext } from "react";
import HeroCards from "@/components/hero-cards";

type Product = {
  category: string;
  description: string;
  id: number
  image: string
  price: number
  rating: {
    rate: string;
    count: number;
  }
  title: string;
}

export const ContextProducts = createContext<Product[]>([])



const ChooseUsSection = () => {
  return <div className="w-full px-6 lg:py-24 grid grid-cols-12 mt-4 lg:mt-0">
    <div className="col-span-12" >
      <h2 className="text-center scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Why Choose Us?
      </h2>
      <div className="grid gap-5 grid-cols-1 lg:grid-cols-4 grid-flow-row mt-4 py-10 lg:py-0 ">
        {aboutUs.map(about => (<Card className="col-span-1 hover:bg-slate-100/100 dark:bg-slate-900 dark:hover:bg-slate-800/100 group cursor-default drop-shadow-none duration-300" key={about.id}>
          <CardHeader className="h-auto w-full ">
            <div className="h-10 w-10 relative rounded-full group-hover:scale-110 duration-300">
              <Image className="p-2 rounded-xl border bg-slate-white dark:bg-white" src={`${about.icon}`} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" fill alt={about.title} />
            </div>
            <CardTitle>{about.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              {about.description}
            </CardDescription>
          </CardContent>
        </Card>))}
      </div>
    </div>
  </div>
}

const SampleProductsSection = () => {
  const products = useContext(ContextProducts) as Product[]

  return (<div className="px-6 lg:py-24 grid grid-cols-1 lg:grid-cols-12 gap-2 bg-white dark:bg-zinc-900 border-y">
    <div className="col-span-3 flex flex-col py-10 lg:py-0 items-center justify-center ">
      <h2 className="scroll-m-20 border-b pb-2 text-3xl  text-yellow-300 font-semibold tracking-wider first:mt-0">
        Unlock Style and Innovation
      </h2>
      <p className="text-sm text-muted-foreground mt-2">Explore Our Collection of Electronics, Jewelry, and Clothing.</p>
    </div>
    <div className="col-span-9 py-10 lg:py-0 h-full w-full">
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full h-full"
      >
        <CarouselContent>
          {products?.map(product => (<CarouselItem key={product.id} className="md:basis-1/2 lg:basis-1/3">
            <ProductCard product={product} />
          </CarouselItem>))}
        </CarouselContent>
      </Carousel>
    </div>
  </div>)
}


export default function Homepage() {
  const { data: products } = useSuspenseQuery({ queryKey: ["hero-shop"], queryFn: getHeroProducts })



  return (
    <ContextProducts.Provider value={products}>
      <div className="h-full w-full">
        <div className="grid grid-cols-12 h-[86%] px-6 py-6 lg:py-0 w-full">
          <div className="col-span-12 md:col-span-7 flex items-center justify-end h-full ">
            <h1 className="scroll-m-20 text-5xl font-extrabold tracking-tight lg:text-6xl">
              Experience the Difference at <span className=" lg:text-7xl text-yellow-300">
                Mobo Market</span>. Start exploring <span className="text-red-500">today!</span>
            </h1>
          </div>
          <div className="col-span-5 items-center justify-center h-full w-full py-4 hidden md:flex">
            <HeroCards />
          </div>
        </div>
        <SampleProductsSection />
        <ChooseUsSection />
      </div>
    </ContextProducts.Provider>
  );
}

