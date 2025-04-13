'use client'

import { Search, MapPin, ArrowRight } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useBookingStore } from '../../store/bookingStore'
import type { Suburb } from '../../types/location'

// Create a unique set of suburbs
const allSuburbs: Suburb[] = [
  // City of Banyule
  { name: "Bellfield", postcode: "3081", region: "Metropolitan North" },
  { name: "Briar Hill", postcode: "3088", region: "Metropolitan North" },
  { name: "Bundoora", postcode: "3083", region: "Metropolitan North" },
  { name: "Bundoora West", postcode: "3083", region: "Metropolitan North" },
  { name: "Eaglemont", postcode: "3084", region: "Metropolitan North" },
  { name: "Greensborough", postcode: "3088", region: "Metropolitan North" },
  { name: "Heidelberg", postcode: "3084", region: "Metropolitan North" },
  { name: "Heidelberg Heights", postcode: "3081", region: "Metropolitan North" },
  { name: "Heidelberg West", postcode: "3081", region: "Metropolitan North" },
  { name: "Ivanhoe", postcode: "3079", region: "Metropolitan North" },
  { name: "Ivanhoe East", postcode: "3079", region: "Metropolitan North" },
  { name: "Kingsbury", postcode: "3083", region: "Metropolitan North" },
  { name: "Lower Plenty", postcode: "3093", region: "Metropolitan North" },
  { name: "Macleod", postcode: "3085", region: "Metropolitan North" },
  { name: "Macleod West", postcode: "3085", region: "Metropolitan North" },
  { name: "Montmorency", postcode: "3094", region: "Metropolitan North" },
  { name: "Rosanna", postcode: "3084", region: "Metropolitan North" },
  { name: "St Helena", postcode: "3088", region: "Metropolitan North" },
  { name: "Viewbank", postcode: "3084", region: "Metropolitan North" },
  { name: "Watsonia", postcode: "3087", region: "Metropolitan North" },
  { name: "Watsonia North", postcode: "3087", region: "Metropolitan North" },
  { name: "Yallambie", postcode: "3085", region: "Metropolitan North" },

  // City of Bayside
  { name: "Beaumaris", postcode: "3193", region: "Inner Metropolitan South East" },
  { name: "Black Rock", postcode: "3193", region: "Inner Metropolitan South East" },
  { name: "Brighton", postcode: "3186", region: "Inner Metropolitan South East" },
  { name: "Brighton East", postcode: "3187", region: "Inner Metropolitan South East" },
  { name: "Cheltenham", postcode: "3192", region: "Inner Metropolitan South East" },
  { name: "Hampton", postcode: "3188", region: "Inner Metropolitan South East" },
  { name: "Hampton East", postcode: "3188", region: "Inner Metropolitan South East" },
  { name: "Highett", postcode: "3190", region: "Inner Metropolitan South East" },
  { name: "Sandringham", postcode: "3191", region: "Inner Metropolitan South East" },

  // City of Boroondara
  { name: "Ashburton", postcode: "3147", region: "Metropolitan East" },
  { name: "Balwyn", postcode: "3103", region: "Metropolitan East" },
  { name: "Balwyn North", postcode: "3104", region: "Metropolitan East" },
  { name: "Camberwell", postcode: "3124", region: "Metropolitan East" },
  { name: "Canterbury", postcode: "3126", region: "Metropolitan East" },
  { name: "Deepdene", postcode: "3103", region: "Metropolitan East" },
  { name: "Glen Iris East", postcode: "3146", region: "Metropolitan East" },
  { name: "Hawthorn", postcode: "3122", region: "Metropolitan East" },
  { name: "Hawthorn East", postcode: "3123", region: "Metropolitan East" },
  { name: "Kew", postcode: "3101", region: "Metropolitan East" },
  { name: "Kew East", postcode: "3102", region: "Metropolitan East" },
  { name: "Surrey Hills", postcode: "3127", region: "Metropolitan East" },

  // City of Brimbank
  { name: "Albanvale", postcode: "3021", region: "Metropolitan West" },
  { name: "Cairnlea", postcode: "3023", region: "Metropolitan West" },
  { name: "Delahey", postcode: "3037", region: "Metropolitan West" },
  { name: "Derrimut", postcode: "3026", region: "Metropolitan West" },
  { name: "Kealba", postcode: "3021", region: "Metropolitan West" },
  { name: "Keilor Lodge", postcode: "3038", region: "Metropolitan West" },
  { name: "Keilor North", postcode: "3036", region: "Metropolitan West" },
  { name: "Kings Park", postcode: "3021", region: "Metropolitan West" },
  { name: "Albion", postcode: "3020", region: "Metropolitan West" },
  { name: "Ardeer", postcode: "3022", region: "Metropolitan West" },
  { name: "Brooklyn", postcode: "3012", region: "Metropolitan West" },
  { name: "Deer Park", postcode: "3023", region: "Metropolitan West" },
  { name: "Keilor", postcode: "3036", region: "Metropolitan West" },
  { name: "Keilor Downs", postcode: "3038", region: "Metropolitan West" },
  { name: "Keilor East", postcode: "3033", region: "Metropolitan West" },
  { name: "Keilor Park", postcode: "3042", region: "Metropolitan West" },
  { name: "St Albans", postcode: "3021", region: "Metropolitan West" },
  { name: "Sunshine", postcode: "3020", region: "Metropolitan West" },
  { name: "Sunshine North", postcode: "3020", region: "Metropolitan West" },
  { name: "Sunshine West", postcode: "3020", region: "Metropolitan West" },
  { name: "Sydenham", postcode: "3037", region: "Metropolitan West" },
  { name: "Taylors Lakes", postcode: "3038", region: "Metropolitan West" },
  { name: "Tottenham", postcode: "3012", region: "Metropolitan West" },

  // City of Casey
  { name: "Beaconsfield", postcode: "3807", region: "Metropolitan South" },
  { name: "Berwick", postcode: "3806", region: "Metropolitan South" },
  { name: "Botanic Ridge", postcode: "3977", region: "Metropolitan South" },
  { name: "Clyde", postcode: "3978", region: "Metropolitan South" },
  { name: "Clyde North", postcode: "3978", region: "Metropolitan South" },
  { name: "Cranbourne", postcode: "3977", region: "Metropolitan South" },
  { name: "Cranbourne East", postcode: "3977", region: "Metropolitan South" },
  { name: "Cranbourne North", postcode: "3977", region: "Metropolitan South" },
  { name: "Cranbourne South", postcode: "3977", region: "Metropolitan South" },
  { name: "Cranbourne West", postcode: "3977", region: "Metropolitan South" },
  { name: "Doveton", postcode: "3177", region: "Metropolitan South" },
  { name: "Endeavour Hills", postcode: "3802", region: "Metropolitan South" },
  { name: "Eumemmerring", postcode: "3177", region: "Metropolitan South" },
  { name: "Hallam", postcode: "3803", region: "Metropolitan South" },
  { name: "Hampton Park", postcode: "3976", region: "Metropolitan South" },
  { name: "Lynbrook", postcode: "3975", region: "Metropolitan South" },
  { name: "Lyndhurst", postcode: "3975", region: "Metropolitan South" },
  { name: "Narre Warren", postcode: "3805", region: "Metropolitan South" },
  { name: "Narre Warren North", postcode: "3804", region: "Metropolitan South" },
  { name: "Narre Warren South", postcode: "3805", region: "Metropolitan South" },

  // City of Darebin
  { name: "Alphington", postcode: "3078", region: "Metropolitan North" },
  { name: "Fairfield", postcode: "3078", region: "Metropolitan North" },
  { name: "Northcote", postcode: "3070", region: "Metropolitan North" },
  { name: "Preston", postcode: "3072", region: "Metropolitan North" },
  { name: "Reservoir", postcode: "3073", region: "Metropolitan North" },
  { name: "Thornbury", postcode: "3071", region: "Metropolitan North" },

  // City of Frankston
  { name: "Carrum Downs", postcode: "3201", region: "Metropolitan South" },
  { name: "Frankston", postcode: "3199", region: "Metropolitan South" },
  { name: "Frankston North", postcode: "3200", region: "Metropolitan South" },
  { name: "Frankston South", postcode: "3199", region: "Metropolitan South" },
  { name: "Langwarrin", postcode: "3910", region: "Metropolitan South" },
  { name: "Sandhurst", postcode: "3977", region: "Metropolitan South" },
  { name: "Seaford", postcode: "3198", region: "Metropolitan South" },

  // City of Glen Eira
  { name: "Bentleigh", postcode: "3204", region: "Inner Metropolitan South East" },
  { name: "Bentleigh East", postcode: "3165", region: "Inner Metropolitan South East" },
  { name: "Caulfield", postcode: "3162", region: "Inner Metropolitan South East" },
  { name: "Caulfield East", postcode: "3145", region: "Inner Metropolitan South East" },
  { name: "Caulfield North", postcode: "3161", region: "Inner Metropolitan South East" },
  { name: "Caulfield South", postcode: "3162", region: "Inner Metropolitan South East" },
  { name: "Carnegie", postcode: "3163", region: "Inner Metropolitan South East" },
  { name: "Elsternwick", postcode: "3185", region: "Inner Metropolitan South East" },
  { name: "Gardenvale", postcode: "3185", region: "Inner Metropolitan South East" },
  { name: "Glen Huntly", postcode: "3163", region: "Inner Metropolitan South East" },
  { name: "McKinnon", postcode: "3204", region: "Inner Metropolitan South East" },
  { name: "Murrumbeena", postcode: "3163", region: "Inner Metropolitan South East" },
  { name: "Ormond", postcode: "3204", region: "Inner Metropolitan South East" },
  { name: "Ripponlea", postcode: "3185", region: "Inner Metropolitan South East" },

  // City of Greater Dandenong
  { name: "Dandenong", postcode: "3175", region: "Metropolitan South" },
  { name: "Dandenong North", postcode: "3175", region: "Metropolitan South" },
  { name: "Dandenong South", postcode: "3175", region: "Metropolitan South" },
  { name: "Keysborough", postcode: "3173", region: "Metropolitan South" },
  { name: "Noble Park", postcode: "3174", region: "Metropolitan South" },
  { name: "Noble Park North", postcode: "3174", region: "Metropolitan South" },
  { name: "Springvale", postcode: "3171", region: "Metropolitan South" },
  { name: "Springvale South", postcode: "3172", region: "Metropolitan South" },

  // City of Hobsons Bay
  { name: "Altona", postcode: "3018", region: "Metropolitan West" },
  { name: "Altona Meadows", postcode: "3028", region: "Metropolitan West" },
  { name: "Altona North", postcode: "3025", region: "Metropolitan West" },
  { name: "Laverton", postcode: "3028", region: "Metropolitan West" },
  { name: "Laverton North", postcode: "3026", region: "Metropolitan West" },
  { name: "Newport", postcode: "3015", region: "Metropolitan West" },
  { name: "Seabrook", postcode: "3028", region: "Metropolitan West" },
  { name: "Seaholme", postcode: "3018", region: "Metropolitan West" },
  { name: "South Kingsville", postcode: "3015", region: "Metropolitan West" },
  { name: "Spotswood", postcode: "3015", region: "Metropolitan West" },
  { name: "Williamstown", postcode: "3016", region: "Metropolitan West" },
  { name: "Williamstown North", postcode: "3016", region: "Metropolitan West" },

  // City of Hume
  { name: "Attwood", postcode: "3049", region: "Metropolitan North" },
  { name: "Broadmeadows", postcode: "3047", region: "Metropolitan North" },
  { name: "Bulla", postcode: "3428", region: "Metropolitan North" },
  { name: "Campbellfield", postcode: "3061", region: "Metropolitan North" },
  { name: "Coolaroo", postcode: "3048", region: "Metropolitan North" },
  { name: "Craigieburn", postcode: "3064", region: "Metropolitan North" },
  { name: "Dallas", postcode: "3047", region: "Metropolitan North" },
  { name: "Gladstone Park", postcode: "3043", region: "Metropolitan North" },
  { name: "Greenvale", postcode: "3059", region: "Metropolitan North" },
  { name: "Jacana", postcode: "3047", region: "Metropolitan North" },
  { name: "Meadow Heights", postcode: "3049", region: "Metropolitan North" },
  { name: "Melbourne Airport", postcode: "3045", region: "Metropolitan North" },
  { name: "Mickleham", postcode: "3064", region: "Metropolitan North" },
  { name: "Oaklands Junction", postcode: "3063", region: "Metropolitan North" },
  { name: "Roxburgh Park", postcode: "3064", region: "Metropolitan North" },
  { name: "Sunbury", postcode: "3429", region: "Metropolitan North" },
  { name: "Tullamarine", postcode: "3043", region: "Metropolitan North" },
  { name: "Westmeadows", postcode: "3049", region: "Metropolitan North" },

  // City of Kingston
  { name: "Aspendale", postcode: "3195", region: "Metropolitan South" },
  { name: "Aspendale Gardens", postcode: "3195", region: "Metropolitan South" },
  { name: "Bonbeach", postcode: "3196", region: "Metropolitan South" },
  { name: "Carrum", postcode: "3197", region: "Metropolitan South" },
  { name: "Chelsea", postcode: "3196", region: "Metropolitan South" },
  { name: "Chelsea Heights", postcode: "3196", region: "Metropolitan South" },
  { name: "Cheltenham", postcode: "3192", region: "Metropolitan South" },
  { name: "Edithvale", postcode: "3196", region: "Metropolitan South" },
  { name: "Mentone", postcode: "3194", region: "Metropolitan South" },
  { name: "Moorabbin", postcode: "3189", region: "Metropolitan South" },
  { name: "Parkdale", postcode: "3195", region: "Metropolitan South" },

  // City of Knox
  { name: "Bayswater", postcode: "3153", region: "Metropolitan East" },
  { name: "Bayswater North", postcode: "3153", region: "Metropolitan East" },
  { name: "Boronia", postcode: "3155", region: "Metropolitan East" },
  { name: "Ferntree Gully", postcode: "3156", region: "Metropolitan East" },
  { name: "Knoxfield", postcode: "3180", region: "Metropolitan East" },
  { name: "Lysterfield", postcode: "3156", region: "Metropolitan East" },
  { name: "Rowville", postcode: "3178", region: "Metropolitan East" },
  { name: "Scoresby", postcode: "3179", region: "Metropolitan East" },
  { name: "The Basin", postcode: "3154", region: "Metropolitan East" },
  { name: "Upper Ferntree Gully", postcode: "3156", region: "Metropolitan East" },
  { name: "Wantirna", postcode: "3152", region: "Metropolitan East" },
  { name: "Wantirna South", postcode: "3152", region: "Metropolitan East" },

  // City of Manningham
  { name: "Bulleen", postcode: "3105", region: "Metropolitan East" },
  { name: "Doncaster", postcode: "3108", region: "Metropolitan East" },
  { name: "Doncaster East", postcode: "3109", region: "Metropolitan East" },
  { name: "Donvale", postcode: "3111", region: "Metropolitan East" },
  { name: "Park Orchards", postcode: "3114", region: "Metropolitan East" },
  { name: "Templestowe", postcode: "3106", region: "Metropolitan East" },
  { name: "Templestowe Lower", postcode: "3107", region: "Metropolitan East" },
  { name: "Warrandyte", postcode: "3113", region: "Metropolitan East" },

  // City of Maribyrnong
  { name: "Braybrook", postcode: "3019", region: "Metropolitan West" },
  { name: "Footscray", postcode: "3011", region: "Metropolitan West" },
  { name: "Kingsville", postcode: "3012", region: "Metropolitan West" },
  { name: "Maribyrnong", postcode: "3032", region: "Metropolitan West" },
  { name: "Maidstone", postcode: "3012", region: "Metropolitan West" },
  { name: "Seddon", postcode: "3011", region: "Metropolitan West" },
  { name: "West Footscray", postcode: "3012", region: "Metropolitan West" },
  { name: "Yarraville", postcode: "3013", region: "Metropolitan West" },

  // City of Maroondah
  { name: "Croydon", postcode: "3136", region: "Metropolitan East" },
  { name: "Croydon Hills", postcode: "3136", region: "Metropolitan East" },
  { name: "Croydon North", postcode: "3136", region: "Metropolitan East" },
  { name: "Croydon South", postcode: "3136", region: "Metropolitan East" },
  { name: "Heathmont", postcode: "3135", region: "Metropolitan East" },
  { name: "Kilsyth", postcode: "3137", region: "Metropolitan East" },
  { name: "Kilsyth South", postcode: "3137", region: "Metropolitan East" },
  { name: "Ringwood", postcode: "3134", region: "Metropolitan East" },
  { name: "Ringwood East", postcode: "3135", region: "Metropolitan East" },
  { name: "Ringwood North", postcode: "3134", region: "Metropolitan East" },
  { name: "Warranwood", postcode: "3134", region: "Metropolitan East" },

  // City of Melbourne
  { name: "Carlton", postcode: "3053", region: "Inner City Melbourne" },
  { name: "Carlton North", postcode: "3054", region: "Inner City Melbourne" },
  { name: "Docklands", postcode: "3008", region: "Inner City Melbourne" },
  { name: "East Melbourne", postcode: "3002", region: "Inner City Melbourne" },
  { name: "Kensington", postcode: "3031", region: "Inner City Melbourne" },
  { name: "Melbourne", postcode: "3000", region: "Inner City Melbourne" },
  { name: "North Melbourne", postcode: "3051", region: "Inner City Melbourne" },
  { name: "Parkville", postcode: "3052", region: "Inner City Melbourne" },
  { name: "Princes Hill", postcode: "3054", region: "Inner City Melbourne" },
  { name: "South Wharf", postcode: "3006", region: "Inner City Melbourne" },
  { name: "Southbank", postcode: "3006", region: "Inner City Melbourne" },
  { name: "West Melbourne", postcode: "3003", region: "Inner City Melbourne" },

  // City of Melton
  { name: "Burnside", postcode: "3023", region: "Metropolitan West" },
  { name: "Caroline Springs", postcode: "3023", region: "Metropolitan West" },
  { name: "Hillside", postcode: "3037", region: "Metropolitan West" },
  { name: "Melton", postcode: "3337", region: "Metropolitan West" },
  { name: "Melton South", postcode: "3338", region: "Metropolitan West" },
  { name: "Taylors Hill", postcode: "3037", region: "Metropolitan West" },

  // City of Merri-bek
  { name: "Brunswick", postcode: "3056", region: "Metropolitan North" },
  { name: "Brunswick East", postcode: "3057", region: "Metropolitan North" },
  { name: "Brunswick West", postcode: "3055", region: "Metropolitan North" },
  { name: "Coburg", postcode: "3058", region: "Metropolitan North" },
  { name: "Coburg North", postcode: "3058", region: "Metropolitan North" },
  { name: "Fawkner", postcode: "3060", region: "Metropolitan North" },
  { name: "Glenroy", postcode: "3046", region: "Metropolitan North" },
  { name: "Hadfield", postcode: "3046", region: "Metropolitan North" },
  { name: "Oak Park", postcode: "3046", region: "Metropolitan North" },
  { name: "Pascoe Vale", postcode: "3044", region: "Metropolitan North" },
  { name: "Pascoe Vale South", postcode: "3044", region: "Metropolitan North" },

  // City of Monash
  { name: "Ashwood", postcode: "3147", region: "Metropolitan East" },
  { name: "Box Hill", postcode: "3128", region: "Metropolitan East" },
  { name: "Box Hill North", postcode: "3129", region: "Metropolitan East" },
  { name: "Box Hill South", postcode: "3128", region: "Metropolitan East" },
  { name: "Burwood", postcode: "3125", region: "Metropolitan East" },
  { name: "Burwood East", postcode: "3151", region: "Metropolitan East" },
  { name: "Chadstone", postcode: "3148", region: "Metropolitan East" },
  { name: "Clayton", postcode: "3168", region: "Metropolitan East" },
  { name: "Clayton South", postcode: "3169", region: "Metropolitan East" },
  { name: "Glen Waverley", postcode: "3150", region: "Metropolitan East" },
  { name: "Hughesdale", postcode: "3166", region: "Metropolitan East" },
  { name: "Mount Waverley", postcode: "3149", region: "Metropolitan East" },
  { name: "Mulgrave", postcode: "3170", region: "Metropolitan East" },
  { name: "Notting Hill", postcode: "3168", region: "Metropolitan East" },
  { name: "Oakleigh", postcode: "3166", region: "Metropolitan East" },
  { name: "Oakleigh East", postcode: "3166", region: "Metropolitan East" },
  { name: "Oakleigh South", postcode: "3167", region: "Metropolitan East" },
  { name: "Wheelers Hill", postcode: "3150", region: "Metropolitan East" },

  // City of Moonee Valley
  { name: "Airport West", postcode: "3042", region: "Metropolitan West" },
  { name: "Ascot Vale", postcode: "3032", region: "Metropolitan West" },
  { name: "Avondale Heights", postcode: "3034", region: "Metropolitan West" },
  { name: "Essendon", postcode: "3040", region: "Metropolitan West" },
  { name: "Essendon North", postcode: "3041", region: "Metropolitan West" },
  { name: "Essendon West", postcode: "3040", region: "Metropolitan West" },
  { name: "Moonee Ponds", postcode: "3039", region: "Metropolitan West" },
  { name: "Strathmore", postcode: "3041", region: "Metropolitan West" },

  // City of Nillumbik
  { name: "Diamond Creek", postcode: "3089", region: "Metropolitan North" },
  { name: "Eltham", postcode: "3095", region: "Metropolitan North" },
  { name: "Eltham North", postcode: "3095", region: "Metropolitan North" },
  { name: "Hurstbridge", postcode: "3099", region: "Metropolitan North" },
  { name: "Research", postcode: "3095", region: "Metropolitan North" },
  { name: "Wattle Glen", postcode: "3096", region: "Metropolitan North" },

  // City of Port Phillip
  { name: "Albert Park", postcode: "3206", region: "Inner Metropolitan South East" },
  { name: "Elwood", postcode: "3184", region: "Inner Metropolitan South East" },
  { name: "Middle Park", postcode: "3206", region: "Inner Metropolitan South East" },
  { name: "Port Melbourne", postcode: "3207", region: "Inner Metropolitan South East" },
  { name: "South Melbourne", postcode: "3205", region: "Inner Metropolitan South East" },
  { name: "St Kilda", postcode: "3182", region: "Inner Metropolitan South East" },
  { name: "St Kilda East", postcode: "3183", region: "Inner Metropolitan South East" },
  { name: "St Kilda West", postcode: "3182", region: "Inner Metropolitan South East" },

  // City of Stonnington
  { name: "Armadale", postcode: "3143", region: "Inner Metropolitan South East" },
  { name: "Hawksburn", postcode: "3142", region: "Inner Metropolitan South East" },
  { name: "Malvern", postcode: "3144", region: "Inner Metropolitan South East" },
  { name: "Malvern East", postcode: "3145", region: "Inner Metropolitan South East" },
  { name: "Prahran", postcode: "3181", region: "Inner Metropolitan South East" },
  { name: "South Yarra", postcode: "3141", region: "Inner Metropolitan South East" },
  { name: "Toorak", postcode: "3142", region: "Inner Metropolitan South East" },
  { name: "Windsor", postcode: "3181", region: "Inner Metropolitan South East" },

  // City of Whitehorse
  { name: "Blackburn", postcode: "3130", region: "Metropolitan East" },
  { name: "Blackburn North", postcode: "3130", region: "Metropolitan East" },
  { name: "Blackburn South", postcode: "3130", region: "Metropolitan East" },
  { name: "Box Hill", postcode: "3128", region: "Metropolitan East" },
  { name: "Box Hill North", postcode: "3129", region: "Metropolitan East" },
  { name: "Box Hill South", postcode: "3128", region: "Metropolitan East" },
  { name: "Burwood", postcode: "3125", region: "Metropolitan East" },
  { name: "Burwood East", postcode: "3151", region: "Metropolitan East" },
  { name: "Forest Hill", postcode: "3131", region: "Metropolitan East" },
  { name: "Mitcham", postcode: "3132", region: "Metropolitan East" },
  { name: "Mont Albert", postcode: "3127", region: "Metropolitan East" },
  { name: "Mont Albert North", postcode: "3129", region: "Metropolitan East" },
  { name: "Nunawading", postcode: "3131", region: "Metropolitan East" },
  { name: "Surrey Hills", postcode: "3127", region: "Metropolitan East" },
  { name: "Vermont", postcode: "3133", region: "Metropolitan East" },
  { name: "Vermont South", postcode: "3133", region: "Metropolitan East" },

  // City of Whittlesea
  { name: "Epping", postcode: "3076", region: "Metropolitan North" },
  { name: "Lalor", postcode: "3075", region: "Metropolitan North" },
  { name: "Mernda", postcode: "3754", region: "Metropolitan North" },
  { name: "Mill Park", postcode: "3082", region: "Metropolitan North" },
  { name: "South Morang", postcode: "3752", region: "Metropolitan North" },
  { name: "Thomastown", postcode: "3074", region: "Metropolitan North" },
  { name: "Wollert", postcode: "3750", region: "Metropolitan North" },

  // City of Wyndham
  { name: "Hoppers Crossing", postcode: "3029", region: "Metropolitan West" },
  { name: "Point Cook", postcode: "3030", region: "Metropolitan West" },
  { name: "Tarneit", postcode: "3029", region: "Metropolitan West" },
  { name: "Truganina", postcode: "3029", region: "Metropolitan West" },
  { name: "Werribee", postcode: "3030", region: "Metropolitan West" },
  { name: "Williams Landing", postcode: "3027", region: "Metropolitan West" },

  // City of Yarra
  { name: "Abbotsford", postcode: "3067", region: "Inner City Melbourne" },
  { name: "Burnley", postcode: "3121", region: "Inner City Melbourne" },
  { name: "Carlton", postcode: "3053", region: "Inner City Melbourne" },
  { name: "Carlton North", postcode: "3054", region: "Inner City Melbourne" },
  { name: "Clifton Hill", postcode: "3068", region: "Inner City Melbourne" },
  { name: "Collingwood", postcode: "3066", region: "Inner City Melbourne" },
  { name: "Cremorne", postcode: "3121", region: "Inner City Melbourne" },
  { name: "Fitzroy", postcode: "3065", region: "Inner City Melbourne" },
  { name: "Fitzroy North", postcode: "3068", region: "Inner City Melbourne" },
  { name: "Richmond", postcode: "3121", region: "Inner City Melbourne" }
];

