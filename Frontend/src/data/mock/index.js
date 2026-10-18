// Mock Data Store for FoodBridge AI

export const MOCK_USERS = [
  {
    id: "usr_donor_1",
    name: "Adarsh",
    email: "adarsh@donor.com",
    role: "DONOR",
    phone: "+1 (555) 019-2834",
    profileImage: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150",
    organization: "The Grand Pavilion Restaurant",
    address: "742 Evergreen Terrace, Sector 4",
    city: "Metropolis",
    state: "NY",
    pincode: "10001",
    joinedDate: "2025-03-12"
  },
  {
    id: "usr_ngo_1",
    name: "Sarah Jenkins",
    email: "sarah@hopefeeding.org",
    role: "NGO",
    phone: "+1 (555) 024-9124",
    profileImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    organization: "Hope Feeding Foundation",
    address: "1024 Humanity Way, Building B",
    city: "Metropolis",
    state: "NY",
    pincode: "10012",
    ngoType: "Shelter & Soup Kitchen",
    capacity: 500, // meals per day
    foodCategories: ["Prepared Meals", "Grains & Rice", "Vegetables & Fruits"],
    operatingHours: "08:00 AM - 09:00 PM",
    joinedDate: "2024-06-18"
  },
  {
    id: "usr_volunteer_1",
    name: "Marcus Brody",
    email: "marcus@volunteer.net",
    role: "VOLUNTEER",
    phone: "+1 (555) 039-4482",
    profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
    address: "450 Transit Blvd, Apt 3C",
    city: "Metropolis",
    state: "NY",
    pincode: "10005",
    vehicleType: "Electric Hatchback",
    availability: "Flexible Weekdays",
    preferredRadius: 8, // km
    joinedDate: "2025-01-05"
  },
  {
    id: "usr_admin_1",
    name: "Super Administrator",
    email: "admin@foodbridge.ai",
    role: "ADMIN",
    phone: "+1 (555) 999-0000",
    profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
    joinedDate: "2024-01-01"
  }
];

