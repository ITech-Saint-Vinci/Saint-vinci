import { Button } from '@/components/ui/button';
import { StudentAccordion } from '@/components/students/StudentAccordion';
import { useNavigate } from 'react-router';
import { useAuth } from '@/hooks/useAuth';
import { UserRole } from '@/contants';
import { useStudents } from "@/hooks/useStudents";
import { Spinner } from "../loading/spinner";


export function SchoolYear() {
  const { data : students, isLoading } = useStudents();
  const navigate = useNavigate()
  const {role}= useAuth()
  if(isLoading) return <Spinner />

  
  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold">Année 2024-2025</h2>
        {role === UserRole.Director && 
        <Button
          variant="default"
          className="bg-emerald-600 hover:bg-emerald-700"
          onClick={()=>{
            navigate('/closeYear')
          }}
        >
          Clôturer l'année
        </Button>
        }
      </div>

      <div className="space-y-4">
      {/* {
            
              students!.data.map((student) => (
                <StudentAccordion student={student} />
                
              ))
          } */}
        
      </div>
    </div>
  );
}