// Remove duplicates by creating a Map with name-postcode as key
const uniqueSuburbsMap = new Map(
  allSuburbs.map(suburb => [`${suburb.name}-${suburb.postcode}`, suburb])
);

export const suburbs = Array.from(uniqueSuburbsMap.values());

export default function LocationSearch() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [selectedSuburb, setSelectedSuburb] = useState<Suburb | null>(null)
  const setLocation = useBookingStore(state => state.setLocation)

  // Filter suburbs based on search input
  const filteredSuburbs = suburbs.filter(suburb => {
    const searchLower = searchQuery.toLowerCase().trim();
    const suburbLower = suburb.name.toLowerCase();
    const postcodeLower = suburb.postcode;
    
    // Exact matches
    if (suburbLower === searchLower || postcodeLower === searchQuery) {
      return true;
    }
    
    // Starts with matches
    if (suburbLower.startsWith(searchLower) || postcodeLower.startsWith(searchQuery)) {
      return true;
    }
    
    // For partial matches in the middle, require at least 3 characters
    if (searchLower.length >= 3 && (
      suburbLower.includes(searchLower) || 
      postcodeLower.includes(searchQuery)
    )) {
      return true;
    }
    
    return false;
  }).sort((a, b) => {
    const searchLower = searchQuery.toLowerCase().trim();
    const aLower = a.name.toLowerCase();
    const bLower = b.name.toLowerCase();
    
    // First priority: exact matches
    const aExact = aLower === searchLower || a.postcode === searchQuery;
    const bExact = bLower === searchLower || b.postcode === searchQuery;
    if (aExact && !bExact) return -1;
    if (!aExact && bExact) return 1;
    
    // Second priority: starts-with matches
    const aStartsWith = aLower.startsWith(searchLower) || a.postcode.startsWith(searchQuery);
    const bStartsWith = bLower.startsWith(searchLower) || b.postcode.startsWith(searchQuery);
    if (aStartsWith && !bStartsWith) return -1;
    if (!aStartsWith && bStartsWith) return 1;
    
    // Third priority: alphabetical order
    return aLower.localeCompare(bLower);
  });

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
                    filteredSuburbs.map((suburb, index) => (
                      <motion.button
                        key={`${suburb.name}-${suburb.postcode}-${suburb.region}-${index}`}
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