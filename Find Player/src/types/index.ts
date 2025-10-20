import { useState } from 'react';
import { Search, TrendingUp } from 'lucide-react';
import Navbar from '@/components/Navbar';
import MatchCard from '@/components/MatchCard';
import MatchFilters from '@/components/MatchFilters';
import { getStoredMatches } from '@/lib/mockData';
import { Match, SportType } from '@/types';
import { Input } from '@/components/ui/input';

const Index = () => {
  const [matches, setMatches] = useState<Match[]>(getStoredMatches());
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<{
    sport: SportType | 'all';
    location: string;
    date: string;
  }>({
    sport: 'all',
    location: '',
    date: '',
  });

  const filteredMatches = matches.filter((match) => {
    const matchesSearch =
      match.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      match.sport.toLowerCase().includes(searchQuery.toLowerCase()) ||
      match.notes?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSport = filters.sport === 'all' || match.sport === filters.sport;
    const matchesLocation = !filters.location || match.location.toLowerCase().includes(filters.location.toLowerCase());
    const matchesDate = !filters.date || match.date === filters.date;

    return matchesSearch && matchesSport && matchesLocation && matchesDate;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b bg-gradient-to-br from-primary/10 via-background to-accent/10 py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Trova Giocatori per il Tuo Sport
            </h1>
            <p className="mb-8 text-lg text-muted-foreground sm:text-xl">
              Unisciti a partite nella tua zona o crea nuovi match. Calcio, basket, padel e molto altro!
            </p>

            {/* Search Bar */}
            <div className="relative mx-auto max-w-xl">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Cerca sport, luogo..."
                className="h-12 pl-10 text-base"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-8">
        {/* Filters */}
        <div className="mb-8">
          <MatchFilters onFilterChange={setFilters} />
        </div>

        {/* Stats */}
        <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
          <TrendingUp className="h-4 w-4" />
          <span>
            {filteredMatches.length} {filteredMatches.length === 1 ? 'partita trovata' : 'partite trovate'}
          </span>
        </div>

        {/* Matches Grid */}
        {filteredMatches.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredMatches.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        ) : (
          <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 text-center">
            <p className="mb-2 text-lg font-medium">Nessuna partita trovata</p>
            <p className="text-sm text-muted-foreground">
              Prova a modificare i filtri o crea una nuova partita!
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Index;
