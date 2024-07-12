"use client"
import { Card, CardDescription, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { FormProvider, useForm, useFormContext } from "react-hook-form"
import { submitSignInForm } from "./actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import DemoAccount from "@/components/demo-account";


type LoginFormData = {
    username: string;
    password: string;
}
const useLoginForm = () => {
    const router = useRouter()
    const methods = useForm<LoginFormData>()

    const submitMutation = useMutation({
        mutationFn: (formData: LoginFormData) => {
            return submitSignInForm(formData)
        }
    });
    const onSubmit = (formData: LoginFormData) => {
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
        submitMutation,
        handleSubmit: methods.handleSubmit(onSubmit),
        isPending: submitMutation.isPending
    }
}
const LoginForm = () => {
    const { submitMutation, isPending } = useLoginForm()
    const { register } = useFormContext<LoginFormData>()

    console.log(submitMutation.isPending)

    return (<Card className="max-w-md">
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
            </div>
        </CardContent>
        <CardFooter>
            <Button className="w-full" type="submit" >
                {isPending ? <span className="spinner"></span> : "Login"}
            </Button>
        </CardFooter>
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