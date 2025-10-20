import { Match, User, ChatMessage } from '@/types';

export const mockUser: User = {
  id: 'user-1',
  name: 'Mario Rossi',
  email: 'mario@example.com',
  favoriteSports: ['calcio', 'padel'],
  rating: 4.5,
  matchesPlayed: 24,
};

export const mockMatches: Match[] = [
  {
    id: '1',
    sport: 'calcio',
    location: 'Campo Sportivo Roma Nord',
    date: '2025-10-20',
    time: '18:00',
    maxPlayers: 10,
    currentPlayers: 7,
    creatorId: 'user-2',
    creatorName: 'Giuseppe Verdi',
    notes: 'Partita amichevole, tutti i livelli benvenuti!',
    participants: ['user-2', 'user-3', 'user-4', 'user-5', 'user-6', 'user-7', 'user-8'],
    waitlist: [],
    createdAt: '2025-10-15T10:00:00Z',
  },
  {
    id: '2',
    sport: 'basket',
    location: 'Palestra Municipale Milano',
    date: '2025-10-18',
    time: '20:30',
    maxPlayers: 8,
    currentPlayers: 6,
    creatorId: 'user-3',
    creatorName: 'Luca Bianchi',
    notes: 'Cerchiamo giocatori con esperienza',
    participants: ['user-3', 'user-4', 'user-9', 'user-10', 'user-11', 'user-12'],
    waitlist: [],
    createdAt: '2025-10-14T15:30:00Z',
  },
  {
    id: '3',
    sport: 'padel',
    location: 'Padel Club Torino',
    date: '2025-10-17',
    time: '19:00',
    maxPlayers: 4,
    currentPlayers: 2,
    creatorId: 'user-1',
    creatorName: 'Mario Rossi',
    notes: 'Doppio, livello intermedio',
    participants: ['user-1', 'user-5'],
    waitlist: [],
    createdAt: '2025-10-16T09:00:00Z',
  },
  {
    id: '4',
    sport: 'pallavolo',
    location: 'Beach Volley Rimini',
    date: '2025-10-19',
    time: '17:00',
    maxPlayers: 6,
    currentPlayers: 4,
    creatorId: 'user-6',
    creatorName: 'Sofia Ferrari',
    notes: 'Beach volley al tramonto!',
    participants: ['user-6', 'user-7', 'user-8', 'user-13'],
    waitlist: [],
    createdAt: '2025-10-15T12:00:00Z',
  },
  {
    id: '5',
    sport: 'tennis',
    location: 'Tennis Club Napoli',
    date: '2025-10-21',
    time: '10:00',
    maxPlayers: 2,
    currentPlayers: 1,
    creatorId: 'user-9',
    creatorName: 'Andrea Colombo',
    notes: 'Match singolo, livello avanzato',
    participants: ['user-9'],
    waitlist: [],
    createdAt: '2025-10-16T08:00:00Z',
  },
];

export const mockChatMessages: ChatMessage[] = [
  {
    id: 'msg-1',
    matchId: '1',
    userId: 'user-2',
    userName: 'Giuseppe Verdi',
    message: 'Ciao a tutti! Chi si unisce?',
    timestamp: '2025-10-15T10:05:00Z',
  },
  {
    id: 'msg-2',
    matchId: '1',
    userId: 'user-3',
    userName: 'Luca Bianchi',
    message: 'Io ci sono! Porto anche un amico.',
    timestamp: '2025-10-15T10:30:00Z',
  },
  {
    id: 'msg-3',
    matchId: '1',
    userId: 'user-2',
    userName: 'Giuseppe Verdi',
    message: 'Perfetto! Mancano solo 3 giocatori.',
    timestamp: '2025-10-15T11:00:00Z',
  },
];

// LocalStorage utilities
export const getStoredMatches = (): Match[] => {
  const stored = localStorage.getItem('trova-giocatori-matches');
  return stored ? JSON.parse(stored) : mockMatches;
};

export const saveMatches = (matches: Match[]) => {
  localStorage.setItem('trova-giocatori-matches', JSON.stringify(matches));
};

export const getStoredUser = (): User => {
  const stored = localStorage.getItem('trova-giocatori-user');
  return stored ? JSON.parse(stored) : mockUser;
};

export const saveUser = (user: User) => {
  localStorage.setItem('trova-giocatori-user', JSON.stringify(user));
};

export const getStoredMessages = (matchId: string): ChatMessage[] => {
  const stored = localStorage.getItem(`trova-giocatori-chat-${matchId}`);
  return stored ? JSON.parse(stored) : mockChatMessages.filter(m => m.matchId === matchId);
};

export const saveMessage = (message: ChatMessage) => {
  const messages = getStoredMessages(message.matchId);
  messages.push(message);
  localStorage.setItem(`trova-giocatori-chat-${message.matchId}`, JSON.stringify(messages));
};
