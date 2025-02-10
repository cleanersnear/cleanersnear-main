'use client'

import { Search, MapPin, ArrowRight } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useBookingStore } from '@/store/bookingStore'

interface Suburb {
  name: string
  postcode: string
  region: string
}

const suburbs: Suburb[] = [
  { name: "Jacana", postcode: "3047", region: "Melbourne" },
  { name: "Roxburgh Park", postcode: "3064", region: "Melbourne" },
    { name: "Albert Park", postcode: "3206", region: "Melbourne" },
    { name: "Albanvale", postcode: "3021", region: "Melbourne" },
    { name: "Alphington", postcode: "3078", region: "Melbourne" },
  { name: "Altona", postcode: "3018", region: "Melbourne" },
    { name: "Altona Meadows", postcode: "3028", region: "Melbourne" },
    { name: "Altona North", postcode: "3025", region: "Melbourne" },
    { name: "Ardeer", postcode: "3022", region: "Melbourne" },
  { name: "Armadale", postcode: "3143", region: "Melbourne" },
  { name: "Ascot Vale", postcode: "3032", region: "Melbourne" },
  { name: "Ashburton", postcode: "3147", region: "Melbourne" },
  { name: "Ashwood", postcode: "3147", region: "Melbourne" },
    { name: "Aspendale", postcode: "3195", region: "Melbourne" },
    { name: "Aspendale Gardens", postcode: "3195", region: "Melbourne" },
    { name: "Attwood", postcode: "3049", region: "Melbourne" },
    { name: "Auburn", postcode: "3123", region: "Melbourne" },
    { name: "Aurora", postcode: "3076", region: "Melbourne" },
  { name: "Avondale Heights", postcode: "3034", region: "Melbourne" },
    { name: "Bacchus Marsh", postcode: "3340", region: "Melbourne" },
  { name: "Balaclava", postcode: "3183", region: "Melbourne" },
  { name: "Balwyn", postcode: "3103", region: "Melbourne" },
    { name: "Bayswater", postcode: "3153", region: "Melbourne" },
    { name: "Bayswater North", postcode: "3153", region: "Melbourne" },
    { name: "Beaconsfield", postcode: "3807", region: "Melbourne" },
    { name: "Beaconsfield Upper", postcode: "3808", region: "Melbourne" },
    { name: "Beaumaris", postcode: "3193", region: "Melbourne" },
    { name: "Belgrave", postcode: "3160", region: "Melbourne" },
    { name: "Bellfield", postcode: "3081", region: "Melbourne" },
  { name: "Bentleigh", postcode: "3204", region: "Melbourne" },
    { name: "Bentleigh East", postcode: "3165", region: "Melbourne" },
    { name: "Berwick", postcode: "3806", region: "Melbourne" },
    { name: "Bittern", postcode: "3918", region: "Melbourne" },
    { name: "Black Rock", postcode: "3193", region: "Melbourne" },
  { name: "Blackburn", postcode: "3130", region: "Melbourne" },
    { name: "Blackburn North", postcode: "3130", region: "Melbourne" },
    { name: "Blackburn South", postcode: "3130", region: "Melbourne" },
    { name: "Bonbeach", postcode: "3196", region: "Melbourne" },
    { name: "Boronia", postcode: "3155", region: "Melbourne" },
    { name: "Botanic Ridge", postcode: "3977", region: "Melbourne" },
  { name: "Box Hill", postcode: "3128", region: "Melbourne" },
    { name: "Box Hill North", postcode: "3129", region: "Melbourne" },
    { name: "Box Hill South", postcode: "3128", region: "Melbourne" },
    { name: "Braybrook", postcode: "3019", region: "Melbourne" },
    { name: "Briar Hill", postcode: "3088", region: "Melbourne" },
  { name: "Brighton", postcode: "3186", region: "Melbourne" },
    { name: "Broadmeadows", postcode: "3047", region: "Melbourne" },
    { name: "Brookfield", postcode: "3338", region: "Melbourne" },
    { name: "Brooklyn", postcode: "3012", region: "Melbourne" },
  { name: "Brunswick", postcode: "3056", region: "Melbourne" },
    { name: "Brunswick East", postcode: "3057", region: "Melbourne" },
    { name: "Brunswick West", postcode: "3055", region: "Melbourne" },
    { name: "Bulleen", postcode: "3105", region: "Melbourne" },
    { name: "Burnley", postcode: "3121", region: "Melbourne" },
    { name: "Burnside", postcode: "3023", region: "Melbourne" },
    { name: "Burnside Heights", postcode: "3023", region: "Melbourne" },
    { name: "Burwood", postcode: "3125", region: "Melbourne" },
  { name: "Burwood East", postcode: "3151", region: "Melbourne" },
  { name: "Cairnlea", postcode: "3023", region: "Melbourne" },
  { name: "Calder Park", postcode: "3037", region: "Melbourne" },
  { name: "Campbellfield", postcode: "3061", region: "Melbourne" },
  { name: "Canterbury", postcode: "3126", region: "Melbourne" },
  { name: "Carlton", postcode: "3053", region: "Melbourne" },
  { name: "Carlton North", postcode: "3054", region: "Melbourne" },
  { name: "Carnegie", postcode: "3163", region: "Melbourne" },
  { name: "Caroline Springs", postcode: "3023", region: "Melbourne" },
  { name: "Carrum", postcode: "3197", region: "Melbourne" },
  { name: "Carrum Downs", postcode: "3201", region: "Melbourne" },
  { name: "Caulfield", postcode: "3162", region: "Melbourne" },
  { name: "Caulfield East", postcode: "3145", region: "Melbourne" },
  { name: "Caulfield North", postcode: "3161", region: "Melbourne" },
  { name: "Caulfield South", postcode: "3162", region: "Melbourne" },
  { name: "Chadstone", postcode: "3148", region: "Melbourne" },
  { name: "Chelsea", postcode: "3196", region: "Melbourne" },
  { name: "Chelsea Heights", postcode: "3196", region: "Melbourne" },
  { name: "Cheltenham", postcode: "3192", region: "Melbourne" },
  { name: "Chirnside Park", postcode: "3116", region: "Melbourne" },
  { name: "Clarinda", postcode: "3169", region: "Melbourne" },
  { name: "Clayton", postcode: "3168", region: "Melbourne" },
  { name: "Clayton South", postcode: "3169", region: "Melbourne" },
  { name: "Clematis", postcode: "3782", region: "Melbourne" },
  { name: "Clifton Hill", postcode: "3068", region: "Melbourne" },
  { name: "Coburg", postcode: "3058", region: "Melbourne" },
  { name: "Coburg North", postcode: "3058", region: "Melbourne" },
  { name: "Collingwood", postcode: "3066", region: "Melbourne" },
  { name: "Coolaroo", postcode: "3048", region: "Melbourne" },
  { name: "Craigieburn", postcode: "3064", region: "Melbourne" },
  { name: "Cranbourne", postcode: "3977", region: "Melbourne" },
  { name: "Cranbourne East", postcode: "3977", region: "Melbourne" },
  { name: "Cranbourne North", postcode: "3977", region: "Melbourne" },
  { name: "Cranbourne South", postcode: "3977", region: "Melbourne" },
  { name: "Cranbourne West", postcode: "3977", region: "Melbourne" },
  { name: "Cremorne", postcode: "3121", region: "Melbourne" },
  { name: "Croydon", postcode: "3136", region: "Melbourne" },
  { name: "Croydon Hills", postcode: "3136", region: "Melbourne" },
  { name: "Croydon North", postcode: "3136", region: "Melbourne" },
  { name: "Croydon South", postcode: "3136", region: "Melbourne" },
  { name: "Dallas", postcode: "3047", region: "Melbourne" },
  { name: "Dandenong", postcode: "3175", region: "Melbourne" },
  { name: "Dandenong North", postcode: "3175", region: "Melbourne" },
  { name: "Dandenong South", postcode: "3175", region: "Melbourne" },
  { name: "Deer Park", postcode: "3023", region: "Melbourne" },
  { name: "Delahey", postcode: "3037", region: "Melbourne" },
  { name: "Derrimut", postcode: "3030", region: "Melbourne" },
  { name: "Diamond Creek", postcode: "3089", region: "Melbourne" },
  { name: "Diggers Rest", postcode: "3427", region: "Melbourne" },
  { name: "Dingley Village", postcode: "3172", region: "Melbourne" },
  { name: "Docklands", postcode: "3008", region: "Melbourne" },
  { name: "Donvale", postcode: "3111", region: "Melbourne" },
  { name: "Doreen", postcode: "3754", region: "Melbourne" },
  { name: "Eaglemont", postcode: "3084", region: "Melbourne" },
  { name: "East Melbourne", postcode: "3002", region: "Melbourne" },
  { name: "Edithvale", postcode: "3196", region: "Melbourne" },
  { name: "Elsternwick", postcode: "3185", region: "Melbourne" },
  { name: "Eltham", postcode: "3095", region: "Melbourne" },
  { name: "Eltham North", postcode: "3095", region: "Melbourne" },
  { name: "Elwood", postcode: "3184", region: "Melbourne" },
  { name: "Endeavour Hills", postcode: "3802", region: "Melbourne" },
  { name: "Epping", postcode: "3076", region: "Melbourne" },
  { name: "Essendon", postcode: "3040", region: "Melbourne" },
  { name: "Essendon North", postcode: "3041", region: "Melbourne" },
  { name: "Essendon West", postcode: "3040", region: "Melbourne" },
  { name: "Fairfield", postcode: "3078", region: "Melbourne" },
  { name: "Fawkner", postcode: "3060", region: "Melbourne" },
  { name: "Ferntree Gully", postcode: "3156", region: "Melbourne" },
  { name: "Fitzroy", postcode: "3065", region: "Melbourne" },
  { name: "Fitzroy North", postcode: "3068", region: "Melbourne" },
  { name: "Flemington", postcode: "3031", region: "Melbourne" },
  { name: "Footscray", postcode: "3011", region: "Melbourne" },
  { name: "Forest Hill", postcode: "3131", region: "Melbourne" },
  { name: "Frankston", postcode: "3199", region: "Melbourne" },
  { name: "Frankston North", postcode: "3200", region: "Melbourne" },
  { name: "Frankston South", postcode: "3199", region: "Melbourne" },
  { name: "Glen Huntly", postcode: "3163", region: "Melbourne" },
  { name: "Glen Iris", postcode: "3146", region: "Melbourne" },
  { name: "Glen Waverley", postcode: "3150", region: "Melbourne" },
  { name: "Glenroy", postcode: "3046", region: "Melbourne" },
  { name: "Greensborough", postcode: "3088", region: "Melbourne" },
  { name: "Greenvale", postcode: "3059", region: "Melbourne" },
  { name: "Hampton", postcode: "3188", region: "Melbourne" },
  { name: "Hampton East", postcode: "3188", region: "Melbourne" },
  { name: "Hampton Park", postcode: "3976", region: "Melbourne" },
  { name: "Hawthorn", postcode: "3122", region: "Melbourne" },
  { name: "Hawthorn East", postcode: "3123", region: "Melbourne" },
  { name: "Heidelberg", postcode: "3084", region: "Melbourne" },
  { name: "Heidelberg Heights", postcode: "3081", region: "Melbourne" },
  { name: "Heidelberg West", postcode: "3081", region: "Melbourne" },
  { name: "Highett", postcode: "3190", region: "Melbourne" },
  { name: "Hoppers Crossing", postcode: "3029", region: "Melbourne" },
  { name: "Ivanhoe", postcode: "3079", region: "Melbourne" },
  { name: "Ivanhoe East", postcode: "3079", region: "Melbourne" },
  { name: "Keilor", postcode: "3036", region: "Melbourne" },
  { name: "Keilor Downs", postcode: "3038", region: "Melbourne" },
  { name: "Keilor East", postcode: "3033", region: "Melbourne" },
  { name: "Kensington", postcode: "3031", region: "Melbourne" },
  { name: "Kew", postcode: "3101", region: "Melbourne" },
  { name: "Kew East", postcode: "3102", region: "Melbourne" },
  { name: "Keysborough", postcode: "3173", region: "Melbourne" },
  { name: "Kingsbury", postcode: "3083", region: "Melbourne" },
  { name: "Lalor", postcode: "3075", region: "Melbourne" },
  { name: "Laverton", postcode: "3028", region: "Melbourne" },
  { name: "Malvern", postcode: "3144", region: "Melbourne" },
  { name: "Malvern East", postcode: "3145", region: "Melbourne" },
  { name: "Maribyrnong", postcode: "3032", region: "Melbourne" },
  { name: "McKinnon", postcode: "3204", region: "Melbourne" },
  { name: "Melbourne", postcode: "3000", region: "Melbourne" },
  { name: "Mentone", postcode: "3194", region: "Melbourne" },
  { name: "Middle Park", postcode: "3206", region: "Melbourne" },
  { name: "Mill Park", postcode: "3082", region: "Melbourne" },
  { name: "Mitcham", postcode: "3132", region: "Melbourne" },
  { name: "Mont Albert", postcode: "3127", region: "Melbourne" },
  { name: "Montmorency", postcode: "3094", region: "Melbourne" },
  { name: "Moonee Ponds", postcode: "3039", region: "Melbourne" },
  { name: "Moorabbin", postcode: "3189", region: "Melbourne" },
  { name: "Mordialloc", postcode: "3195", region: "Melbourne" },
  { name: "Mount Waverley", postcode: "3149", region: "Melbourne" },
  { name: "Mulgrave", postcode: "3170", region: "Melbourne" },
  { name: "Murrumbeena", postcode: "3163", region: "Melbourne" },
  { name: "Newport", postcode: "3015", region: "Melbourne" },
  { name: "Niddrie", postcode: "3042", region: "Melbourne" },
  { name: "Noble Park", postcode: "3174", region: "Melbourne" },
  { name: "North Melbourne", postcode: "3051", region: "Melbourne" },
  { name: "Northcote", postcode: "3070", region: "Melbourne" },
  { name: "Nunawading", postcode: "3131", region: "Melbourne" },
  { name: "Oak Park", postcode: "3046", region: "Melbourne" },
  { name: "Oakleigh", postcode: "3166", region: "Melbourne" },
  { name: "Oakleigh South", postcode: "3167", region: "Melbourne" },
  { name: "Parkdale", postcode: "3195", region: "Melbourne" },
  { name: "Parkville", postcode: "3052", region: "Melbourne" },
  { name: "Pascoe Vale", postcode: "3044", region: "Melbourne" },
  { name: "Port Melbourne", postcode: "3207", region: "Melbourne" },
  { name: "Prahran", postcode: "3181", region: "Melbourne" },
  { name: "Preston", postcode: "3072", region: "Melbourne" },
  { name: "Reservoir", postcode: "3073", region: "Melbourne" },
  { name: "Richmond", postcode: "3121", region: "Melbourne" },
  { name: "Rosanna", postcode: "3084", region: "Melbourne" },
  { name: "Sandringham", postcode: "3191", region: "Melbourne" },
  { name: "South Melbourne", postcode: "3205", region: "Melbourne" },
  { name: "South Yarra", postcode: "3141", region: "Melbourne" },
  { name: "Southbank", postcode: "3006", region: "Melbourne" },
  { name: "St Kilda", postcode: "3182", region: "Melbourne" },
  { name: "St Kilda East", postcode: "3183", region: "Melbourne" },
  { name: "St Kilda West", postcode: "3182", region: "Melbourne" },
  { name: "Surrey Hills", postcode: "3127", region: "Melbourne" },
  { name: "Templestowe", postcode: "3106", region: "Melbourne" },
  { name: "Thornbury", postcode: "3071", region: "Melbourne" },
  { name: "Toorak", postcode: "3142", region: "Melbourne" },
  { name: "Vermont", postcode: "3133", region: "Melbourne" },
  { name: "Werribee", postcode: "3030", region: "Melbourne" },
  { name: "West Melbourne", postcode: "3003", region: "Melbourne" },
  { name: "Williamstown", postcode: "3016", region: "Melbourne" },
  { name: "Windsor", postcode: "3181", region: "Melbourne" },
  { name: "Yarraville", postcode: "3013", region: "Melbourne" }
];

