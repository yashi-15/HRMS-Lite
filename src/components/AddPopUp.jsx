import React, { useState } from 'react'

const AddPopUp = ({ onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        employeeId: '',
        name: '',
        email: '',
        designation: '',
        department: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        onClose();
    };

    return (
        <div className='fixed inset-0 bg-black/50 flex justify-center items-center z-50'>
            <div className='w-full max-w-md bg-white rounded-lg shadow-xl p-6 m-4'>
                {/* Header */}
                <div className='flex justify-between items-center mb-6'>
                    <h1 className='text-2xl font-semibold text-gray-800'>Add Employee Details</h1>
                    <button 
                        onClick={onClose}
                        className='text-gray-500 hover:text-gray-700 text-2xl leading-none'
                    >
                        ×
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className='space-y-4'>
                    <div>
                        <label htmlFor='employeeId' className='block text-sm font-medium text-gray-700 mb-1'>
                            Employee ID
                        </label>
                        <input 
                            type='text' 
                            name='employeeId' 
                            id='employeeId' 
                            value={formData.employeeId}
                            onChange={handleChange}
                            placeholder='EMP001' 
                            required
                            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none'
                        />
                    </div>

                    <div>
                        <label htmlFor='name' className='block text-sm font-medium text-gray-700 mb-1'>
                            Employee Name
                        </label>
                        <input 
                            type='text' 
                            name='name' 
                            id='name' 
                            value={formData.name}
                            onChange={handleChange}
                            placeholder='Amit Sharma' 
                            required
                            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none'
                        />
                    </div>

                    <div>
                        <label htmlFor='email' className='block text-sm font-medium text-gray-700 mb-1'>
                            Email
                        </label>
                        <input 
                            type='email' 
                            name='email' 
                            id='email' 
                            value={formData.email}
                            onChange={handleChange}
                            placeholder='amit.sharma@gmail.com' 
                            required
                            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none'
                        />
                    </div>

                    <div>
                        <label htmlFor='designation' className='block text-sm font-medium text-gray-700 mb-1'>
                            Designation
                        </label>
                        <input 
                            type='text' 
                            name='designation' 
                            id='designation' 
                            value={formData.designation}
                            onChange={handleChange}
                            placeholder='Software Engineer' 
                            required
                            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none'
                        />
                    </div>

                    <div>
                        <label htmlFor='department' className='block text-sm font-medium text-gray-700 mb-1'>
                            Department
                        </label>
                        <input 
                            type='text' 
                            name='department' 
                            id='department' 
                            value={formData.department}
                            onChange={handleChange}
                            placeholder='IT' 
                            required
                            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none'
                        />
                    </div>

                    {/* Buttons */}
                    <div className='flex gap-3 mt-6'>
                        <button 
                            type='submit'
                            className='flex-1 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium'
                        >
                            Add Employee
                        </button>
                        <button 
                            type='button'
                            onClick={onClose}
                            className='flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors font-medium'
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddPopUp