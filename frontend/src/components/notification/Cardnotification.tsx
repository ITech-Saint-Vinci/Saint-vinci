import  { FC } from 'react'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../ui/card'
import { NotificationsProps } from '@/types'
import { Button } from '../ui/button'
import { Trash } from 'lucide-react'

const Cardnotification : FC<NotificationsProps> = ({notification, onClickButton}) => {
  return (
    <Card className={`border border-emerald-600 flex items-center `}>
        <div className='flex-1'>
            <CardHeader>
                    <CardTitle className='text-emerald-600'>{notification.subject}</CardTitle>
            </CardHeader>
            <CardContent>
                {notification.message}
            </CardContent>
            <CardFooter>
                By {notification.author}
            </CardFooter>
        </div>
        <Button variant="destructive" className='mr-5' onClick={()=>onClickButton(notification._id)}><Trash/></Button>
    </Card>
  )
}

export default Cardnotification
