
import { useEffect, useState } from 'react'
import { doc, getDoc, } from 'firebase/firestore';
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { db } from '@/firebase/client';
import { Artisan, ArtisanConverter, ArtisanType } from '@/models/Artisan';

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
import { Button } from '@/components/ui/button';
import { ARTISAN_PROFILE_SCHEMA } from '@/lib/schemas';

import { useNavigate, useParams } from 'react-router-dom';
import { addArtisan, updateArtisan } from '@/firebase/artisans-db';


type AccountFormValues = z.infer<typeof ARTISAN_PROFILE_SCHEMA>

export default function ArtisanForm() {

    const { uid } = useParams();

    const navigate = useNavigate();

    const [artisan, setArtisan] = useState<Artisan>();
    const form = useForm<AccountFormValues>({
        resolver: zodResolver(ARTISAN_PROFILE_SCHEMA),
        defaultValues: async () => {
            if (uid && uid !== "undefined") {
                const docRef = doc(db, "artisans", uid).withConverter(new ArtisanConverter());
                const docData = (await getDoc(docRef)).data();
                return { ...docData } as ArtisanType;
            }
            else {
                return {} as AccountFormValues;
            }
        }
    })

    useEffect(() => {
        const fetchArtisan = async () => {
            if (uid === undefined) return;
            const docRef = doc(db, "artisans", uid).withConverter(new ArtisanConverter());
            const docData = (await getDoc(docRef)).data();
            setArtisan(docData);
        }
        if (uid && uid !== "undefined") {
            fetchArtisan();
        }
    }, [uid])

    async function onSubmit(data: AccountFormValues) {
        try {
            const action = uid ? updateArtisan : addArtisan;
            const docId = await action(data);

            toast({
                // title: 'Ok',
                description: (
                    <p className="mt-2 w-[340px] rounded-md bg-emerald-200 p-4">
                        <span className="text-cyan-900">Registro procesado con exito.</span>
                    </p>
                ),
            })

            navigate(`/artisans/${docId}`)
        } catch (error) {
            console.error(error);
            toast({
                title: "Error",
                description: (
                    <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                        <code className="text-white">{JSON.stringify(error, null, 2)}</code>
                    </pre>
                ),
            })
        }
    }

    return (
        <div className="p-10 space-y-6">
            <div className="text-cyan-900 text-2xl font-bold">{artisan ? "Actualizar" : "Crear"} Artesano/a</div>
            {form &&
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="firstName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nombre</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Nombre"{...field} className="border-cyan-500 ring-offset-cyan-500" />
                                        </FormControl>
                                        <FormDescription className="sr-only">
                                            This is the name that will be displayed on your profile and in
                                            emails.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="lastName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Apellido</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Apellido"{...field} className="border-cyan-500 ring-offset-cyan-500" />
                                        </FormControl>
                                        <FormDescription className="sr-only">
                                            This is the name that will be displayed on your profile and in
                                            emails.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>


                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="identityDocumentNumber"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Cédula de identidad</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Cédula de identidad"{...field} className="border-cyan-500 ring-offset-cyan-500" />
                                        </FormControl>
                                        <FormDescription className="sr-only">
                                            This is the name that will be displayed on your profile and in
                                            emails.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="taxDocumentNumber"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>RIF</FormLabel>
                                        <FormControl>
                                            <Input placeholder="RIF"{...field} className="border-cyan-500 ring-offset-cyan-500" />
                                        </FormControl>
                                        <FormDescription className="sr-only">
                                            This is the name that will be displayed on your profile and in
                                            emails.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>



                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="phoneNumber"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Teléfono</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Teléfono"{...field} className="border-cyan-500 ring-offset-cyan-500" />
                                        </FormControl>
                                        <FormDescription className="sr-only">
                                            This is the name that will be displayed on your profile and in
                                            emails.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Correo</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Correo"{...field} className="border-cyan-500 ring-offset-cyan-500" />
                                        </FormControl>
                                        <FormDescription className="sr-only">
                                            This is the name that will be displayed on your profile and in
                                            emails.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="livingAddress"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Dirección de Habitación</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Dirección"{...field} className="border-cyan-500 ring-offset-cyan-500" />
                                    </FormControl>
                                    <FormDescription className="sr-only">
                                        This is the name that will be displayed on your profile and in
                                        emails.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="workingAddress"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Dirección de trabajo</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Dirección"{...field} className="border-cyan-500 ring-offset-cyan-500" />
                                    </FormControl>
                                    <FormDescription className="sr-only">
                                        This is the name that will be displayed on your profile and in
                                        emails.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* TODO add dob field */}
                        {/* <FormField
                        control={form.control}
                        name="dob"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Date of birth</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-[240px] pl-3 text-left font-normal",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                            >
                                                {field.value ? (
                                                    format(field.value, "PPP")
                                                ) : (
                                                    <span>Pick a date</span>
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            disabled={(date) =>
                                                date > new Date() || date < new Date("1900-01-01")
                                            }
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormDescription>
                                    Your date of birth is used to calculate your age.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    /> */}
                        <Button type="submit" className="bg-cyan-700 hover:bg-cyan-600 text-white font-bold hover:drop-shadow-lg ">{artisan ? "Actualizar" : "Crear"}</Button>
                    </form>
                </Form>
            }
        </div>
    )
}   