export const MOCK_DONATIONS = [
  {
    id: "FD-1024",
    donorId: "usr_donor_1",
    donorName: "The Grand Pavilion Restaurant",
    foodName: "Premium Basmati Rice & Mixed Vegetable Curry",
    category: "Prepared Meals",
    quantity: "45 kg",
    mealCount: 120,
    prepTime: "2026-10-08T18:30:00Z",
    storageCondition: "Refrigerated",
    packaging: "Sealed Aluminum Trays",
    foodAge: "2 hours",
    remainingUsableHours: 6,
    pickupAddress: "742 Evergreen Terrace, Sector 4",
    city: "Metropolis",
    location: { lat: 40.7128, lng: -74.0060 },
    pickupDeadline: "2026-10-09T00:30:00Z",
    preferredPickupTime: "09:30 PM - 10:30 PM",
    status: "Matched", // Pending, Matched, Assigned, PickedUp, Delivered, Expired
    urgency: "HIGH",
    urgencyScore: 87,
    assignedNgoId: "usr_ngo_1",
    assignedNgoName: "Hope Feeding Foundation",
    assignedVolunteerId: "usr_volunteer_1",
    assignedVolunteerName: "Marcus Brody",
    timeline: [
      { status: "Donation Created", time: "2026-10-08T19:00:00Z", completed: true },
      { status: "AI Analyzed (HIGH Urgency)", time: "2026-10-08T19:01:12Z", completed: true },
      { status: "NGO Matched", time: "2026-10-08T19:05:44Z", completed: true },
      { status: "Volunteer Assigned", time: "2026-10-08T19:15:00Z", completed: true },
      { status: "Picked Up", time: null, completed: false },
      { status: "Delivered", time: null, completed: false }
    ],
    urgencyFactors: [
      { name: "Time Since Prep", percentage: 75 },
      { name: "Temperature Drift", percentage: 42 },
      { name: "Urgent NGO Demand", percentage: 90 },
      { name: "Distance Factor", percentage: 35 }
    ]
  },
  {
    id: "FD-1025",
    donorId: "usr_donor_1",
    donorName: "The Grand Pavilion Restaurant",
    foodName: "Fresh Bakery Assortment (Croissants, Muffins, Bread)",
    category: "Bakery Products",
    quantity: "15 kg",
    mealCount: 50,
    prepTime: "2026-10-08T16:00:00Z",
    storageCondition: "Ambient",
    packaging: "Paper Bags in Plastic Crates",
    foodAge: "4 hours",
    remainingUsableHours: 24,
    pickupAddress: "742 Evergreen Terrace, Sector 4",
    city: "Metropolis",
    location: { lat: 40.7128, lng: -74.0060 },
    pickupDeadline: "2026-10-09T16:00:00Z",
    preferredPickupTime: "08:00 AM - 10:00 AM",
    status: "Pending",
    urgency: "LOW",
    urgencyScore: 28,
    assignedNgoId: null,
    assignedNgoName: null,
    assignedVolunteerId: null,
    assignedVolunteerName: null,
    timeline: [
      { status: "Donation Created", time: "2026-10-08T19:30:00Z", completed: true },
      { status: "AI Analyzed (LOW Urgency)", time: "2026-10-08T19:31:05Z", completed: true },
      { status: "NGO Matched", time: null, completed: false },
      { status: "Volunteer Assigned", time: null, completed: false },
      { status: "Picked Up", time: null, completed: false },
      { status: "Delivered", time: null, completed: false }
    ],
    urgencyFactors: [
      { name: "Time Since Prep", percentage: 20 },
      { name: "Temperature Drift", percentage: 10 },
      { name: "Urgent NGO Demand", percentage: 40 },
      { name: "Distance Factor", percentage: 15 }
    ]
  },
  {
    id: "FD-1026",
    donorId: "usr_donor_2",
    donorName: "SuperSaver Wholesale Club",
    foodName: "Fresh Organic Vegetables (Carrots, Potatoes, Tomatoes)",
    category: "Vegetables & Fruits",
    quantity: "120 kg",
    mealCount: 300,
    prepTime: "2026-10-08T08:00:00Z",
    storageCondition: "Refrigerated",
    packaging: "Ventilated Wooden Crates",
    foodAge: "12 hours",
    remainingUsableHours: 72,
    pickupAddress: "1200 Commercial Drive, Zone 9",
    city: "Metropolis",
    location: { lat: 40.7306, lng: -73.9352 },
    pickupDeadline: "2026-10-10T12:00:00Z",
    preferredPickupTime: "02:00 PM - 05:00 PM",
    status: "Delivered",
    urgency: "LOW",
    urgencyScore: 18,
    assignedNgoId: "usr_ngo_1",
    assignedNgoName: "Hope Feeding Foundation",
    assignedVolunteerId: "usr_volunteer_1",
    assignedVolunteerName: "Marcus Brody",
    timeline: [
      { status: "Donation Created", time: "2026-10-08T09:00:00Z", completed: true },
      { status: "AI Analyzed (LOW Urgency)", time: "2026-10-08T09:01:00Z", completed: true },
      { status: "NGO Matched", time: "2026-10-08T09:10:00Z", completed: true },
      { status: "Volunteer Assigned", time: "2026-10-08T09:30:00Z", completed: true },
      { status: "Picked Up", time: "2026-10-08T11:15:00Z", completed: true },
      { status: "Delivered", time: "2026-10-08T12:05:00Z", completed: true }
    ],
    urgencyFactors: [
      { name: "Time Since Prep", percentage: 12 },
      { name: "Temperature Drift", percentage: 8 },
      { name: "Urgent NGO Demand", percentage: 32 },
      { name: "Distance Factor", percentage: 22 }
    ]
  },
  {
    id: "FD-1027",
    donorId: "usr_donor_3",
    donorName: "Healthy Foods Catering",
    foodName: "Roasted Chicken Breasts & Herb Potatoes",
    category: "Prepared Meals",
    quantity: "35 kg",
    mealCount: 90,
    prepTime: "2026-10-08T19:15:00Z",
    storageCondition: "Hot Hold",
    packaging: "Insulated Catering Boxes",
    foodAge: "1 hour",
    remainingUsableHours: 3,
    pickupAddress: "88 Gourmet Blvd, District 1",
    city: "Metropolis",
    location: { lat: 40.7484, lng: -73.9857 },
    pickupDeadline: "2026-10-08T22:15:00Z",
    preferredPickupTime: "07:30 PM - 08:30 PM",
    status: "Pending",
    urgency: "HIGH",
    urgencyScore: 94,
    assignedNgoId: null,
    assignedNgoName: null,
    assignedVolunteerId: null,
    assignedVolunteerName: null,
    timeline: [
      { status: "Donation Created", time: "2026-10-08T19:45:00Z", completed: true },
      { status: "AI Analyzed (HIGH Urgency)", time: "2026-10-08T19:46:10Z", completed: true },
      { status: "NGO Matched", time: null, completed: false },
      { status: "Volunteer Assigned", time: null, completed: false },
      { status: "Picked Up", time: null, completed: false },
      { status: "Delivered", time: null, completed: false }
    ],
    urgencyFactors: [
      { name: "Time Since Prep", percentage: 95 },
      { name: "Temperature Drift", percentage: 80 },
      { name: "Urgent NGO Demand", percentage: 92 },
      { name: "Distance Factor", percentage: 40 }
    ]
  }
];

