import { MOCK_DONATIONS, MOCK_NGOS, MOCK_VOLUNTEERS, MOCK_AGENTS } from '../data/mock';

// Local storage storage keys to make state interactive across reloads
const STORAGE_KEYS = {
  DONATIONS: 'fb_donations',
  NGOS: 'fb_ngos',
  VOLUNTEERS: 'fb_volunteers',
};

// Initialize persistent state in localStorage if not already set
const initStorage = () => {
  if (!localStorage.getItem(STORAGE_KEYS.DONATIONS)) {
    localStorage.setItem(STORAGE_KEYS.DONATIONS, JSON.stringify(MOCK_DONATIONS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.NGOS)) {
    localStorage.setItem(STORAGE_KEYS.NGOS, JSON.stringify(MOCK_NGOS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.VOLUNTEERS)) {
    localStorage.setItem(STORAGE_KEYS.VOLUNTEERS, JSON.stringify(MOCK_VOLUNTEERS));
  }
};

initStorage();

// Helper helpers to read/write state
const getDonations = () => JSON.parse(localStorage.getItem(STORAGE_KEYS.DONATIONS));
const saveDonations = (data) => localStorage.setItem(STORAGE_KEYS.DONATIONS, JSON.stringify(data));

const getNgos = () => JSON.parse(localStorage.getItem(STORAGE_KEYS.NGOS));
const saveNgos = (data) => localStorage.setItem(STORAGE_KEYS.NGOS, JSON.stringify(data));

const getVolunteers = () => JSON.parse(localStorage.getItem(STORAGE_KEYS.VOLUNTEERS));
const saveVolunteers = (data) => localStorage.setItem(STORAGE_KEYS.VOLUNTEERS, JSON.stringify(data));


export const donationService = {
  getDonations: async () => {
    await new Promise(resolve => setTimeout(resolve, 400));
    return getDonations();
  },

  getDonationById: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return getDonations().find(d => d.id === id);
  },

  createDonation: async (donationData, donorUser) => {
    await new Promise(resolve => setTimeout(resolve, 1200)); // Simulating ML prediction server delay

    // Server-side simulation of ML models:
    // Model 1: Urgency Prediction model
    const calculatedRemainingHours = parseInt(donationData.remainingUsableHours) || 8;
    let urgency = "LOW";
    let urgencyScore = 25;

    if (calculatedRemainingHours <= 4) {
      urgency = "HIGH";
      urgencyScore = Math.floor(Math.random() * (98 - 85 + 1)) + 85;
    } else if (calculatedRemainingHours <= 8) {
      urgency = "MEDIUM";
      urgencyScore = Math.floor(Math.random() * (84 - 50 + 1)) + 50;
    } else {
      urgency = "LOW";
      urgencyScore = Math.floor(Math.random() * (49 - 10 + 1)) + 10;
    }

    // Model 2: Matchmaking optimizer models (find best NGO)
    const ngos = getNgos();
    // Simple closest match based on capacity/demand
    const matchingNgo = ngos.find(n => n.demandLevel === "HIGH") || ngos[0];

    const newDonation = {
      id: `FD-${Math.floor(Math.random() * 9000) + 1000}`,
      donorId: donorUser.id,
      donorName: donorUser.organization || donorUser.name,
      foodName: donationData.foodName,
      category: donationData.category,
      quantity: `${donationData.quantity} kg`,
      mealCount: parseInt(donationData.mealCount) || 50,
      prepTime: donationData.prepTime || new Date().toISOString(),
      storageCondition: donationData.storageCondition,
      packaging: donationData.packaging,
      foodAge: "1 hour",
      remainingUsableHours: calculatedRemainingHours,
      pickupAddress: donationData.pickupAddress || donorUser.address,
      city: donationData.city || donorUser.city,
      location: donationData.location || { lat: 40.7128, lng: -74.0060 },
      pickupDeadline: donationData.pickupDeadline || new Date(Date.now() + calculatedRemainingHours * 60 * 60 * 1000).toISOString(),
      preferredPickupTime: donationData.preferredPickupTime || "ASAP",
      status: "Matched", // Match immediately found by agent
      urgency,
      urgencyScore,
      assignedNgoId: matchingNgo.id,
      assignedNgoName: matchingNgo.name,
      assignedVolunteerId: null,
      assignedVolunteerName: null,
      timeline: [
        { status: "Donation Created", time: new Date().toISOString(), completed: true },
        { status: `AI Analyzed (${urgency} Urgency)`, time: new Date(Date.now() + 2000).toISOString(), completed: true },
        { status: "NGO Matched", time: new Date(Date.now() + 5000).toISOString(), completed: true },
        { status: "Volunteer Assigned", time: null, completed: false },
        { status: "Picked Up", time: null, completed: false },
        { status: "Delivered", time: null, completed: false }
      ],
      urgencyFactors: [
        { name: "Time Since Prep", percentage: urgency === "HIGH" ? 85 : 30 },
        { name: "Temperature Drift", percentage: donationData.storageCondition === "Ambient" ? 65 : 20 },
        { name: "Urgent NGO Demand", percentage: matchingNgo.demandLevel === "HIGH" ? 90 : 45 },
        { name: "Distance Factor", percentage: 40 }
      ]
    };

    const currentDonations = getDonations();
    saveDonations([newDonation, ...currentDonations]);

    return newDonation;
  }
};

export const ngoService = {
  getNgos: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return getNgos();
  },

  getAvailableDonationsForNgo: async (ngoId) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    // Filter donations that are: Pending OR Matched/Assigned to this specific NGO
    return getDonations().filter(d => d.status === "Pending" || d.assignedNgoId === ngoId);
  },

  requestDonation: async (donationId, ngoId, ngoName) => {
    await new Promise(resolve => setTimeout(resolve, 600));
    const donations = getDonations();
    const updated = donations.map(d => {
      if (d.id === donationId) {
        // Automatically match and assign volunteer
        const volunteers = getVolunteers();
        const availableVolunteer = volunteers.find(v => v.status === "Idle") || volunteers[0];

        const nextTimeline = [...d.timeline];
        nextTimeline[2] = { status: "NGO Matched", time: new Date().toISOString(), completed: true };
        nextTimeline[3] = { status: "Volunteer Assigned", time: new Date(Date.now() + 1000).toISOString(), completed: true };

        return {
          ...d,
          status: "Matched",
          assignedNgoId: ngoId,
          assignedNgoName: ngoName,
          assignedVolunteerId: availableVolunteer.id,
          assignedVolunteerName: availableVolunteer.name,
          timeline: nextTimeline
        };
      }
      return d;
    });
    saveDonations(updated);
    return true;
  }
};

