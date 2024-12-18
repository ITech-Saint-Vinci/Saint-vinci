import React, { ReactElement } from 'react'
import useHandleYear from './useHandleYear'
import useStudents from './useStudents'
import { GetYearResponse, MutationOnLoad, ResponsePatch, StudentsGetResponse, UpdateStatusData } from '@/types'
import { useMutation, UseMutationResult } from '@tanstack/react-query'
import { ToastAction } from "@/components/ui/toast"
import { toast } from "@/hooks/use-toast";

type VariantToastProps = "default" | "success" | "destructive"

const useDirector = () => {
    const [initialSet , setInitialSet] = React.useState(false)
    const {getCurrentYear, patchYear} = useHandleYear()
    const {getStudentsRepeating, updateStatusStudent} = useStudents()
    const [allStudents, setAllStudents] = React.useState<StudentsGetResponse[]>([])
    const onLoad = async ()=>{
        const [year, dataStudents] = await Promise.all( [getCurrentYear(), getStudentsRepeating()]) 
        return {year, students: dataStudents}
      }
      const generateToast  = (variant : VariantToastProps, message: ReactElement| string, description: string, action: any) =>{
        return toast({
            variant: variant,
            title: message,
            description: description,
            action: <ToastAction altText="Réessayer" onClick={action}>Réessayer</ToastAction>,
          })
      }
    const onError = (message : string, mutate: ()=>void)=>{
         generateToast(
            "destructive",
            message,
                "",
            <ToastAction altText="Réessayer" onClick={()=>{mutate();toast({}).dismiss()}}>Réessayer</ToastAction>,
          )
    }
    const mutationOnLoad :UseMutationResult<MutationOnLoad, Error, void>  = useMutation(onLoad, {
        onError: (e)=> {
            onError(e.message,() =>mutationOnLoad.mutate())
        }, 
        onSuccess: (data)=>{
            if(!initialSet){
                toast({}).dismiss()
                setInitialSet(true)
            }
            setAllStudents(data.students)
        }
    });
    const mutationUpdateStudent :UseMutationResult<ResponsePatch, Error, UpdateStatusData, void>  = useMutation(updateStatusStudent,  {
        onSuccess: ()=>{
        mutationOnLoad.mutate()
        }, onError: (e)=> {
            onError(e.message, ()=>{})}
    });
    const mutationPatchYear :UseMutationResult<ResponsePatch, Error, GetYearResponse, void>  = useMutation(patchYear, 
        {onSuccess: ()=>{
        toast({}).dismiss()
        mutationOnLoad.mutate()
        generateToast("success", "Mise à jour réussi", "", "")
        },
        onError: (e)=> onError(e.message, ()=>{}),
    });
    
    React.useEffect(()=>{
       mutationOnLoad.mutate()
       return ()=>{
        toast({}).dismiss()
       }
    },[])
    React.useEffect(()=>{
        if ((mutationOnLoad.isLoading && !initialSet)|| mutationPatchYear.isLoading ) {
            generateToast("default", <div className="flex items-center gap-2.5"><div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"/>En attente des données...</div>, "", "")
        }
       },[mutationOnLoad.isLoading, mutationPatchYear.isLoading])

  return { allStudents, mutationOnLoad, mutationPatchYear, mutationUpdateStudent}
}

export default useDirector


