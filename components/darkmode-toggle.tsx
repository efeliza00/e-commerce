"use client"
import React from 'react'
import { Button } from './ui/button'
import { useTheme } from 'next-themes'
const DarkModeToggle = () => {
    const { setTheme, theme } = useTheme()


    return (
        <div>
            <Button
                className="rounded-full border-slate-200 dark:border-slate-800  text-gray-200 hover:text-gray-100 focus:bg-inherit dark:bg-inherit"
                size="icon"
                variant="outline"
                onClick={() => {
                    if (theme === "light") {
                        setTheme("dark")
                    } else {
                        setTheme("light")
                    }
                }}
            >
                {theme === "light" ? <i className={`fi fi-rs-moon-stars text-primary trasition-all duration-300 dark:text-white mt-1`}></i> : <i className="fi fi-rr-brightness trasition-all duration-300 text-primary dark:text-white mt-1"></i>}

                <span className="sr-only">Toggle dark mode</span>
            </Button>
        </div>
    )
}

export default DarkModeToggle