export interface Beneficiary {
  id: string;
  name: string;
  familySize: number;
  location: string;
  condition: string;
  verificationStatus: "verified" | "pending" | "rejected";
  photo?: string;
}

export interface Project {
  id: string;
  title: string;
  beneficiaryId: string;
  beneficiaryName: string;
  story: string;
  location: string;
  targetAmount: number;
  currentAmount: number;
  neededMaterials: string[];
  status: "pending" | "active" | "funded" | "in-progress" | "completed";
  image?: string;
  updates: ProjectUpdate[];
}

export interface ProjectUpdate {
  date: string;
  message: string;
  photos?: string[];
}

export interface Donation {
  id: string;
  donorName: string;
  donorEmail: string;
  projectId: string;
  projectTitle: string;
  type: "money" | "materials" | "food" | "clothes" | "construction";
  amount?: number;
  value?: number;
  description?: string;
  date: string;
  status: "pending" | "completed";
}

export interface VolunteerApplication {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  skills: string[];
  availability: string;
  supportType: string;
  status: "pending" | "approved" | "rejected";
  submittedDate: string;
}

export interface ImpactStory {
  id: string;
  title: string;
  familyName: string;
  beforePhoto?: string;
  afterPhoto?: string;
  story: string;
  completedDate: string;
  totalSupport: number;
}

export const mockBeneficiaries: Beneficiary[] = [
  {
    id: "1",
    name: "Ahmed Family",
    familySize: 5,
    location: "North District",
    condition: "Living in temporary shelter, no stable housing",
    verificationStatus: "verified",
  },
  {
    id: "2",
    name: "Fatima and Children",
    familySize: 3,
    location: "East District",
    condition: "Single mother, living in unsafe building",
    verificationStatus: "verified",
  },
  {
    id: "3",
    name: "Hassan Family",
    familySize: 7,
    location: "South District",
    condition: "Living without electricity or clean water",
    verificationStatus: "pending",
  },
];

export const mockProjects: Project[] = [
  {
    id: "1",
    title: "Build Safe Home for Ahmed Family",
    beneficiaryId: "1",
    beneficiaryName: "Ahmed Family",
    story:
      "The Ahmed family has been living in a temporary shelter for over 2 years. With 5 family members including 3 school-age children, they desperately need a safe and stable home. The father works as a day laborer but cannot afford housing costs. We aim to build them a modest 2-bedroom home with basic amenities.",
    location: "North District",
    targetAmount: 15000,
    currentAmount: 8500,
    neededMaterials: [
      "Construction materials",
      "Roofing",
      "Windows and doors",
      "Plumbing fixtures",
      "Electrical wiring",
    ],
    status: "active",
    updates: [
      {
        date: "2026-05-01",
        message: "Foundation completed! Thank you to all donors.",
      },
      {
        date: "2026-04-15",
        message: "Construction has started. Land preparation complete.",
      },
    ],
  },
  {
    id: "2",
    title: "Emergency Housing for Fatima's Family",
    beneficiaryId: "2",
    beneficiaryName: "Fatima and Children",
    story:
      "Fatima is a widow raising 3 children alone. Her current living situation is dangerous, with crumbling walls and no proper sanitation. She works as a cleaner but her income is barely enough for food. We want to provide her family with safe housing and basic furniture.",
    location: "East District",
    targetAmount: 12000,
    currentAmount: 12000,
    neededMaterials: [
      "House renovation materials",
      "Mattresses",
      "Kitchen appliances",
      "Bathroom fixtures",
    ],
    status: "funded",
    updates: [
      {
        date: "2026-05-05",
        message: "Fully funded! Renovation will begin next week.",
      },
    ],
  },
  {
    id: "3",
    title: "Restore Basic Services for Hassan Family",
    beneficiaryId: "3",
    beneficiaryName: "Hassan Family",
    story:
      "The Hassan family of 7 lives in a house without electricity or running water. The children struggle with their studies due to lack of lighting. We need to restore basic utilities and provide essential household items to improve their living conditions.",
    location: "South District",
    targetAmount: 8000,
    currentAmount: 2300,
    neededMaterials: [
      "Electrical installation",
      "Water connection",
      "Solar panels",
      "Water tank",
      "Basic furniture",
    ],
    status: "active",
    updates: [],
  },
];

export const mockDonations: Donation[] = [
  {
    id: "1",
    donorName: "Sarah Johnson",
    donorEmail: "sarah.j@email.com",
    projectId: "1",
    projectTitle: "Build Safe Home for Ahmed Family",
    type: "money",
    amount: 2000,
    date: "2026-05-08",
    status: "completed",
  },
  {
    id: "2",
    donorName: "Mohammed Ali",
    donorEmail: "m.ali@email.com",
    projectId: "1",
    projectTitle: "Build Safe Home for Ahmed Family",
    type: "construction",
    value: 1500,
    description: "Cement bags and steel rods",
    date: "2026-05-05",
    status: "completed",
  },
  {
    id: "3",
    donorName: "Emily Chen",
    donorEmail: "emily.c@email.com",
    projectId: "2",
    projectTitle: "Emergency Housing for Fatima's Family",
    type: "money",
    amount: 5000,
    date: "2026-05-03",
    status: "completed",
  },
  {
    id: "4",
    donorName: "Anonymous",
    donorEmail: "donor@email.com",
    projectId: "3",
    projectTitle: "Restore Basic Services for Hassan Family",
    type: "money",
    amount: 1000,
    date: "2026-05-09",
    status: "pending",
  },
];

export const mockVolunteers: VolunteerApplication[] = [
  {
    id: "1",
    name: "David Martinez",
    email: "david.m@email.com",
    phone: "+1234567890",
    address: "123 Main St",
    skills: ["Construction", "Plumbing"],
    availability: "Weekends",
    supportType: "Labor and technical skills",
    status: "approved",
    submittedDate: "2026-04-20",
  },
  {
    id: "2",
    name: "Lisa Wang",
    email: "lisa.w@email.com",
    phone: "+1234567891",
    address: "456 Oak Ave",
    skills: ["Teaching", "Organizing"],
    availability: "Flexible",
    supportType: "Educational support and event coordination",
    status: "approved",
    submittedDate: "2026-04-25",
  },
  {
    id: "3",
    name: "John Smith",
    email: "john.s@email.com",
    phone: "+1234567892",
    address: "789 Pine Rd",
    skills: ["Electrical work", "Carpentry"],
    availability: "Evenings",
    supportType: "Technical skills",
    status: "pending",
    submittedDate: "2026-05-07",
  },
];

export const mockImpactStories: ImpactStory[] = [
  {
    id: "1",
    title: "New Beginning for the Rahman Family",
    familyName: "Rahman Family",
    story:
      "After living in a cramped one-room shelter for 5 years, the Rahman family now has a proper 3-bedroom home. The children have their own space to study, and the family can live with dignity. Thanks to our donors and volunteers, this transformation was possible in just 4 months.",
    completedDate: "2026-03-15",
    totalSupport: 18000,
  },
  {
    id: "2",
    title: "From Homeless to Hopeful: Maria's Story",
    familyName: "Maria and her daughter",
    story:
      "Maria was homeless with her 8-year-old daughter. Our emergency housing program provided them with a safe apartment, furniture, and basic necessities. Maria has since found stable employment, and her daughter is thriving in school. This is the power of community support.",
    completedDate: "2026-02-20",
    totalSupport: 9500,
  },
];
