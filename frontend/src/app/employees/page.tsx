"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { Plus, User } from 'lucide-react';

interface Employee {
  id: number;
  first_name: string;
  last_name: string;
}

const EmployeeList: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(process.env.NEXT_PUBLIC_EMPLOYEE_URL!);
      setEmployees(response.data);
    };
    fetchData();
  }, []);

  return (
    <div className="container">
      <h1 className="header">Employees</h1>
      <Link href="/employeeform" legacyBehavior passHref>
        <a className="button">
          <Plus className="icon" />
          Add New Employee
        </a>
      </Link>
      <ul className="list">
        {employees.map(employee => (
          <li key={employee.id} className="list-item">
            <Link href={`/employee/${employee.id}`} legacyBehavior passHref>
              <a>
                <User className="icon" />
                {employee.first_name} {employee.last_name}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeList;
