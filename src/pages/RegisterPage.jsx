import React, { useState } from 'react';
import useAuthStore from '../store/useAuthStore.js';
import { BsChatHeart, BsEyeFill, BsEyeSlashFill, BsKey, BsPerson } from 'react-icons/bs';
import { IoIosMail } from 'react-icons/io';
import InlineLoader from '../components/skeletons/InlineLoader.jsx';
import { toast } from 'react-toastify';

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const { isSigningUp, register } = useAuthStore();
  const validateForm = () => {
    if (!formData.firstName.trim()) return toast.error('First name is required');
    if (!formData.lastName.trim()) return toast.error('Last name is required');
    if (!formData.email.trim()) return toast.error('Email is required');
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error('Invalid email format');
    if (!formData.password) return toast.error('Password is required');
    if (formData.password.length < 6) return toast.error('Password should be at least 6 character');
    return true;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success === true) {
      register(formData);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'password':
        setFormData({ ...formData, password: value });
        break;
      case 'email':
        setFormData({ ...formData, email: value });
        break;
      case 'firstName':
        setFormData({ ...formData, firstName: value });
        break;
      case 'lastName':
        setFormData({ ...formData, lastName: value });
        break;
    }
  };
  return (
    <div className="min-h-[calc(100vh-8rem)] grid ">
      {/* left side */}
      <div className="flex flex-col justify-center items-center p-6">
        <div className="w-full max-w-md space-y-8 text-center">
          <form onSubmit={handleSubmit} className="space-y-6">
            <h1 className="text-3xl">Create account</h1>
            <span>get started with free account</span>
            <label className="input input-bordered flex items-center gap-2">
              <BsPerson />
              <input
                type="text"
                className="grow"
                placeholder="First Name"
                name="firstName"
                onChange={handleChange}
                value={formData.firstName}
              />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              <BsPerson />
              <input
                type="text"
                className="grow"
                placeholder="Last Name"
                name="lastName"
                onChange={handleChange}
                value={formData.lastName}
              />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              <IoIosMail />
              <input
                type="text"
                className="grow"
                placeholder="Email"
                name="email"
                onChange={handleChange}
                value={formData.email}
              />
            </label>
            <label className="relative input input-bordered flex items-center gap-2">
              <BsKey />
              <input
                type={showPassword ? 'text' : 'password'}
                className="grow"
                placeholder="•••••••••"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <BsEyeSlashFill /> : <BsEyeFill />}
              </button>
            </label>
            <button className="btn btn-primary w-full" type="submit" disabled={isSigningUp}>
              {isSigningUp ? <InlineLoader /> : 'Create account'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
