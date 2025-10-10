import Link from 'next/link';

interface LocationBreadcrumbProps {
  suburb: string;
  service?: string;
  suburbSlug: string;
}

export function LocationBreadcrumb({ suburb, service, suburbSlug }: LocationBreadcrumbProps) {
  // Capitalize first letter of suburb name
  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <nav className="mb-6" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2 text-sm">
        <li>
          <Link 
            href="/" 
            className="text-gray-600 hover:text-[#1E3D8F] transition-colors"
          >
            Home
          </Link>
        </li>
        <li className="hidden md:flex items-center">
          <svg className="w-4 h-4 text-gray-400 mx-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
          <Link 
            href="/locations" 
            className="text-gray-600 hover:text-[#1E3D8F] transition-colors"
          >
            Locations
          </Link>
        </li>
        <li className="flex items-center">
          <svg className="w-4 h-4 text-gray-400 mx-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
          <Link 
            href={`/locations/${suburbSlug}`} 
            className="text-gray-600 hover:text-[#1E3D8F] transition-colors"
          >
            {capitalizeFirstLetter(suburb)}
          </Link>
        </li>
        {service && (
          <>
            <li className="flex items-center">
              <svg className="w-4 h-4 text-gray-400 mx-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-[#1E3D8F] font-medium">{service}</span>
            </li>
          </>
        )}
      </ol>
    </nav>
  );
}
