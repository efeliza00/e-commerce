import DarkModeToggle from '@/components/darkmode-toggle'
import React from 'react'

type Props = {}

const SignInLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="relative h-screen max-h-screen container flex items-center justify-center ">
            <div className='absolute top-2 left-2'>
                <DarkModeToggle />
            </div>
            {children}
        </div>
    )
}

export default SignInLayout