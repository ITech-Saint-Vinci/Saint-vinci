import { StudentList } from '@/components/students/StudentList';
import { useStudents } from '@/hooks/useStudents';

function StudentDashboard() {
  const { data: students, isLoading, error } = useStudents();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg">Chargement...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-red-500">Erreur lors du chargement des données</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Liste des Élèves</h1>
      {
      
        students!.data.map((student) => (
          <StudentList
            key={student._id}
            class={student.class}
            _id={student._id}
            firstName={student.firstName}
            lastName={student.lastName}
            birthday={new Date(student.birthdate)}
            status={student.status}
          />
        ))
      }
    </div>
  );
}

function Teacher() {
  return <StudentDashboard />;
}

export default Teacher;
