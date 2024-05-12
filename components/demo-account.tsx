import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Button } from './ui/button'

const DemoAccount = () => {
    return (
        <Popover >
            <PopoverTrigger asChild>
                <Button variant="secondary" size="icon" className='rounded-full'>
                    <i className="fi fi-sr-user mt-1"></i>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
                <div className="grid gap-4">
                    <div className="space-y-2">
                        <h4 className="font-medium leading-none">Account</h4>
                        <p className="text-sm text-muted-foreground">
                            Username: johnd
                        </p>
                        <p className="text-sm text-muted-foreground">
                            Password: m38rmF$
                        </p>
                    </div>

                </div>
            </PopoverContent>
        </Popover>
    )
}

export default DemoAccount