import { Button } from '@/components/ui/button'
import Link from 'next/link'

const ContactPage = () => {
    return (
        <div className="px-6 py-8 md:py-10 lg:py-10 h-full w-full">
            <div className="h-full w-full flex flex-col items-center justify-center">
                <h1 className="scroll-m-20 text-4xl text-center font-extrabold tracking-tight lg:text-5xl">
                    Contact <span className='text-yellow-300'>Me</span>
                </h1>
          <Link href={`mailto:evanfeliza22@gmail.com`} target="_blank" >
                    <Button size="lg" className='mt-4'>
                        Send an Email <i className="ml-2 fi fi-rs-paper-plane mt-1"></i>
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default ContactPage