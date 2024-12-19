import { queryClient } from '@/App';
import { useMutation, UseMutationResult, useQuery } from '@tanstack/react-query';
import { useAuth } from './useAuth';
import { useEffect, useState } from 'react';
import { toast } from './useToast';
import { ToastAction } from '@/components/ui/toast';
import {  ResponsePatch } from '@/types';
import { showToast } from '@/lib/utils';

const useNotifications = () => {
    const [page, setPage] = useState<number>(1)
    const [totalPages, setTotalPages] = useState<number>(1)
    const {token}= useAuth()
    const rowPerPage = 5
    const notifications = useQuery({
        queryKey: ["notifications"],
        retry:1,
        queryFn: async () => {
          const result = await fetch(`http://localhost:3001/api/notifications?page=${page}&rowPerPage=${rowPerPage}`,  {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
              }
          })
            if(!result.ok){
                throw new Error("Les notifications n'ont pas été récupérer.")
            }
            const response = await result.json();
            setTotalPages(Math.ceil(response.totalpages / rowPerPage))
          return response
        },

        onError: (error: Error) => {
            showToast(
                 "destructive",
                 error.message,
                 "",
                <ToastAction altText="Réessayer" onClick={()=>notifications.refetch()}>Réessayer</ToastAction>,
              );
            () => queryClient.invalidateQueries({ queryKey: ["notifications"] })
        }
    })
    const onSuccessDelete = (message : string)=>{
        showToast(
            "success",
            message,
            "",
            ""
         );
         notifications.refetch()
    }
    const onErrorDelete = (error: string)=>{
        showToast(
            "destructive",
            error,
            "",
           <ToastAction altText="Réessayer" onClick={()=>{}}>Réessayer</ToastAction>,
         );
    }
    const deleteOneNotif : UseMutationResult<ResponsePatch, Error, string, void> = useMutation(
        {mutationFn: async (notifId: string)=>{
            const result = await fetch(`http://localhost:3001/api/notifications/${notifId}`,  {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                  },
                  method: "DELETE",
                  body: JSON.stringify({notifId})
              })
                if(!result.ok){
                    throw new Error("La notification n'a pas été supprimer.")
                }
              return await result.json();
            },
            onSuccess: (data)=>{
                toast({}).dismiss()
                onSuccessDelete(data.message)
                },
            onError: (error: Error)=> onErrorDelete(error.message),
    })
    const deleteAllNotifUser : UseMutationResult<ResponsePatch, Error, void, void> = useMutation(
        {mutationFn: async ()=>{
            const result = await fetch(`http://localhost:3001/api/notifications`,  {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                  },
                  method: "DELETE",
              })
                if(!result.ok){
                    throw new Error("Les notifications n'ont pas été supprimer.")
                }
              return await result.json();
            },
            onSuccess: (data)=>{
                toast({}).dismiss()
                onSuccessDelete(data.message)
                },
            onError: (error: Error)=> onErrorDelete(error.message),
    })
    useEffect(()=>{
        notifications.refetch()
    }, [page])
  return {notifications, setPage, setTotalPages, totalPages, page, deleteAllNotifUser, deleteOneNotif}
}

export default useNotifications
