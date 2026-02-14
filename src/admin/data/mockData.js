export const mockStats = {
  totalUsers: 45820,
  activeUsers: 12456,
  totalPolls: 8932,
  reportedPolls: 127,
  bannedUsers: 234,
  premiumUsers: 1842,
  monthlyRevenue: 284500,
};

export const mockReportedPolls = [
  {
    id: 'P001',
    question: 'Which celebrity has the worst fashion sense?',
    options: ['Celebrity A', 'Celebrity B', 'Celebrity C', 'Celebrity D'],
    reason: 'Hate Speech',
    totalReports: 45,
    createdAt: '2024-01-28 14:30',
    userId: 'U1234',
  },
  {
    id: 'P002',
    question: 'Most overrated tech company?',
    options: ['Apple', 'Google', 'Microsoft', 'Meta'],
    reason: 'Spam',
    totalReports: 23,
    createdAt: '2024-01-28 12:15',
    userId: 'U5678',
  },
  {
    id: 'P003',
    question: 'Who deserves to be cancelled?',
    options: ['Person A', 'Person B', 'Person C', 'Person D'],
    reason: 'Harassment',
    totalReports: 67,
    createdAt: '2024-01-28 09:45',
    userId: 'U9012',
  },
];

export const mockPolls = [
  {
    id: 'P101',
    question: 'Best programming language for beginners?',
    options: ['Python', 'JavaScript', 'Java', 'C++'],
    votes: 1523,
    status: 'active',
    trending: true,
    createdAt: '2024-01-27 16:20',
  },
  {
    id: 'P102',
    question: 'Most anticipated movie of 2024?',
    options: ['Movie A', 'Movie B', 'Movie C', 'Movie D'],
    votes: 3421,
    status: 'active',
    trending: true,
    createdAt: '2024-01-27 14:10',
  },
  {
    id: 'P103',
    question: 'Best coffee chain?',
    options: ['Starbucks', 'Dunkin', 'Local Cafe', 'Costa'],
    votes: 892,
    status: 'active',
    trending: false,
    createdAt: '2024-01-27 11:30',
  },
];

export const mockUsers = [
  {
    id: 'U1234',
    username: 'anonymous_user_1',
    pollsCreated: 45,
    reportsCount: 3,
    status: 'Active',
    isPremium: true,
    joinedAt: '2023-12-15',
  },
  {
    id: 'U5678',
    username: 'anonymous_user_2',
    pollsCreated: 23,
    reportsCount: 12,
    status: 'Warned',
    isPremium: false,
    joinedAt: '2023-11-20',
  },
  {
    id: 'U9012',
    username: 'anonymous_user_3',
    pollsCreated: 67,
    reportsCount: 8,
    status: 'Active',
    isPremium: true,
    joinedAt: '2023-10-05',
  },
  {
    id: 'U3456',
    username: 'anonymous_user_4',
    pollsCreated: 12,
    reportsCount: 25,
    status: 'Warned',
    isPremium: false,
    joinedAt: '2024-01-10',
  },
];

export const mockBannedUsers = [
  {
    id: 'U7890',
    username: 'banned_user_1',
    banType: 'Permanent',
    reason: 'Multiple violations of community guidelines',
    bannedAt: '2024-01-20',
    expiryDate: 'Never',
    bannedBy: 'Admin User',
  },
  {
    id: 'U2345',
    username: 'banned_user_2',
    banType: 'Temporary',
    reason: 'Hate speech',
    bannedAt: '2024-01-25',
    expiryDate: '2024-02-25',
    bannedBy: 'Moderator 2',
  },
  {
    id: 'U6789',
    username: 'banned_user_3',
    banType: 'Temporary',
    reason: 'Spam',
    bannedAt: '2024-01-26',
    expiryDate: '2024-02-02',
    bannedBy: 'Admin User',
  },
];

export const mockPremiumUsers = [
  {
    id: 'U1234',
    username: 'premium_user_1',
    plan: 'Monthly',
    startDate: '2024-01-01',
    expiryDate: '2024-02-01',
    status: 'Active',
    amount: 299,
  },
  {
    id: 'U9012',
    username: 'premium_user_2',
    plan: 'Yearly',
    startDate: '2023-06-15',
    expiryDate: '2024-06-15',
    status: 'Active',
    amount: 2999,
  },
  {
    id: 'U4567',
    username: 'premium_user_3',
    plan: 'Monthly',
    startDate: '2024-01-15',
    expiryDate: '2024-02-15',
    status: 'Active',
    amount: 299,
  },
];

export const mockPayments = [
  {
    id: 'TXN001',
    userId: 'U1234',
    amount: 299,
    type: 'Premium Subscription',
    status: 'Success',
    date: '2024-01-28 15:30',
  },
  {
    id: 'TXN002',
    userId: 'U5678',
    amount: 99,
    type: 'Sponsored Poll',
    status: 'Success',
    date: '2024-01-28 14:20',
  },
  {
    id: 'TXN003',
    userId: 'U9012',
    amount: 2999,
    type: 'Premium Subscription',
    status: 'Success',
    date: '2024-01-28 12:10',
  },
  {
    id: 'TXN004',
    userId: 'U3456',
    amount: 299,
    type: 'Premium Subscription',
    status: 'Failed',
    date: '2024-01-28 10:45',
  },
];

export const mockAdmins = [
  {
    id: 'A001',
    name: 'John Doe',
    email: 'john@kalesh.com',
    role: 'Super Admin',
    status: 'Active',
    lastLogin: '2024-01-28 16:45',
  },
  {
    id: 'A002',
    name: 'Jane Smith',
    email: 'jane@kalesh.com',
    role: 'Moderator',
    status: 'Active',
    lastLogin: '2024-01-28 15:30',
  },
  {
    id: 'A003',
    name: 'Mike Johnson',
    email: 'mike@kalesh.com',
    role: 'Support',
    status: 'Active',
    lastLogin: '2024-01-28 14:20',
  },
];

export const mockLogs = [
  {
    id: 'L001',
    adminName: 'John Doe',
    action: 'Banned User',
    target: 'User U7890',
    timestamp: '2024-01-28 16:30',
    details: 'Permanent ban for multiple violations',
  },
  {
    id: 'L002',
    adminName: 'Jane Smith',
    action: 'Removed Poll',
    target: 'Poll P045',
    timestamp: '2024-01-28 15:45',
    details: 'Violated community guidelines',
  },
  {
    id: 'L003',
    adminName: 'John Doe',
    action: 'Granted Premium',
    target: 'User U1234',
    timestamp: '2024-01-28 14:20',
    details: 'Manual premium activation',
  },
  {
    id: 'L004',
    adminName: 'Mike Johnson',
    action: 'Resolved Report',
    target: 'Report R123',
    timestamp: '2024-01-28 13:10',
    details: 'Warning issued to user',
  },
];

export const mockSettings = {
  reportCategories: ['Hate Speech', 'Spam', 'Harassment', 'Misinformation', 'Adult Content'],
  autoHideThreshold: 10,
  maintenanceMode: false,
  allowAnonymousPolls: true,
  maxPollOptions: 4,
  pollDuration: 24,
};
