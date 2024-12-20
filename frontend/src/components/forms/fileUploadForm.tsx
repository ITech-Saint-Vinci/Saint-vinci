import { Button } from "@/components/ui/button";
import { InputField } from "@/components/base/Input";
import { Form, useZodForm } from "@/components/base/Form";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FormProvider, Controller } from "react-hook-form";
import { useState, useCallback } from "react";
import { Upload } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/App";
import { useAuth } from "@/hooks/useAuth";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = ["text/csv", "application/csv"];

const fileUploadSchema = z.object({
  file: z
    .any()
    .refine((files) => files?.[0], "Please upload a file")
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      "File size should be less than 5MB"
    )
    .refine(
      (files) => ACCEPTED_FILE_TYPES.includes(files?.[0]?.type),
      "Only CSV files are accepted"
    ),
});

export type FileUploadFormValues = z.infer<typeof fileUploadSchema>;

export const FileUploadDialog = () => {
  const [open, setOpen] = useState(false);
  const { token } = useAuth();

  const form = useZodForm({
    schema: fileUploadSchema,
  });

  const { mutate, error, isLoading } = useMutation<
    unknown,
    Error,
    FileUploadFormValues
  >({
    mutationFn: async (data) => {
      const formData = new FormData();
      formData.append("file", data.file[0]);

      const response = await fetch(
        "http://localhost:3001/api/admin/csv/upload",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to upload file");
      }

      return response.json();
    },
    onSuccess: () => {
      setOpen(false);
      form.reset();
      queryClient.invalidateQueries(["classes"]);
    },
  });

  const onSubmit = useCallback(
    (values: FileUploadFormValues) => {
      mutate(values);
    },
    [mutate]
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="default"
          className="bg-emerald-600 hover:bg-emerald-700"
        >
          Upload CSV
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        {error ? (
          <div className="text-red-700 mb-4">
            {error.message || "An error occurred during upload"}
          </div>
        ) : null}

        <FormProvider {...form}>
          <Form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="gap-4 py-4">
              <div className="grid-cols-4 items-center gap-4">
                <Controller
                  control={form.control}
                  name="file"
                  render={({ field: { onChange, value, ...field } }) => (
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Upload CSV File
                        <Upload className="h-4 w-4 text-gray-500 inline ml-2" />
                      </label>
                      <input
                        type="file"
                        accept=".csv"
                        onChange={(e) => onChange(e.target.files)}
                        className="w-full border p-2 rounded-md"
                        disabled={isLoading}
                        {...field}
                      />
                    </div>
                  )}
                />
                {form.formState.errors.file && (
                  <span className="text-red-500 text-sm block mt-1">
                    {form.formState.errors.file.message as string}
                  </span>
                )}
              </div>
            </div>
            <DialogFooter>
              <Button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-700"
                disabled={isLoading}
              >
                {isLoading ? "Uploading..." : "Upload"}
              </Button>
            </DialogFooter>
          </Form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};
