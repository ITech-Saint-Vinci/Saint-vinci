import { Request, Response } from "express"
import Notifications from "../models/notifications"

type RequestQueryNotif = {
    page: string
    rowPerPage: string
}
type RequestParamsNotif = {
    notifId: string
}
export const getNotificationsByUser =  async (req: Request<{}, any, {}, RequestQueryNotif>,res: Response ) : Promise<void> =>{
    try {
        const {_id} = req.user
        const query = req.query 
        const page = parseInt(query.page)
        const rowPerPage = parseInt(query.rowPerPage)
        if(!page || !rowPerPage){
             res.status(400).json({message: "Il y a eu un problème lors de la récupération des données."})
             return
        }
        const skip = (page-1)*rowPerPage
        const notif = await Notifications.aggregate([
            {
                $match: { userId: _id }
             },
            {
              $facet: {
                metadata: [{ $count: 'totalCount' }],
                data: [{ $skip: skip }, { $limit: rowPerPage }],
              },
            },
          ]).sort({ createdAt: -1 })
          
        res.status(200).json({data: notif[0].data, totalpages: notif[0].metadata[0]?.totalCount || 1 })
    } catch (error) {
        res.status(500).json({message: "Erreur Serveur"})
    }
}

export const deleteOneNotification = async (req: Request<RequestParamsNotif, {}, {}>,res: Response ) : Promise<void> =>{
    try {
        const {notifId} = req.params
        await Notifications.deleteOne({_id: notifId})
        res.status(200).json({message: "Notification supprimée !"})
    } catch (error) {
        res.status(500).json({message: "Erreur Serveur"})
    }
}

export const deleteNotificationsUser = async (req: Request,res: Response ) : Promise<void> =>{
    try {
        const {_id} = req.user
        await Notifications.deleteMany({userId:_id})
        res.status(200).json({message: "Notifications supprimées !"})
    } catch (error) {
        res.status(500).json({message: "Erreur Serveur"})
    }
}