import React from 'react'

const SignInLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="my-20 container flex items-center justify-center ">

            {children}
        </div>
    )
}

export default SignInLayout