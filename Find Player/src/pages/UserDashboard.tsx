import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star, TrendingUp, Calendar } from 'lucide-react';
import Navbar from '@/components/Navbar';
import MatchCard from '@/components/MatchCard';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getStoredMatches, getStoredUser } from '@/lib/mockData';
import { Match } from '@/types';

const UserDashboard = () => {
  const user = getStoredUser();
  const [myMatches, setMyMatches] = useState<Match[]>([]);
  const [createdMatches, setCreatedMatches] = useState<Match[]>([]);

  useEffect(() => {
    const matches = getStoredMatches();
    const participating = matches.filter((m) => m.participants.includes(user.id));
    const created = matches.filter((m) => m.creatorId === user.id);
    
    setMyMatches(participating);
    setCreatedMatches(created);
  }, [user.id]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* User Profile Card */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-start gap-6">
              <Avatar className="h-24 w-24">
                <AvatarFallback className="text-2xl">
                  {user.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <CardTitle className="mb-2 text-3xl">{user.name}</CardTitle>
                <CardDescription className="mb-4 text-base">
                  {user.email}
                </CardDescription>
                
                <div className="flex flex-wrap gap-2">
                  {user.favoriteSports.map((sport) => (
                    <Badge key={sport} variant="secondary" className="capitalize">
                      {sport}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div className="text-center">
                  <div className="flex items-center gap-1 text-2xl font-bold text-primary">
                    <Star className="h-6 w-6 fill-primary" />
                    {user.rating}
                  </div>
                  <p className="text-xs text-muted-foreground">Valutazione</p>
                </div>
                
                <div className="text-center">
                  <div className="text-2xl font-bold">{user.matchesPlayed}</div>
                  <p className="text-xs text-muted-foreground">Partite</p>
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Stats Cards */}
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Partite Attive</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{myMatches.length}</div>
              <p className="text-xs text-muted-foreground">
                Partite a cui partecipi
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Partite Create</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{createdMatches.length}</div>
              <p className="text-xs text-muted-foreground">
                Partite organizzate da te
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Affidabilità</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">92%</div>
              <p className="text-xs text-muted-foreground">
                Ti presenti alle partite
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Matches Tabs */}
        <Tabs defaultValue="participating" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="participating">
              Le Mie Partite ({myMatches.length})
            </TabsTrigger>
            <TabsTrigger value="created">
              Partite Create ({createdMatches.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="participating" className="mt-6">
            {myMatches.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {myMatches.map((match) => (
                  <MatchCard key={match.id} match={match} />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="flex min-h-[200px] items-center justify-center">
                  <div className="text-center">
                    <p className="mb-2 text-lg font-medium">
                      Non partecipi ancora a nessuna partita
                    </p>
                    <p className="mb-4 text-sm text-muted-foreground">
                      Cerca una partita e unisciti per iniziare a giocare!
                    </p>
                    <Link
                      to="/"
                      className="text-sm font-medium text-primary hover:underline"
                    >
                      Trova una partita →
                    </Link>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="created" className="mt-6">
            {createdMatches.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {createdMatches.map((match) => (
                  <MatchCard key={match.id} match={match} />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="flex min-h-[200px] items-center justify-center">
                  <div className="text-center">
                    <p className="mb-2 text-lg font-medium">
                      Non hai ancora creato nessuna partita
                    </p>
                    <p className="mb-4 text-sm text-muted-foreground">
                      Organizza una partita e trova altri giocatori!
                    </p>
                    <Link
                      to="/create"
                      className="text-sm font-medium text-primary hover:underline"
                    >
                      Crea una partita →
                    </Link>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default UserDashboard;
