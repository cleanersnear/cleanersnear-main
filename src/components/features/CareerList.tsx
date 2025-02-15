'use client'

import { useState } from 'react'
import { Search, Briefcase, MapPin, Clock, DollarSign } from 'lucide-react'

interface Career {
    id: string;
    title: string;
    location: string;
    type: 'Full-time' | 'Part-time' | 'Contract' | 'Casual';
    salary: string;
    department?: string;
    description: string;
    requirements: string[];
    responsibilities: string[];
    benefits: string[];
    isActive: boolean;
}

const departments = ['All', 'Operations', 'Cleaner', 'Management', 'Administration', 'Sales']
const jobTypes = ['All Types', 'Full-time', 'Part-time', 'Casual', 'Contract']

interface CareerListProps {
    initialCareers: Career[]
}

export default function CareerList({ initialCareers }: CareerListProps) {
    const [selectedDepartment, setSelectedDepartment] = useState('All')
    const [selectedType, setSelectedType] = useState('All Types')
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedJob, setSelectedJob] = useState<Career | null>(null)

    const filteredCareers = initialCareers.filter(career => {
        const matchesSearch = searchQuery === '' || 
            career.title.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesDepartment = selectedDepartment === 'All' || 
            career.department === selectedDepartment
        const matchesType = selectedType === 'All Types' || 
            career.type === selectedType

        return matchesSearch && matchesDepartment && matchesType
    })

    return (
        <>
            {/* Search and Filters */}
            <div className="mb-12">
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search jobs..."
                            className="w-full p-3 pr-10 border rounded-lg"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <Search className="absolute right-3 top-3 text-gray-400" size={20} />
                    </div>
                    <select
                        className="w-full p-3 border rounded-lg"
                        value={selectedDepartment}
                        onChange={(e) => setSelectedDepartment(e.target.value)}
                    >
                        {departments.map((dept) => (
                            <option key={dept} value={dept}>{dept}</option>
                        ))}
                    </select>
                    <select
                        className="w-full p-3 border rounded-lg"
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}
                    >
                        {jobTypes.map((type) => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Job Listings */}
            <div className="grid lg:grid-cols-3 gap-8">
                {/* Job List */}
                <div className="lg:col-span-2">
                    <div className="space-y-6">
                        {filteredCareers.length === 0 ? (
                            <div className="text-center py-8 bg-gray-50 rounded-lg">
                                <p className="text-gray-600">No jobs found matching your criteria</p>
                            </div>
                        ) : (
                            filteredCareers.map((job) => (
                                <div
                                    key={job.id}
                                    className={`bg-white p-6 rounded-lg shadow-md cursor-pointer transition-all hover:shadow-lg
                                        ${selectedJob?.id === job.id ? 'ring-2 ring-[#1E3D8F]' : ''}`}
                                    onClick={() => setSelectedJob(job)}
                                >
                                    <h2 className="text-xl font-bold mb-4">{job.title}</h2>
                                    <div className="grid grid-cols-2 gap-4 mb-4">
                                        <div className="flex items-center text-gray-600">
                                            <MapPin size={18} className="mr-2" />
                                            {job.location}
                                        </div>
                                        <div className="flex items-center text-gray-600">
                                            <Clock size={18} className="mr-2" />
                                            {job.type}
                                        </div>
                                        <div className="flex items-center text-gray-600">
                                            <Briefcase size={18} className="mr-2" />
                                            {job.department || 'General'}
                                        </div>
                                        <div className="flex items-center text-gray-600">
                                            <DollarSign size={18} className="mr-2" />
                                            {job.salary}
                                        </div>
                                    </div>
                                    <button 
                                        className="text-[#1E3D8F] font-medium hover:underline"
                                        onClick={() => setSelectedJob(job)}
                                    >
                                        View Details
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Job Details */}
                <div className="lg:col-span-1">
                    {selectedJob ? (
                        <div className="bg-white p-6 rounded-lg shadow-md sticky top-4">
                            <h2 className="text-2xl font-bold mb-6">{selectedJob.title}</h2>
                            
                            <div className="space-y-6">
                                <div>
                                    <h3 className="font-semibold mb-3">Job Description</h3>
                                    <p className="text-gray-600 mb-4">{selectedJob.description}</p>
                                    
                                    <h3 className="font-semibold mb-3">Responsibilities</h3>
                                    <ul className="list-disc list-inside space-y-2 text-gray-600">
                                        {selectedJob.responsibilities.map((item, index) => (
                                            <li key={index}>{item}</li>
                                        ))}
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="font-semibold mb-3">Requirements</h3>
                                    <ul className="list-disc list-inside space-y-2 text-gray-600">
                                        {selectedJob.requirements.map((item, index) => (
                                            <li key={index}>{item}</li>
                                        ))}
                                    </ul>
                                </div>

                                {selectedJob.benefits.length > 0 && (
                                    <div>
                                        <h3 className="font-semibold mb-3">Benefits</h3>
                                        <ul className="list-disc list-inside space-y-2 text-gray-600">
                                            {selectedJob.benefits.map((item, index) => (
                                                <li key={index}>{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                <a 
                                    href="https://form.jotform.com/243503684042048"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full bg-[#1E3D8F] text-white py-3 px-6 rounded-md hover:bg-opacity-90 text-center block transition-all duration-200 hover:shadow-lg"
                                >
                                    Apply Now
                                </a>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-gray-50 p-6 rounded-lg text-center text-gray-500">
                            Select a job to view details
                        </div>
                    )}
                </div>
            </div>
        </>
    )
} 