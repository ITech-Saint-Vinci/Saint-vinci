import { useEffect, useState } from 'react'
import useHandleYear from './useHandleYear'
import useStudents from './useStudentsReapeating'
import { GetYearResponse, ResponsePatch, StudentsGetResponse, UpdateStatusData } from '@/types'
import { useMutation, UseMutationResult, useQuery } from '@tanstack/react-query'
import { ToastAction } from "@/components/ui/toast"
import { toast } from "@/hooks/useToast";
import { queryClient } from '@/App'
import { showToast } from '@/lib/utils'


const useDirector = () => {
    const {getCurrentYear, patchYear} = useHandleYear()
    const {getStudentsRepeating, updateStatusStudent} = useStudents()
    const [allStudents, setAllStudents] = useState<StudentsGetResponse[]>([])
    const onError = (message : string, mutate: ()=>void)=>{
         showToast(
            "destructive",
            message,
                "",
            <ToastAction altText="Réessayer" onClick={()=>{mutate();toast({}).dismiss()}}>Réessayer</ToastAction>,
          )
    }
    const queryOnLoad = useQuery({
        queryKey: ["current-year", "repeating-students"],
        queryFn: async () => {
          const [year, students] = await Promise.all([
            getCurrentYear(),
            getStudentsRepeating()
          ]);
          setAllStudents( students )
          return { year, students };
        },

        onError: (error: Error) => {
          onError(
            error.message,
            () => queryClient.invalidateQueries({ queryKey: ["current-year", "repeating-students"] })
          );
        }
      });

    const mutationUpdateStudent :UseMutationResult<ResponsePatch, Error, UpdateStatusData, void>  = useMutation(updateStatusStudent,  {
        onSuccess: ()=>{
        queryOnLoad.refetch()
        }, onError: (e)=> {
            onError(e.message, ()=>{})
          }
    });
    const mutationPatchYear :UseMutationResult<ResponsePatch, Error, GetYearResponse, void>  = useMutation(patchYear, 
        {onSuccess: (data)=>{
        toast({}).dismiss()
        queryOnLoad.refetch()
        showToast("success", data.message, "", "")
        },
        onError: (e)=> onError(e.message, ()=>{}),
    });
    
    useEffect(()=>{
       queryOnLoad.refetch()
       return ()=>{
        toast({}).dismiss()
       }
    },[])
    useEffect(()=>{
        if ( mutationPatchYear.isLoading ) {
            showToast("default", <div className="flex items-center gap-2.5"><div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"/>En attente des données...</div>, "", "")
        }
    },[mutationPatchYear.isLoading])

  return { allStudents, queryOnLoad, mutationPatchYear, mutationUpdateStudent}
}

export default useDirector


