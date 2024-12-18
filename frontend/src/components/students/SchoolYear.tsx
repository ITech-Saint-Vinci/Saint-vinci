import { Button } from '@/components/ui/button';
import { StudentAccordion } from '@/components/students/StudentAccordion';
import { Student } from '@/types';
import { useNavigate } from 'react-router';

const mockStudents: Student[] = [
  {
    _id: "1",
    firstName: "John",
    lastName: "Doe",
    isReapeating: false,
    birthDate: "2015-01-01",
  },
  {
    _id: "2",
    firstName: "Jane",
    lastName: "Smith",
    isReapeating: false,
    birthDate: "2015-03-15",
  },
];

export function SchoolYear() {
  const navigate = useNavigate()
  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold">Année 2024-2025</h2>
        <Button
          variant="default"
          className="bg-emerald-600 hover:bg-emerald-700"
          onClick={()=>{
            navigate('/closeYear')
          }}
        >
          Clôturer l'année
        </Button>
      </div>

      <div className="space-y-4">
        <StudentAccordion level="CM2" students={mockStudents} />
        <StudentAccordion level="CM1" students={[]} />
        <StudentAccordion level="CE2" students={[]} />
        <StudentAccordion level="CE1" students={[]} />
        <StudentAccordion level="CP" students={[]} />
      </div>
    </div>
  );
}
