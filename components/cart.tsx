"use client"
import React from 'react'
import { Button } from './ui/button'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet'

const Cart = () => {

    return (
        <div>
            <Sheet>
                <SheetTrigger asChild>
                    <Button size="icon" variant="outline" className='rounded-full'>
                        <i className="fi fi-rs-shopping-cart mt-1"></i>
                    </Button>
                </SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>My Cart</SheetTitle>
                        <SheetDescription>
                            This action cannot be undone. This will permanently delete your account
                            and remove your data from our servers.
                        </SheetDescription>
                    </SheetHeader>
                </SheetContent>
            </Sheet>
        </div>
    )
}

export default Cart