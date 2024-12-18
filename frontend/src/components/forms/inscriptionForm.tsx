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

const inscriptionSchema = z.object({
    firstName: z.string().min(1, "Le prénom est requis"),
    lastName: z.string().min(1, "Le nom de famille est requis"),
    birthDate: z.string().min(1, "La date de naissance est requise"),
    class: z.string().min(1, "Le niveau est requis"),
});

export type InscriptionFormValues = z.infer<typeof inscriptionSchema>;

interface InscriptionFormProps {
    onSubmit: (data: InscriptionFormValues) => void;
}

export const InscriptionForm: React.FC<InscriptionFormProps> = ({
    onSubmit }) => {
    const form = useZodForm({
        schema: inscriptionSchema,
        defaultValues: {
            firstName: "",
            lastName: "",
            birthDate: "",
            class: "",
        },
    });

    return (
        <FormProvider {...form}>
            <Form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-1/2">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline" className="sm:max-w-[25%]">Ajouter élève</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
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
                                    name="class"
                                    render={({ field }) => (
                                        <select
                                            id="class"
                                            {...field}
                                            className="mt-1 p-2 w-full border rounded-md"
                                        >
                                            <option value="">Attribue un niveau</option>
                                            <option value="classPS">PS</option>
                                            <option value="classMS">MS</option>
                                            <option value="classGS">GS</option>
                                            <option value="classCP">CP</option>
                                            <option value="classCE1">CE1</option>
                                            <option value="classCE2">CE2</option>
                                            <option value="classCM1">CM1</option>
                                            <option value="classCM2">CM2</option>
                                        </select>
                                    )}
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit">Ajouter</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </Form>
        </FormProvider>
    )
};