export const volunteerService = {
  getTasks: async (volunteerId) => {
    await new Promise(resolve => setTimeout(resolve, 400));
    // Tasks assigned to this volunteer
    return getDonations().filter(d => d.assignedVolunteerId === volunteerId);
  },

  getAvailableTasks: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    // Pending active donations that need a driver
    return getDonations().filter(d => d.status === "Matched" && !d.assignedVolunteerId);
  },

  acceptTask: async (donationId, volunteerId, volunteerName) => {
    await new Promise(resolve => setTimeout(resolve, 600));
    const donations = getDonations();
    const updated = donations.map(d => {
      if (d.id === donationId) {
        const nextTimeline = [...d.timeline];
        nextTimeline[3] = { status: "Volunteer Assigned", time: new Date().toISOString(), completed: true };
        return {
          ...d,
          status: "Assigned",
          assignedVolunteerId: volunteerId,
          assignedVolunteerName: volunteerName,
          timeline: nextTimeline
        };
      }
      return d;
    });
    saveDonations(updated);
    return true;
  },

  updateTransitStatus: async (donationId, nextStatus) => {
    await new Promise(resolve => setTimeout(resolve, 700));
    const donations = getDonations();
    const updated = donations.map(d => {
      if (d.id === donationId) {
        const nextTimeline = [...d.timeline];

        let timelineIndex = -1;
        if (nextStatus === "PickedUp") timelineIndex = 4;
        if (nextStatus === "Delivered") timelineIndex = 5;

        if (timelineIndex !== -1) {
          nextTimeline[timelineIndex] = {
            ...nextTimeline[timelineIndex],
            time: new Date().toISOString(),
            completed: true
          };
        }

        return {
          ...d,
          status: nextStatus,
          timeline: nextTimeline
        };
      }
      return d;
    });
    saveDonations(updated);
    return true;
  }
};

export const agentService = {
  getAgents: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return MOCK_AGENTS;
  },

  triggerReorchestration: async () => {
    await new Promise(resolve => setTimeout(resolve, 1500)); // Delay for satisfying visual loader
    return {
      success: true,
      timestamp: new Date().toISOString(),
      actionsTriggered: [
        "Updated NGO demand charts across Metropolis region.",
        "Scanned and re-evaluated food freshness curves on 4 active donations.",
        "Verified routing schedules and optimized GPS waypoints for 2 assigned volunteers."
      ]
    };
  }
};
