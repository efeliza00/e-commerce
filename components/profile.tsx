"use client"
import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Button } from './ui/button'
import DarkModeToggle from './darkmode-toggle'
import Link from 'next/link'
import { submitLogout } from '@/app/login/actions'


const Profile = () => {
    return (
        <DropdownMenu modal>
            <DropdownMenuTrigger asChild >
                <Button variant="outline" size="icon" className='rounded-full'><i className="fi fi-rr-user" ></i></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        Profile
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <div className='flex justify-between items-center px-2 py-1 text-sm'>
                        Dark Mode
                        <DarkModeToggle />
                        <span className="sr-only">Toggle Dark Mode</span>
                    </div>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={(() => submitLogout())}>Log out</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default Profile