export default function LocationSearch() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [selectedSuburb, setSelectedSuburb] = useState<Suburb | null>(null)
  const setLocation = useBookingStore(state => state.setLocation)

  // Filter suburbs based on search input
  const filteredSuburbs = suburbs.filter(suburb => 
    suburb.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    suburb.postcode.includes(searchQuery)
  )

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    setShowSuggestions(true)
    setSelectedSuburb(null)
  }

  const handleSuburbSelect = (suburb: Suburb) => {
    setSelectedSuburb(suburb)
    setSearchQuery(`${suburb.name} ${suburb.postcode}`)
    setShowSuggestions(false)
    
    // Store in Zustand
    setLocation(suburb)
    
    // Keep localStorage for backward compatibility
    localStorage.setItem('selectedSuburb', JSON.stringify(suburb))
  }

  const handleCheckAvailability = () => {
    if (selectedSuburb) {
      router.push('/quick-book/service')
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Search Container */}
      <div className="relative">
        <div className="relative">
          <div className="relative group">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={() => setShowSuggestions(true)}
              placeholder="Enter your suburb or postcode"
              className="w-full px-4 py-4 pl-12 border-2 border-gray-200 rounded-xl
                focus:outline-none focus:border-[#1E3D8F] transition-all duration-200
                placeholder:text-gray-400 text-gray-700"
            />
            <div className="absolute left-4 top-1/2 -translate-y-1/2">
              <MapPin className="w-5 h-5 text-[#1E3D8F]" />
            </div>
          </div>

          {/* Enhanced suggestions dropdown with animations */}
          <AnimatePresence>
            {showSuggestions && searchQuery.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute z-50 w-full mt-2 bg-white rounded-xl shadow-xl 
                  border border-gray-100 overflow-hidden"
              >
                <div className="max-h-[300px] overflow-y-auto">
                  {filteredSuburbs.length > 0 ? (
                    filteredSuburbs.map((suburb) => (
                      <motion.button
                        key={`${suburb.name}-${suburb.postcode}`}
                        onClick={() => handleSuburbSelect(suburb)}
                        className="w-full px-4 py-3 text-left hover:bg-[#1E3D8F]/5
                          transition-colors flex items-center gap-3 border-b border-gray-100
                          last:border-0"
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <MapPin className="w-4 h-4 text-[#1E3D8F]" />
                        <div>
                          <span className="font-medium text-gray-900">{suburb.name}</span>
                          <span className="ml-2 text-sm text-gray-500">{suburb.postcode}</span>
                        </div>
                      </motion.button>
                    ))
                  ) : (
                    <div className="px-4 py-3 text-gray-500 text-center">No locations found</div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Action Button with improved styling */}
      <motion.button
        className={`mt-6 w-full py-5 rounded-xl font-semibold text-lg transition-all duration-300 
          flex items-center justify-center gap-3 group relative
          ${selectedSuburb 
            ? 'bg-[#1E3D8F] text-white hover:bg-[#1E3D8F]/90 shadow-[0_4px_20px_-4px_rgba(30,61,143,0.2)] hover:shadow-[0_8px_25px_-5px_rgba(30,61,143,0.3)]' 
            : 'bg-white text-[#1E3D8F] border-2 border-[#1E3D8F] hover:bg-[#1E3D8F]/5 shadow-sm'
          }
        `}
        disabled={!selectedSuburb}
        onClick={handleCheckAvailability}
        whileTap={{ scale: selectedSuburb ? 0.98 : 1 }}
      >
        <span>
          {selectedSuburb ? (
            <>
              Book Your Clean Now
              <span className="block text-sm font-normal text-white/90">
                Next: Choose Your Service Type
              </span>
            </>
          ) : (
            <>
              Enter Your Location First
              <span className="block text-sm font-normal text-[#1E3D8F]/80">
                We&apos;ll show you available services
              </span>
            </>
          )}
        </span>
        {selectedSuburb ? (
          <ArrowRight className="w-6 h-6 transform group-hover:translate-x-1 transition-transform" />
        ) : (
          <MapPin className="w-6 h-6 animate-bounce" />
        )}
      </motion.button>

      {/* Selected Location Confirmation - Enhanced */}
      <AnimatePresence>
        {selectedSuburb && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="mt-6 p-5 bg-gradient-to-br from-[#1E3D8F]/5 to-[#1E3D8F]/10 
              rounded-xl border border-[#1E3D8F]/10 shadow-sm"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[#1E3D8F]/10 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-[#1E3D8F]" />
              </div>
              <div>
                <p className="text-[#1E3D8F] font-semibold text-lg">
                  Perfect! We Service Your Area
                </p>
                <p className="text-gray-600">
                  {selectedSuburb.name}, {selectedSuburb.postcode} is in our service zone
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Service Areas Info - Enhanced */}
      <div className="mt-8 p-6 bg-gradient-to-br from-gray-50 to-gray-100/50 
        rounded-xl border border-gray-200/50 shadow-sm">
        <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-lg">
          <Search className="w-5 h-5 text-[#1E3D8F]" />
          Melbourne Service Coverage
        </h3>
        <p className="text-gray-600 leading-relaxed">
          We proudly service all Melbourne metropolitan areas including inner city,
          eastern, western, northern and southern suburbs with reliable and professional cleaning services.
        </p>
      </div>
    </div>
  )
} 