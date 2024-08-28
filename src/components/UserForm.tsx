import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { USER_SIGNIN_SCHEMA, USER_SIGNUP_SCHEMA } from "@/lib/schemas"
import { createUser, signIn } from "@/firebase/auth"

interface UserFormProps {
  type: "signup" | "signin"
}

export function UserForm(
  { type }: UserFormProps) {
  const FormSchema = type === "signup" ? USER_SIGNUP_SCHEMA : USER_SIGNIN_SCHEMA
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const execueOnSubmit = type === "signup" ? createUser : signIn
      await execueOnSubmit(data)
    } catch (error: any) {
      console.log(error)
      toast({
        title: "Imposible realizar la operación",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{error.message}</code>
          </pre>
        ),
      })
    }
  }

  return (
    <div className="grid place-content-center mx-auto rounded-md p-8 h-[900px]">
      <h3 className="text-center text-2xl font-bold mb-8 text-cyan-700">
        {type === "signup" ? "Registro" : "Inicio de Sesión"}
      </h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-[500px] space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Correo</FormLabel>
                <FormControl>
                  <Input placeholder="Correo" {...field} className="border-cyan-500 ring-offset-cyan-500" />
                </FormControl>
                <FormDescription className="sr-only">
                  Nombre de usuario.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Constraseña</FormLabel>
                <FormControl>
                  <Input placeholder="Constraseña" type="password" {...field} className="border-cyan-500 ring-offset-cyan-500" />
                </FormControl>
                <FormDescription className="sr-only">
                  Contraseña.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="bg-cyan-700 hover:bg-cyan-600 text-white font-bold hover:drop-shadow-lg ">Aceptar</Button> 
        </form>
      </Form>
    </div>
  )
}