export const MOCK_NGOS = [
  {
    id: "usr_ngo_1",
    name: "Hope Feeding Foundation",
    location: { lat: 40.7250, lng: -74.0010 },
    demandLevel: "HIGH",
    distance: "2.4 km",
    needs: ["Prepared Meals", "Dairy", "Vegetables"],
    capacityStatus: "Available (68% capacity filled)",
    currentStorage: "340 kg",
    totalCapacity: "500 kg"
  },
  {
    id: "ngo_2",
    name: "St. Jude Food Pantry",
    location: { lat: 40.7190, lng: -73.9910 },
    demandLevel: "MEDIUM",
    distance: "4.1 km",
    needs: ["Canned Food", "Dry Grains", "Bakery Products"],
    capacityStatus: "Comfortable (45% capacity filled)",
    currentStorage: "180 kg",
    totalCapacity: "400 kg"
  },
  {
    id: "ngo_3",
    name: "Metropolis Shelter Collective",
    location: { lat: 40.7310, lng: -74.0150 },
    demandLevel: "HIGH",
    distance: "1.8 km",
    needs: ["Prepared Meals", "Baby Food", "Vegetables"],
    capacityStatus: "Critical (92% capacity filled)",
    currentStorage: "276 kg",
    totalCapacity: "300 kg"
  }
];

export const MOCK_VOLUNTEERS = [
  {
    id: "usr_volunteer_1",
    name: "Marcus Brody",
    vehicle: "Electric Hatchback",
    status: "Assigned", // Idle, Assigned, InTransit
    location: { lat: 40.7180, lng: -74.0040 }
  },
  {
    id: "vol_2",
    name: "Clara Simmons",
    vehicle: "Cargo E-Bike",
    status: "Idle",
    location: { lat: 40.7290, lng: -73.9960 }
  }
];

