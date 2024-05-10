"use client"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import DarkModeToggle from "./darkmode-toggle"
import { useState } from "react"
import classnames from "classnames"
import Cart from "./cart"
import Profile from "./profile"
import { usePathname } from "next/navigation"

const MobileNavbar = ({ isOpenNavbar }: { isOpenNavbar: boolean }) => {
    const pathname = usePathname()

    return <div className={`fixed w-full h-full -inset-2 z-40 bg-slate-50 dark:bg-zinc-950 overflow-hidden md:hidden p-4 transition-transform duration-500 ${classnames({ "-translate-x-full pointer-events-none": !isOpenNavbar, "translate-x-0": isOpenNavbar })}`}>
        <div className="md:hidden">
            <DarkModeToggle />
            <span className="sr-only">Toggle navigation menu</span>
        </div>
        <ul className="flex-1 grid w-full px-6 py-4 font-semibold text-2xl gap-10">
            <Link href="/"><span className={`${pathname === "/" && 'text-yellow-500'} tracking-wide inline-block relative duration-300 hover:text-primary after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-[0.25s] after:ease-[ease-out] after:scale-x-0 after:left-0 after:bottom-0 hover:after:origin-bottom-left hover:after:scale-x-100`}>Home</span></Link>
            <Link href="/products"><span className={`${pathname === "/products" && 'text-yellow-500'} tracking-wide inline-block relative duration-300 hover:text-primary after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-[0.25s] after:ease-[ease-out] after:scale-x-0 after:left-0 after:bottom-0 hover:after:origin-bottom-left hover:after:scale-x-100`}>Products</span></Link>
            <Link href="/about"><span className={`${pathname === "/about" && 'text-yellow-500'} tracking-wide inline-block relative duration-300 hover:text-primary after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-[0.25s] after:ease-[ease-out] after:scale-x-0 after:left-0 after:bottom-0 hover:after:origin-bottom-left hover:after:scale-x-100`}>About Us</span></Link>
            <Link href="/contact"><span className={`${pathname === "/contact" && 'text-yellow-500'} tracking-wide inline-block relative duration-300 hover:text-primary after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-[0.25s] after:ease-[ease-out] after:scale-x-0 after:left-0 after:bottom-0 hover:after:origin-bottom-left hover:after:scale-x-100`}>Contact Us</span></Link>
        </ul>
    </div>
}

export default function Navbar() {
    const [isOpenNavbar, setIsOpenNavbar] = useState<boolean>(false)
    const pathname = usePathname()

    return (
        <header className="flex items-center h-14 px-4 border-b lg:h-20 md:px-6 space-x-2 justify-between">
            <Link className="flex items-center space-x-2 text-sm font-semibold lg:space-x-4" href="/">
                <Image src={`https://img.icons8.com/3d-fluency/100/shopaholic.png`} alt="mobo-market-logo" width={32} height={32} />
                <span className="font-semibold text-lg  ">Mobo Market</span>
            </Link>
            <nav className="ml-auto space-x-4 lg:space-x-6 hidden md:block">
                <Link className="text-primary font-bold" href="/" >
                    <span className="tracking-wide inline-block relative duration-300 hover:text-primary after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-[0.25s] after:ease-[ease-out] after:scale-x-0 after:left-0 after:bottom-0 hover:after:origin-bottom-left hover:after:scale-x-100">Home</span>
                </Link>
                <Link href="/products"><span className={`${pathname === "/products" && 'text-yellow-500'} tracking-wide inline-block relative duration-300 hover:text-primary after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-[0.25s] after:ease-[ease-out] after:scale-x-0 after:left-0 after:bottom-0 hover:after:origin-bottom-left hover:after:scale-x-100`}>Products</span></Link>
                <Link href="/about"><span className={`${pathname === "/about" && 'text-yellow-500'} tracking-wide inline-block relative duration-300 hover:text-primary after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-[0.25s] after:ease-[ease-out] after:scale-x-0 after:left-0 after:bottom-0 hover:after:origin-bottom-left hover:after:scale-x-100`}>About Us</span></Link>
                <Link href="/contact"><span className={`${pathname === "/contact" && 'text-yellow-500'} tracking-wide inline-block relative duration-300 hover:text-primary after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-[0.25s] after:ease-[ease-out] after:scale-x-0 after:left-0 after:bottom-0 hover:after:origin-bottom-left hover:after:scale-x-100`}>Contact Us</span></Link>
            </nav>
            <div className="hidden md:flex md:flex-shrink gap-2">
                <Cart />
                <span className="sr-only">Cart button</span>
                <Profile />
                <span className="sr-only">Cart button</span>
            </div>
            <div className={`block md:hidden ${classnames({ 'z-50': isOpenNavbar })}`}>
                <Button className="focus:bg-inherit" size="icon" variant="ghost" onClick={() => setIsOpenNavbar(prevState => !prevState)}>
                    {!isOpenNavbar ? <i className="fi fi-rr-menu-burger mt-1"></i> : <i className="fi fi-rr-cross mt-1"></i>}
                    <span className="sr-only">Toggle navigation menu</span>
                </Button>
            </div>
            <MobileNavbar isOpenNavbar={isOpenNavbar} />
        </header>
    )
}

