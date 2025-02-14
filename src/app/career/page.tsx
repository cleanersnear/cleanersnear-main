'use client'

import MainLayout from '@/components/layout/MainLayout'
import Image from 'next/image'
import { Briefcase, MapPin, Clock, DollarSign, Search } from 'lucide-react'
import { useState, useEffect } from 'react'
import { apiService } from '@/services/api'

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

export default function CareerPage() {
  const [careers, setCareers] = useState<Career[]>([]);
  const [selectedDepartment, setSelectedDepartment] = useState('All')
  const [selectedType, setSelectedType] = useState('All Types')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedJob, setSelectedJob] = useState<Career | null>(null)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCareers = async () => {
      try {
        const data = await apiService.fetchCareers({
          department: selectedDepartment,
          type: selectedType,
          search: searchQuery
        });
        setCareers(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch careers');
        console.error('Error fetching careers:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCareers();
  }, [selectedDepartment, selectedType, searchQuery]);

  return (
    <MainLayout>
      <div className="relative h-[300px] mt-32">
        <Image
          src="/images/career-hero.jpg"
          alt="Join Our Cleaning Team"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1E3D8F] to-transparent" />
        <div className="absolute inset-0 container mx-auto px-4 flex items-center">
          <div className="text-white max-w-2xl">
            <h1 className="text-5xl font-bold mb-4">Join Our Team</h1>
            <p className="text-xl">
              Build your career with Melbourne&apos;s leading cleaning service provider. We&apos;re always looking for dedicated professionals to join our growing team.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
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
              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1E3D8F] mx-auto"></div>
                  <p className="mt-4 text-gray-600">Loading jobs...</p>
                </div>
              ) : error ? (
                <div className="text-red-500 text-center py-8 bg-red-50 rounded-lg">
                  <p>{error}</p>
                  <button 
                    onClick={() => window.location.reload()} 
                    className="mt-4 text-sm text-[#1E3D8F] hover:underline"
                  >
                    Try again
                  </button>
                </div>
              ) : careers.length === 0 ? (
                <div className="text-center py-8 bg-gray-50 rounded-lg">
                  <p className="text-gray-600">No jobs found matching your criteria</p>
                </div>
              ) : (
                careers.map((job) => (
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
      </div>
    </MainLayout>
  )
} 