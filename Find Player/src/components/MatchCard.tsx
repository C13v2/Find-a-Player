import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Match } from '@/types';

const sportIcons: Record<string, string> = {
  calcio: '⚽',
  basket: '🏀',
  pallavolo: '🏐',
  padel: '🎾',
  tennis: '🎾',
};

const sportColors: Record<string, string> = {
  calcio: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  basket: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
  pallavolo: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  padel: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  tennis: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
};

interface MatchCardProps {
  match: Match;
}

const MatchCard = ({ match }: MatchCardProps) => {
  const spotsLeft = match.maxPlayers - match.currentPlayers;
  const isFull = spotsLeft === 0;

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="flex items-center gap-2 text-xl">
            <span className="text-2xl">{sportIcons[match.sport]}</span>
            <span className="capitalize">{match.sport}</span>
          </CardTitle>
          <Badge className={sportColors[match.sport]}>
            {match.sport.toUpperCase()}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span className="line-clamp-1">{match.location}</span>
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{new Date(match.date).toLocaleDateString('it-IT')}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>{match.time}</span>
          </div>
        </div>

        <div className="flex items-center justify-between rounded-lg bg-secondary/50 p-3">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">
              {match.currentPlayers}/{match.maxPlayers} giocatori
            </span>
          </div>
          {!isFull ? (
            <Badge variant="outline" className="bg-background">
              {spotsLeft} {spotsLeft === 1 ? 'posto' : 'posti'}
            </Badge>
          ) : (
            <Badge variant="destructive">Completa</Badge>
          )}
        </div>

        {match.notes && (
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {match.notes}
          </p>
        )}
      </CardContent>

      <CardFooter>
        <Button asChild className="w-full" variant={isFull ? 'outline' : 'default'}>
          <Link to={`/match/${match.id}`}>
            {isFull ? 'Lista d\'attesa' : 'Visualizza dettagli'}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MatchCard;
