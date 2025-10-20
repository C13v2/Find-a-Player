import { Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SportType } from '@/types';

interface MatchFiltersProps {
  onFilterChange: (filters: {
    sport: SportType | 'all';
    location: string;
    date: string;
  }) => void;
}

const MatchFilters = ({ onFilterChange }: MatchFiltersProps) => {
  const handleSportChange = (value: string) => {
    onFilterChange({
      sport: value as SportType | 'all',
      location: '',
      date: '',
    });
  };

  return (
    <div className="rounded-lg border bg-card p-4 shadow-sm">
      <div className="mb-4 flex items-center gap-2">
        <Filter className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">Filtra Partite</h3>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="sport">Sport</Label>
          <Select onValueChange={handleSportChange} defaultValue="all">
            <SelectTrigger id="sport">
              <SelectValue placeholder="Tutti gli sport" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tutti gli sport</SelectItem>
              <SelectItem value="calcio">⚽ Calcio</SelectItem>
              <SelectItem value="basket">🏀 Basket</SelectItem>
              <SelectItem value="pallavolo">🏐 Pallavolo</SelectItem>
              <SelectItem value="padel">🎾 Padel</SelectItem>
              <SelectItem value="tennis">🎾 Tennis</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Luogo</Label>
          <Input
            id="location"
            placeholder="Cerca per luogo..."
            onChange={(e) =>
              onFilterChange({
                sport: 'all',
                location: e.target.value,
                date: '',
              })
            }
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="date">Data</Label>
          <Input
            id="date"
            type="date"
            onChange={(e) =>
              onFilterChange({
                sport: 'all',
                location: '',
                date: e.target.value,
              })
            }
          />
        </div>
      </div>

      <Button variant="outline" className="mt-4 w-full" onClick={() => window.location.reload()}>
        Reset Filtri
      </Button>
    </div>
  );
};

export default MatchFilters;
