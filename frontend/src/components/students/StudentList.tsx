import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface StudentListProps {
  _id?: string;
  firstName: string;
  lastName: string;
  birthday: Date;
  status: string;
  level: string;
}

export const StudentList = ({_id, firstName, lastName, birthday, status }: StudentListProps) =>(
    <Card className="p-4 mb-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">{birthday.getDay()}-{birthday.getMonth()}-{birthday.getFullYear()}</h2>
      </div>
      <div className="space-y-2">
          <div
            className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
          >
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary">
                {}
              </div>
              <span>{`${firstName} ${lastName}`}</span>
            </div>
            <div className="flex items-center gap-4">
              <span
                className={`px-2 py-1 text-sm rounded-full ${
                  status === "Admis"
                    ? "bg-green-100 text-green-700"
                    : "bg-orange-100 text-orange-700"
                }`}
              >
                {status}
              </span>
              <Button variant="ghost" size="icon">
                <Eye className="h-4 w-4" />
              </Button>
            </div>
          </div>
      </div>
    </Card>
  );
