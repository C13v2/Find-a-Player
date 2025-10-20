import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, MapPin, Users, FileText } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { getStoredMatches, saveMatches, getStoredUser } from '@/lib/mockData';
import { SportType, Match } from '@/types';
import { toast } from 'sonner';

const CreateMatch = () => {
  const navigate = useNavigate();
  const user = getStoredUser();
  
  const [formData, setFormData] = useState({
    sport: '' as SportType | '',
    location: '',
    date: '',
    time: '',
    maxPlayers: 10,
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.sport || !formData.location || !formData.date || !formData.time) {
      toast.error('Compila tutti i campi obbligatori');
      return;
    }

    const matches = getStoredMatches();
    const newMatch: Match = {
      id: `match-${Date.now()}`,
      sport: formData.sport as SportType,
      location: formData.location,
      date: formData.date,
      time: formData.time,
      maxPlayers: formData.maxPlayers,
      currentPlayers: 1,
      creatorId: user.id,
      creatorName: user.name,
      notes: formData.notes,
      participants: [user.id],
      waitlist: [],
      createdAt: new Date().toISOString(),
    };

    matches.push(newMatch);
    saveMatches(matches);

    toast.success('Partita creata con successo!');
    navigate(`/match/${newMatch.id}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto max-w-2xl px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Torna alle partite
        </Button>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Crea una Nuova Partita</CardTitle>
            <CardDescription>
              Compila i dettagli della partita per trovare altri giocatori
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Sport Selection */}
              <div className="space-y-2">
                <Label htmlFor="sport">Sport *</Label>
                <Select
                  value={formData.sport}
                  onValueChange={(value) =>
                    setFormData({ ...formData, sport: value as SportType })
                  }
                >
                  <SelectTrigger id="sport">
                    <SelectValue placeholder="Seleziona uno sport" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="calcio">⚽ Calcio</SelectItem>
                    <SelectItem value="basket">🏀 Basket</SelectItem>
                    <SelectItem value="pallavolo">🏐 Pallavolo</SelectItem>
                    <SelectItem value="padel">🎾 Padel</SelectItem>
                    <SelectItem value="tennis">🎾 Tennis</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label htmlFor="location">Luogo / Campo *</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="location"
                    placeholder="es. Campo Sportivo Roma Nord"
                    className="pl-10"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              {/* Date and Time */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="date">Data *</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="date"
                      type="date"
                      className="pl-10"
                      value={formData.date}
                      onChange={(e) =>
                        setFormData({ ...formData, date: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time">Orario *</Label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="time"
                      type="time"
                      className="pl-10"
                      value={formData.time}
                      onChange={(e) =>
                        setFormData({ ...formData, time: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Max Players */}
              <div className="space-y-2">
                <Label htmlFor="maxPlayers">Numero Massimo di Giocatori *</Label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="maxPlayers"
                    type="number"
                    min="2"
                    max="30"
                    className="pl-10"
                    value={formData.maxPlayers}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        maxPlayers: parseInt(e.target.value),
                      })
                    }
                    required
                  />
                </div>
              </div>

              {/* Notes */}
              <div className="space-y-2">
                <Label htmlFor="notes">Note Aggiuntive</Label>
                <div className="relative">
                  <FileText className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Textarea
                    id="notes"
                    placeholder="Es. Partita amichevole, livello intermedio..."
                    className="min-h-[100px] pl-10"
                    value={formData.notes}
                    onChange={(e) =>
                      setFormData({ ...formData, notes: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* Submit Button */}
              <Button type="submit" className="w-full" size="lg">
                Crea Partita
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreateMatch;
