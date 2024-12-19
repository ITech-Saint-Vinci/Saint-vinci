import { Header } from '@/components/layout/header'
import Cardnotification from '@/components/notification/Cardnotification'
import PaginationComponent from '@/components/pagination/pagination'
import { Button } from '@/components/ui/button'
import useNotifications from '@/hooks/useNotifications'
import { NotificationsType } from '@/types'
import { Trash } from 'lucide-react'

const NotificationsPage = () => {
    const {notifications, page, setPage, totalPages, deleteAllNotifUser, deleteOneNotif} = useNotifications()
  return (
    <div className="min-h-screen flex flex-col items-center bg-background ">
        <>
        <Header />
        <main className="container px-4 py-6 flex flex-col items-center gap-3 w-full">
                {notifications.data && notifications.data.data.length > 0? 
                <>
                    <Button variant="destructive" className='self-end' onClick={()=>deleteAllNotifUser.mutate()}><Trash/></Button>
                    <div className='w-full h-[80vh] overflow-auto flex flex-col gap-3'>
                        <div>
                            {notifications.data.data.map((notif : NotificationsType)=>{
                                return <Cardnotification key={notif._id} notification={notif} onClickButton={(id)=>deleteOneNotif.mutate(id)}  />
                            })}
                        </div>
                    </div>
                    <PaginationComponent page={page} totalPages={totalPages} setPage={(value)=>setPage(value)} />
                </>                
                : <div>Vous n'avez pas de notifications ! </div>}
      </main>
      </>
    </div>
  )
}

export default NotificationsPage
