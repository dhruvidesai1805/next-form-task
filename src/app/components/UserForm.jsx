"use client";
import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phoneNumber: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),
  dob: Yup.date()
    .required("Date of birth is required")
    .max(new Date(), "Date of birth cannot be in the future"),
  age: Yup.number()
    .min(1, "Age must be greater than 0")
    .max(120, "Age must be less than 120")
    .required("Age is required"),
  address: Yup.string().required("Address is required"),
});

const UserForm = () => {
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    dob: "",
    age: "",
    address: "",
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await axios.post("/api/form", values);
      toast.success('Form submitted successfully!');
      console.log("Form submitted successfully:");
      resetForm();
    } catch (error) {
      console.error("Error submitting form:", error);
      // alert("Error while submitting form");
       toast.error('Error submitting form. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className='min-h-screen min-w-xl max-w-[1280px] m-auto w-full bg-white flex items-center justify-center px-2 py-10'>
      <div className='w-full max-w-[600px] p-8 rounded-2xl shadow-lg bg-white border border-gray-200'>
        <h2 className='text-center text-3xl font-extrabold text-gray-900'>
          User Registration Form
        </h2>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form className='mt-8 space-y-6'>
              <div className='rounded-md  space-y-4'>
                {/* First Name */}
                <div>
                  <label
                    htmlFor='firstName'
                    className='block text-sm font-medium text-gray-700'
                  >
                    First Name
                  </label>
                  <Field
                    type='text'
                    name='firstName'
                    className='appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                  />
                  {errors.firstName && touched.firstName && (
                    <div className='text-red-500 text-xs mt-1'>
                      {errors.firstName}
                    </div>
                  )}
                </div>

                {/* Last Name */}
                <div>
                  <label
                    htmlFor='lastName'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Last Name
                  </label>
                  <Field
                    type='text'
                    name='lastName'
                    className='appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                  />
                  {errors.lastName && touched.lastName && (
                    <div className='text-red-500 text-xs mt-1'>
                      {errors.lastName}
                    </div>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor='email'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Email
                  </label>
                  <Field
                    type='email'
                    name='email'
                    className='appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                  />
                  {errors.email && touched.email && (
                    <div className='text-red-500 text-xs mt-1'>
                      {errors.email}
                    </div>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label
                    htmlFor='phoneNumber'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Phone
                  </label>
                  <Field
                    type='tel'
                    name='phoneNumber'
                    className='appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                  />
                  {errors.phoneNumber && touched.phoneNumber && (
                    <div className='text-red-500 text-xs mt-1'>
                      {errors.phoneNumber}
                    </div>
                  )}
                </div>

                {/* Date of Birth */}
                <div>
                  <label
                    htmlFor='dob'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Date of Birth
                  </label>
                  <Field
                    type='date'
                    name='dob'
                    className='appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                  />
                  {errors.dob && touched.dob && (
                    <div className='text-red-500 text-xs mt-1'>
                      {errors.dob}
                    </div>
                  )}
                </div>

                {/* Age */}
                <div>
                  <label
                    htmlFor='age'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Age
                  </label>
                  <Field
                    type='number'
                    name='age'
                    className='appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                  />
                  {errors.age && touched.age && (
                    <div className='text-red-500 text-xs mt-1'>
                      {errors.age}
                    </div>
                  )}
                </div>

                {/* Address */}
                <div>
                  <label
                    htmlFor='address'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Address
                  </label>
                  <Field
                    as='textarea'
                    name='address'
                    className='appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                    rows='3'
                  />
                  {errors.address && touched.address && (
                    <div className='text-red-500 text-xs mt-1'>
                      {errors.address}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <button
                  type='submit'
                  disabled={isSubmitting}
                  className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400'
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default UserForm;
