import { Button } from "@/components/ui/button"
import { InputField } from "@/components/base/Input";
import { Form, useZodForm } from "@/components/base/Form";
import { z } from "zod";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Controller, FormProvider } from "react-hook-form";
import useInscription from "@/hooks/useInscription";

const inscriptionSchema = z.object({
    firstName: z.string().min(1, "Le prénom est requis"),
    lastName: z.string().min(1, "Le nom de famille est requis"),
    birthDate: z.string().min(1, "La date de naissance est requise"),
    classes: z.string().min(1, "Le niveau est requis"),
});

export type InscriptionFormValues = z.infer<typeof inscriptionSchema>;

export const InscriptionForm = ({ }) => {
    const form = useZodForm({
        schema: inscriptionSchema,
        defaultValues: {
            firstName: "",
            lastName: "",
            birthDate: "",
            classes: "",
        },
    });

    const { classes, onSubmit, error, valid } = useInscription()


    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="default" className="bg-emerald-600 hover:bg-emerald-700">Ajouter élève</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                {error ?
                    <div className="text-red-700"> {error} </div> : null}

                {valid ?
                    <div className="text-emerald-600"> {valid} </div> : null}
                <FormProvider {...form}>
                    <Form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 ">
                        <div className=" gap-4 py-4">
                            <div className=" grid-cols-4 items-center gap-4">
                                <InputField
                                    control={form.control}
                                    name="lastName"
                                    label="Nom"
                                    type="text"
                                    required
                                    placeholder="Enter the last name"
                                    onEnterPress={() => form.handleSubmit(onSubmit)()}
                                />
                            </div>
                            <div className=" grid-cols-4 items-center gap-4">
                                <InputField
                                    control={form.control}
                                    name="firstName"
                                    label="Prénom"
                                    type="text"
                                    required
                                    placeholder="Enter the first name"
                                    onEnterPress={() => form.handleSubmit(onSubmit)()}
                                />
                            </div>
                            <div>
                                <InputField
                                    control={form.control}
                                    name="birthDate"
                                    label="Date de naissance"
                                    type="date"
                                    required
                                    placeholder="Select the student's birth date"
                                />
                            </div>
                            <div>
                                <label htmlFor="class" className="block text-sm font-medium">Niveaux</label>
                                <Controller
                                    control={form.control}
                                    name="classes"
                                    render={({ field }) => (
                                        <select
                                            id="class"
                                            {...field}
                                            className="mt-1 p-2 w-full border rounded-md"
                                        >
                                            <option value="">Attribue un niveau</option>
                                            {classes && classes.map(classes => {
                                                return <option key={classes._id} value={classes._id}>
                                                    {classes.name}
                                                </option>
                                            }
                                            )}
                                        </select>
                                    )}
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700" >Ajouter</Button>
                        </DialogFooter>            
                        </Form>
                </FormProvider>

            </DialogContent>
        </Dialog>
    )
};
