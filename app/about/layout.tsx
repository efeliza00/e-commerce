import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import React from 'react'

const AboutLayout = ({ children }: {
    children: React.ReactNode
}) => {
    return (
        <div className="px-0 relative h-screen max-h-screen container">
            <Navbar />
            {children}
            <Footer />
        </div>
    )
}

export default AboutLayout