export const MOCK_AGENTS = [
  {
    id: "donation_agent",
    name: "Donation Analysis Agent",
    status: "Active",
    successRate: "98.4%",
    tasksToday: 142,
    purpose: "Analyzes incoming surplus uploads, computes remaining safe consumable hours, and flags freshness profiles.",
    lastAction: "Analyzed Donation #FD-1027: Calculated 3 hours Hot Hold expiry.",
    systemLoad: "12%",
    confidenceRating: "97.5%"
  },
  {
    id: "demand_agent",
    name: "Demand Prediction Agent",
    status: "Active",
    successRate: "95.1%",
    tasksToday: 89,
    purpose: "Predicts regional NGO surplus demand based on seasonal, weekly, and socioeconomic food distribution patterns.",
    lastAction: "Updated Metropolis North demand index: Grains forecast elevated by 14%.",
    systemLoad: "24%",
    confidenceRating: "93.0%"
  },
  {
    id: "matching_agent",
    name: "Smart Matchmaker Agent",
    status: "Active",
    successRate: "97.9%",
    tasksToday: 114,
    purpose: "Matches active surplus food with target NGOs based on urgency, capacity metrics, categories, and vehicle paths.",
    lastAction: "Successfully matched FD-1024 with Hope Feeding Foundation.",
    systemLoad: "31%",
    confidenceRating: "96.2%"
  },
  {
    id: "logistics_agent",
    name: "Logistics Routing Agent",
    status: "Active",
    successRate: "96.8%",
    tasksToday: 76,
    purpose: "Coordinates volunteers, creates multi-stop routing directions, and optimizes battery/fuel consumption paths.",
    lastAction: "Dispatched optimal route for Marcus Brody to pick up Basmati Rice donation.",
    systemLoad: "18%",
    confidenceRating: "95.8%"
  },
  {
    id: "notification_agent",
    name: "Agentic Communicator",
    status: "Active",
    successRate: "99.2%",
    tasksToday: 320,
    purpose: "Handles SMS, emails, and platform triggers to alert actors when actions are requested or predictions shift.",
    lastAction: "Sent urgent push notification to 12 local volunteers for high-urgency catering pickup.",
    systemLoad: "8%",
    confidenceRating: "99.0%"
  },
  {
    id: "analytics_agent",
    name: "Impact Analytics Agent",
    status: "Idle",
    successRate: "99.9%",
    tasksToday: 24,
    purpose: "Synthesizes redistribution data, computes carbon offset ratios, and builds community health logs.",
    lastAction: "Generated Monthly Sustainability Report for Metropolis Council.",
    systemLoad: "2%",
    confidenceRating: "98.9%"
  }
];

export const MOCK_NOTIFICATIONS = [
  {
    id: "not_1",
    title: "AI MATCH FOUND",
    message: "Your Basmati Rice donation has been matched with Hope Feeding Foundation. Marcus Brody is on the way.",
    type: "match",
    urgency: "HIGH",
    time: "5 minutes ago",
    read: false
  },
  {
    id: "not_2",
    title: "URGENCY ALERT",
    message: "New High Urgency donation (Basmati Rice, 45 kg) available 2.4 km away from your pantry.",
    type: "alert",
    urgency: "HIGH",
    time: "20 minutes ago",
    read: false
  },
  {
    id: "not_3",
    title: "DELIVERY SUCCESSFUL",
    message: "Donation FD-1026 of Organic Vegetables (120 kg) was successfully delivered to Hope Feeding Foundation.",
    type: "success",
    urgency: "LOW",
    time: "2 hours ago",
    read: true
  }
];

export const MOCK_ANALYTICS = {
  global: {
    totalFoodSaved: "12,480 kg",
    percentIncrease: "18.4%",
    totalDonations: "2,340+",
    ngoPartners: "184+",
    peopleReached: "4,920+",
    carbonOffset: "28.7 tonnes CO2e",
    mealsDistributed: "29,714 meals"
  },
  chartDemandForecast: [
    { name: "Mon", Grains: 140, PreparedMeals: 240, Produce: 180 },
    { name: "Tue", Grains: 160, PreparedMeals: 270, Produce: 210 },
    { name: "Wed", Grains: 220, PreparedMeals: 310, Produce: 290 },
    { name: "Thu", Grains: 190, PreparedMeals: 220, Produce: 230 },
    { name: "Fri", Grains: 280, PreparedMeals: 390, Produce: 320 },
    { name: "Sat", Grains: 350, PreparedMeals: 410, Produce: 400 },
    { name: "Sun", Grains: 310, PreparedMeals: 340, Produce: 370 }
  ],
  categoryDistribution: [
    { name: "Prepared Meals", value: 45, color: "#10B981" },
    { name: "Produce (Fruits/Veg)", value: 25, color: "#34D399" },
    { name: "Bakery Items", value: 15, color: "#06B6D4" },
    { name: "Dairy & Packaged", value: 15, color: "#0C4A34" }
  ]
};
