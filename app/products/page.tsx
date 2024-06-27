"use client"
import { getProductCategories, getProducts, getSuggestedProducts } from '@/api/products'
import Link from 'next/link'
import ProductCard from '@/components/product-card'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { useQuery, useQueryClient, useSuspenseQuery } from '@tanstack/react-query'
import React, { Suspense, useEffect } from 'react'
import { Controller, FormProvider, useForm, useFormContext } from 'react-hook-form'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import Loading from './item/[id]/loading'

type FilterProductsForm = {
    category: string;
    sort: string;

}
const FilterProducts = () => {
    const { categories } = useProductsList()
    const { control } = useFormContext<FilterProductsForm>();

    return (
        <Controller
            control={control}
            name="category"
            render={({ field: { onChange } }) => (<ToggleGroup defaultValue="products" type="single" onValueChange={onChange} className="grid grid-cols-3 lg:grid-cols-6 justify-center " >
                <ToggleGroupItem variant="outline" value="products" aria-label="Toggle bold" className="capitalize hover:bg-yellow-200/90 data-[state=on]:bg-yellow-300">
                    All Products
                </ToggleGroupItem>
                <>
                    {categories?.map((category, index) => (
                        <ToggleGroupItem
                            color="yellow"
                            key={index}
                            value={category}
                            variant="outline"
                            aria-label={`Toggle ${category}`}
                            className="capitalize hover:bg-yellow-200/90 data-[state=on]:bg-yellow-300"
                        >
                            {category}
                        </ToggleGroupItem>
                    ))}
                </>
                <Controller
                    control={control}
                    name="sort"
                    render={({ field: { onChange } }) => <Select onValueChange={onChange}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Sort" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Sort</SelectLabel>
                                <SelectItem value="desc">
                                    <i className="fi fi-rr-arrow-small-up mr-2"></i>
                                    <span>
                                        High to Low
                                    </span>
                                </SelectItem>
                                <SelectItem value="asc">
                                    <i className="fi fi-rr-arrow-small-down mr-2"></i>
                                    <span>
                                        Low to High
                                    </span>
                                </SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>}
                />
            </ToggleGroup>)}
        />
    );
};

const ProductsList = () => {
    const queryClient = useQueryClient()
    const { watch } = useFormContext<FilterProductsForm>();
    const category = watch('category')
    const sort = watch('sort')
    const { data: products, isPending } = useQuery({ queryKey: ["products"], queryFn: async () => await getProducts(category, sort), enabled: !!category })



    useEffect(() => {
        queryClient.invalidateQueries({ queryKey: ['products'] })
    }, [category, sort, queryClient])

    return <div className="col-span-12 px-6 ">
        <FilterProducts />
        {!isPending ? <ul className='grid grid-cols-1 lg:grid-cols-4 gap-4 mt-4 py-10 lg:py-0'>
            {products?.map(product =>
                <Link href={`/products/item/${product.id}`} key={product.id} scroll={false} >
                    <li>
                        <ProductCard isAddtoCartButton='hide' product={product} />
                    </li>
                </Link>
            )}
        </ul> : <Loading />}
    </div>
}
const useProductsList = () => {
    const methods = useForm<FilterProductsForm>()
    const { data: categories } = useSuspenseQuery({ queryKey: ["categories"], queryFn: getProductCategories })
    const { data: suggestedProducts } = useSuspenseQuery({ queryKey: ["hero-shop"], queryFn: getSuggestedProducts })


    useEffect(() => {
        methods.reset({
            category: "products",
            sort: "asc",
        })

    }, [methods])

    return {
        methods,
        categories,
        suggestedProducts
    }
}

const ProductsPage = () => {
    const { methods, suggestedProducts } = useProductsList()

    return (
        <FormProvider {...methods} >
            <div className="lg:py-20 grid grid-cols-12 gap-2 bg-white dark:bg-zinc-900 border-y">
                <div className="px-6 mt-10 lg:mt-0 col-span-12">
                    <h1 className="scroll-m-20 w-full text-center text-yellow-300 col-span-12 pb-2 text-5xl font-semibold tracking-tight first:mt-0">
                        Products you might like
                    </h1>
                    <Carousel className="w-full max-w-2xl mx-auto col-span-12 mt-4">
                        <CarouselContent>
                            <Suspense fallback={<div>loading..</div>}>
                                {suggestedProducts?.map((suggestedProduct) => <CarouselItem key={suggestedProduct.id} className="md:basis-1/2 lg:basis-1/2">
                                    <Link href={`/products/item/${suggestedProduct.id}`}>
                                        <ProductCard isAddtoCartButton='hide' product={suggestedProduct} />
                                    </Link>
                                </CarouselItem>)}
                            </Suspense>
                        </CarouselContent>
                        <CarouselPrevious className='hidden md:block h-11 w-11' />
                        <CarouselNext className='hidden md:block h-11 w-11' />
                    </Carousel>
                </div>
                <div className="py-8 md:py-10 lg:py-10 bg-yellow-300 col-span-12 mt-24">
                    <h1 className="text-center scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                        Products
                    </h1>
                </div>
                <ProductsList />
            </div>
        </FormProvider>
    )
}
export default ProductsPage