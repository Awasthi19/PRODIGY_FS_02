"use client";

import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { PlusCircle } from 'lucide-react';

interface EmployeeFormInputs {
  first_name: string;
  last_name: string;
  email: string;
  job_title: string;
  department: string;
  date_hired: string;
}

const NewEmployee: React.FC = () => {
  const { register, handleSubmit } = useForm<EmployeeFormInputs>();
  const router = useRouter();

  const onSubmit: SubmitHandler<EmployeeFormInputs> = async (data) => {
    try {
    const response = await axios.post(process.env.NEXT_PUBLIC_EMPLOYEE_URL!, data);
      router.push('/employee');
    } catch (error) {
      console.error('Failed to create employee', error);
    }
  };

  return (
    <div className="container">
      <h1 className="header">
        <PlusCircle className="icon" /> Add New Employee
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label className="label">First Name</label>
          <input className="input" {...register('first_name')} required />
        </div>
        <div className="form-group">
          <label className="label">Last Name</label>
          <input className="input" {...register('last_name')} required />
        </div>
        <div className="form-group">
          <label className="label">Email</label>
          <input className="input" type="email" {...register('email')} required />
        </div>
        <div className="form-group">
          <label className="label">Job Title</label>
          <input className="input" {...register('job_title')} required />
        </div>
        <div className="form-group">
          <label className="label">Department</label>
          <input className="input" {...register('department')} required />
        </div>
        <div className="form-group">
          <label className="label">Date Hired</label>
          <input className="input" type="date" {...register('date_hired')} required />
        </div>
        <button className="button" type="submit">Submit</button>
      </form>
    </div>
  );
};

export default NewEmployee;
