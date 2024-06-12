"use client"

import { useEffect, useMemo } from 'react'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import { getItemProduct } from '@/api/products'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Rating } from 'react-simple-star-rating'
import { Button } from '@/components/ui/button'
import { FormProvider, useForm, useFormContext } from 'react-hook-form'
import { useToast } from '@/components/ui/use-toast'

type ProductModalForm = {
    productId: number;
    quantity: number;
}

const useProductModal = () => {
    const params = useParams<{ id: string }>()
    const { data, isFetching } = useQuery({ queryKey: ["product"], queryFn: async () => await getItemProduct(params?.id), enabled: !!params?.id })

    return {
        data,
        isFetching
    }
}

const useProductModalForm = () => {
    const params = useParams<{ id: string }>()
    const router = useRouter()
    const methods = useForm<ProductModalForm>()
    const { toast } = useToast()
    const queryClient = useQueryClient()

    useEffect(() => {
        methods.reset({
            productId: Number(params?.id),
            quantity: 0
        })
    }, [methods, params])

    const addToCartMutation = useMutation({
        mutationFn: (formData: ProductModalForm) => {
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

    const onSubmitToCart = (formData: ProductModalForm) => {
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
        onSubmitToCart
    }
}

const QuantityCounterInput = () => {
    const { register, setValue, watch } = useFormContext<ProductModalForm>()

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
            <input {...register('quantity')} type="number" className='h-10 w-[3.5rem] border border-input bg-background px-3 py-2 text-sm outline-none text-center file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50' />
            <Button onClick={(e) => {
                e.preventDefault()
                setValue('quantity', quantity + 1)
            }}>+</Button>
        </>
    )
}

const ProductModal = () => {
    const router = useRouter()
    const { data } = useProductModal()
    const { onSubmitToCart } = useProductModalForm()
    const { handleSubmit, watch } = useFormContext<ProductModalForm>()


    const product = useMemo(() => {
        if (data) {
            return data
        }
    }, [data])

    const quantity = watch('quantity')


    return (
        <>
            {product && <Dialog open={!!product}
                onOpenChange={(isOpen) => {
                    if (!isOpen) {
                        router.back()
                    }
                }}
            >
                <DialogContent className='max-w-96 lg:max-w-full max-h-96 overflow-auto' showCloseButton='show'>
                    <form onSubmit={handleSubmit(onSubmitToCart)}>
                        <div className="grid grid-cols-4 gap-10  " >
                            <div className='col-span-4 lg:col-span-2 m-auto w-2/3' >
                                <Image className='max-h-96 h-auto mx-auto' src={product?.image as string} width={1920} height={1080} alt={`${product?.title}`} priority />
                            </div>
                            <div className="px-4 max-h-full w-full col-span-4 lg:col-span-2 ">
                                <h3 className="scroll-m-20 border-b text-lg font-semibold tracking-tight">
                                    {product.title}
                                </h3>
                                <h2 className="scroll-m-20 mt-2 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                                    $ {product.price}
                                </h2>
                                <Rating size={20} readonly initialValue={Number(product.rating?.rate)} allowFraction tooltipDefaultText={product.rating?.rate} />
                                <span className="mt-1">
                                    {`(${product.rating?.count})`}
                                </span>
                                <p className="text-muted-foreground scroll-m-20 text-lg font-semibold tracking-tight">
                                    Description
                                </p>
                                <p className="leading-6 text-sm [&:not(:first-child)]:mt-3">
                                    {product.description}
                                </p>
                                <div className="mt-2">
                                    <QuantityCounterInput />
                                </div>
                                <Button disabled={quantity === 0} type="submit" size="lg" className='mt-4 w-full text-white hover:bg-yellow-500/60 duration-300 group'>
                                    Add to Cart <i className="ml-4 fi fi-rs-shopping-cart-add mt-1 group-hover:scale-[1.5] duration-300"></i>
                                </Button>
                            </div>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>}
        </>
    )
}


const ProductModalDetail = () => {
    const { methods } = useProductModalForm()

    return (
        <FormProvider {...methods}>
            <ProductModal />
        </FormProvider>
    )
}

export default ProductModalDetail