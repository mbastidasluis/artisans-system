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
import { ARTISAN_PROFILE_SCHEMA } from "@/lib/schemas"
import { createUser, signIn } from "@/firebase/auth"
import { Artisan } from "@/models/Artisan"

interface UserFormProps {
  type: "signup" | "signin"
}

export function ArtisanForm({ artisan }: { artisan?: Artisan }) {
  const defaultValues = artisan{}
  const form = useForm<z.infer<typeof ARTISAN_PROFILE_SCHEMA>>({
    resolver: zodResolver(ARTISAN_PROFILE_SCHEMA),
    defaultValues: {
      
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
    <div className="mx-auto w-2/3 space-y-6 border-2 border-slate-800 rounded-md p-8">
      <h3 className="text-center text-lg font-bold">
        {type === "signup" ? "Registro" : "Inicio de Sesión"}
      </h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mx-auto w-2/3 space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Correo</FormLabel>
                <FormControl>
                  <Input placeholder="Correo" {...field} />
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
                  <Input placeholder="Constraseña" type="password" {...field} />
                </FormControl>
                <FormDescription className="sr-only">
                  Contraseña.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Aceptar</Button>
        </form>
      </Form>
    </div>
  )
}
