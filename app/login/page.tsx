"use client"
import { Card, CardDescription, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { FormProvider, SubmitHandler, useForm, useFormContext } from "react-hook-form"
import { submitSignInForm } from "./actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import GuestAccount from "@/components/demo-account";
import DemoAccount from "@/components/demo-account";


type LoginFormData = {
    username: string;
    password: string;
}
const useLoginForm = () => {
    const router = useRouter()
    const methods = useForm<LoginFormData>()

    const submitMutation = useMutation({
        mutationFn: async (formData: LoginFormData) => {
            await submitSignInForm(formData)
        }
    });
    const onSubmit = async (formData: LoginFormData) => {
        submitMutation.mutate(formData, {
            onSuccess: () => {
                methods.reset()
                router.push('/')
            },
            onError: (context) => {
                console.log("error", context?.message)
            }
        })
    }

    return {
        methods,
        handleSubmit: methods.handleSubmit(onSubmit),
    }
}
const LoginForm = () => {
    const { register } = useFormContext<LoginFormData>()

    return (<Card className="max-w-sm">
        <CardHeader className="space-y-1">
            <CardTitle className="text-4xl font-bold text-center tracking-tight uppercase mb-5">Login</CardTitle>
            <CardDescription>Enter your email and password to access your account.</CardDescription>
            <CardDescription>Note: Please use this Demo Account. <DemoAccount /></CardDescription>
        </CardHeader>
        <CardContent>
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input placeholder="jdc_123" {...register('username', { required: true })} />
                </div>
                <div className="space-y-2">
                    <div className="flex items-center">
                        <Label htmlFor="password">Password</Label>
                    </div>
                    <Input {...register('password')} type="password" />
                </div>
                <Button className="w-full" type="submit">
                    Login
                </Button>

            </div>


        </CardContent>
    </Card>)
}
const LoginDetails = () => {
    const { methods, handleSubmit } = useLoginForm()
    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit}>
                <LoginForm />
            </form>

        </FormProvider>
    )
}

export default LoginDetails