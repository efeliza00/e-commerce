"use client"

import React, { useEffect, useMemo } from 'react'
import Image from 'next/image'
import { getItemProduct } from '@/api/products'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import { Rating } from 'react-simple-star-rating'
import { Button } from '@/components/ui/button'
import { FormProvider, useForm, useFormContext } from 'react-hook-form'
import { useToast } from '@/components/ui/use-toast'

type ProductForm = {
    productId: number;
    quantity: number;
}

const useProduct = () => {
    const params = useParams<{ id: string }>()
    const { data, isFetching } = useQuery({ queryKey: ["product"], queryFn: async () => await getItemProduct(params?.id), enabled: !!params?.id })

    return {
        data,
        isFetching
    }
}

const useProductForm = () => {
    const params = useParams<{ id: string }>()
    const router = useRouter()
    const methods = useForm<ProductForm>()
    const { toast } = useToast()
    const queryClient = useQueryClient()

    useEffect(() => {
        methods.reset({
            productId: Number(params?.id),
            quantity: 0
        })
    }, [methods, params])

    const addToCartMutation = useMutation({
        mutationFn: (formData: ProductForm) => {
            return fetch(`${process.env.NEXT_PUBLIC_FAKESTORE_API}/carts`, {
                method: "POST",
                body: JSON.stringify(
                    {
                        userId: 1,
                        date: Date.now(),
                        products: [{ ...formData }]
                    }
                )
            })
        }
    })

    const onSubmitToCart = (formData: ProductForm) => {
        addToCartMutation.mutate(formData, {
            onSuccess: () => {
                router.back()
                queryClient.invalidateQueries({ queryKey: ['my-cart'] })
                toast({
                    variant: "default",
                    title: "Added To Cart",
                    description: "An item has been added to cart please. Check your cart for checkout.",
                })
            },
            onError: (context) => {
                toast({
                    variant: "default",
                    title: "Failed Adding To Cart",
                    description: `${context.message}`,
                })
            }
        })
    }

    return {
        methods,
        handleSubmit: methods.handleSubmit(onSubmitToCart)
    }
}



const QuantityCounterInput = () => {
    const { register, setValue, watch } = useFormContext<ProductForm>()

    const quantity = watch('quantity')
    return (
        <>
            <Button
                disabled={quantity === 0}
                onClick={(e) => {
                    e.preventDefault()
                    if (quantity > 0) {
                        setValue('quantity', quantity - 1)
                    }
                }}
            >-</Button>
            <input {...register('quantity')} type="number" className='h-10 w-1/2 rounded-md border border-input bg-background px-3 py-2 text-sm outline-none text-center file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50' />
            <Button onClick={(e) => {
                e.preventDefault()
                setValue('quantity', quantity + 1)
            }}>+</Button>
        </>
    )
}

const ProductAddToCart = () => {
    const { handleSubmit } = useProductForm()
    const { watch } = useFormContext<ProductForm>()

    const quantity = watch('quantity')
    return (
        <form onSubmit={handleSubmit} >
            <div className='grid grid-cols-12 gap-5 lg:gap-0 mt-4 border-t pt-4'>
                <div className='col-span-12 lg:col-span-4'>
                    <QuantityCounterInput />
                </div>
                <div className='col-span-12 lg:col-span-8'>
                    <Button disabled={quantity === 0} type="submit" className='mx-auto w-full text-white hover:bg-yellow-500/60 duration-300 group'>
                        Add to Cart <i className="ml-4 fi fi-rs-shopping-cart-add mt-1 group-hover:scale-[1.5] duration-300"></i>
                    </Button>
                </div>
            </div>
        </form>
    )
}

const ProductItem = () => {
    const { data } = useProduct()

    const product = useMemo(() => {
        if (data) {
            return data
        }
    }, [data])

    return (
        <div className='grid grid-cols-12 gap-4 px-6 py-4'>
            <div className="col-span-12 lg:col-span-5 m-auto">
                <Image className='max-h-96 h-auto w-full' src={product?.image as string} width={1920} height={1080} alt={`${product?.title}`} priority />
            </div>
            <div className="col-span-12 lg:col-span-7 m-auto w-full">
                <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                    {product?.title}
                </h2>
                <h2 className="scroll-m-20 mt-2 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                    $ {product?.price}
                </h2>
                <Rating size={20} readonly initialValue={Number(product?.rating?.rate)} allowFraction tooltipDefaultText={product?.rating?.rate} />
                <span className="mt-1">
                    {`(${product?.rating?.count})`}
                </span>
                <p className="text-muted-foreground scroll-m-20 text-lg font-semibold tracking-tight">
                    Description
                </p>
                <p className="leading-6 text-sm [&:not(:first-child)]:mt-3">
                    {product?.description}
                </p>
                <ProductAddToCart />
            </div>
        </div>
    )
}

const ProductItemDetails = () => {
    const { methods } = useProductForm()

    return <FormProvider {...methods}>
        <ProductItem />
    </FormProvider>
}

export default ProductItemDetails