import React from 'react'

const AboutPage = () => {
    return (
        <div className="px-6 py-8 md:py-10 lg:py-10 h-full w-full">
            <div className="h-full w-full flex flex-col items-center justify-center">
                <h1 className="scroll-m-20 text-4xl text-center font-extrabold tracking-tight lg:text-5xl">
                    What is <span className='text-yellow-300'>Mobo Market</span>?
                </h1>
                <p className="leading-8 [&:not(:first-child)]:mt-6">
                    Mobo Market is an <span className='font-semibold'>e-commerce</span> demo web application that aims to showcase the usage of APIs specifically <span className='font-semibold'>Fake Store API</span>.
                    With the use of <span className='font-semibold'>NextJS 14</span>, this app demonstrates the usage of new features of Next JS such <span className='font-semibold'>intercepted routes</span>, <span className='font-semibold'>parallel routes</span>. This app also uses
                    <span className='font-semibold'> middlewares</span> for authentication. With the help of shadcn UI the app showcases beautiful components.
                </p>
            </div>
        </div>
    )
}

export default AboutPage