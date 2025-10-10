'use client'

import Image from 'next/image'

interface LocationData {
  name: string;
  region: string;
  council: string;
  mainSuburbs: string[];
  postcode: string;
}

interface AirbnbImageGalleryProps {
  locationData: LocationData;
}

export default function AirbnbImageGallery({ locationData }: AirbnbImageGalleryProps) {
  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  const capitalizedSuburb = capitalizeFirstLetter(locationData.name);
  
  const images = [
    {
      src: '/images/airbnb cleaning/airbnb cleaning_kitchen.jpg',
      alt: `Professional Airbnb Kitchen Cleaning ${capitalizedSuburb}`,
      title: 'Kitchen Cleaning'
    },
    {
      src: '/images/airbnb cleaning/airbnb cleaning_bathroom.jpg',
      alt: `Professional Airbnb Bathroom Cleaning ${capitalizedSuburb}`,
      title: 'Bathroom Cleaning'
    },
    {
      src: '/images/airbnb cleaning/airbnb cleaning_toilet.jpg',
      alt: `Professional Airbnb Toilet Cleaning ${capitalizedSuburb}`,
      title: 'Toilet Cleaning'
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1E3D8F] mb-4">
            Professional Airbnb Cleaning Service in {capitalizedSuburb}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our experienced team ensures every area of your {capitalizedSuburb} Airbnb property is spotless and guest-ready.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {images.map((image, index) => (
            <div key={index} className="group">
              <div className="relative overflow-hidden rounded-lg shadow-lg">
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={400}
                  height={300}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300"></div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <h3 className="text-white font-semibold text-lg">{image.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}