'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';

interface EmployeeFormInputs {
  first_name: string;
  last_name: string;
  email: string;
  job_title: string;
  department: string;
  date_hired: string;
}

interface Employee extends EmployeeFormInputs {
  id: number;
}

const EmployeeDetail: React.FC = () => {
  const router = useRouter();
  const { id } = useParams();
  const { register, handleSubmit, reset } = useForm<EmployeeFormInputs>();
  const [employee, setEmployee] = useState<Employee | null>(null);

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_EMPLOYEE_URL!}${id}`+"/");
        setEmployee(response.data);
        reset(response.data);
      };
      fetchData();
    }
  }, [id, reset]);

  const onSubmit: SubmitHandler<EmployeeFormInputs> = async (data) => {
    try {
      await axios.put(`${process.env.NEXT_PUBLIC_EMPLOYEE_URL!}${id}`+"/", data);
      const response = await axios.get(`${process.env.NEXT_PUBLIC_EMPLOYEE_URL!}${id}`+"/");
      setEmployee(response.data);
      reset(response.data);
    } catch (error) {
      console.error('Failed to update employee', error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_EMPLOYEE_URL!}${id}`+"/");
      router.push('/employees');
    } catch (error) {
      console.error('Failed to delete employee', error);
    }
  };

  if (!employee) return <p>Loading...</p>;

  return (
    <div className="container">
      <h1>Edit Employee</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>First Name</label>
          <input {...register('first_name')} required />
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input {...register('last_name')} required />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" {...register('email')} required />
        </div>
        <div className="form-group">
          <label>Job Title</label>
          <input {...register('job_title')} required />
        </div>
        <div className="form-group">
          <label>Department</label>
          <input {...register('department')} required />
        </div>
        <div className="form-group">
          <label>Date Hired</label>
          <input type="date" {...register('date_hired')} required />
        </div>
        <button type="submit" className="btn primary">Update</button>
        <button type="button" className="btn secondary" onClick={handleDelete}>Delete</button>
      </form>
    </div>
  );
};

export default EmployeeDetail;
