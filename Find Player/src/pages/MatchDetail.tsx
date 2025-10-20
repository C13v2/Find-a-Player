import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, MapPin, Users, MessageCircle, Send, UserCheck } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { getStoredMatches, saveMatches, getStoredUser, getStoredMessages, saveMessage } from '@/lib/mockData';
import { Match, ChatMessage } from '@/types';
import { toast } from 'sonner';

const MatchDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = getStoredUser();

  const [match, setMatch] = useState<Match | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const matches = getStoredMatches();
    const foundMatch = matches.find((m) => m.id === id);
    if (foundMatch) {
      setMatch(foundMatch);
      setMessages(getStoredMessages(foundMatch.id));
    }
  }, [id]);

  const handleJoinMatch = () => {
    if (!match) return;

    const matches = getStoredMatches();
    const matchIndex = matches.findIndex((m) => m.id === match.id);

    if (match.participants.includes(user.id)) {
      toast.info('Sei già iscritto a questa partita!');
      return;
    }

    if (match.currentPlayers < match.maxPlayers) {
      matches[matchIndex].participants.push(user.id);
      matches[matchIndex].currentPlayers += 1;
      saveMatches(matches);
      setMatch(matches[matchIndex]);
      toast.success('Ti sei unito alla partita!');
    } else if (!match.waitlist.includes(user.id)) {
      matches[matchIndex].waitlist.push(user.id);
      saveMatches(matches);
      setMatch(matches[matchIndex]);
      toast.info('Aggiunto alla lista d\'attesa');
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !match) return;

    const message: ChatMessage = {
      id: `msg-${Date.now()}`,
      matchId: match.id,
      userId: user.id,
      userName: user.name,
      message: newMessage,
      timestamp: new Date().toISOString(),
    };

    saveMessage(message);
    setMessages([...messages, message]);
    setNewMessage('');
    toast.success('Messaggio inviato');
  };

  if (!match) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <p>Partita non trovata</p>
        </div>
      </div>
    );
  }

  const isParticipant = match.participants.includes(user.id);
  const isCreator = match.creatorId === user.id;
  const isFull = match.currentPlayers >= match.maxPlayers;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => navigate('/')} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Torna alle partite
        </Button>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Match Details */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="mb-2 text-3xl capitalize">
                      {match.sport}
                    </CardTitle>
                    <CardDescription>
                      Creato da {match.creatorName}
                      {isCreator && <Badge className="ml-2">Tu</Badge>}
                    </CardDescription>
                  </div>
                  <Badge className="text-lg" variant={isFull ? 'destructive' : 'default'}>
                    {isFull ? 'Completa' : 'Disponibile'}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Location & Time */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-lg">
                    <MapPin className="h-5 w-5 text-primary" />
                    <span>{match.location}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-primary" />
                      <span>{new Date(match.date).toLocaleDateString('it-IT', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-primary" />
                      <span>{match.time}</span>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Players Info */}
                <div className="rounded-lg bg-secondary/50 p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-primary" />
                      <span className="font-medium">
                        {match.currentPlayers}/{match.maxPlayers} Giocatori
                      </span>
                    </div>
                    {!isFull && (
                      <Badge variant="outline">
                        {match.maxPlayers - match.currentPlayers} posti liberi
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Notes */}
                {match.notes && (
                  <>
                    <Separator />
                    <div>
                      <h3 className="mb-2 font-semibold">Note</h3>
                      <p className="text-muted-foreground">{match.notes}</p>
                    </div>
                  </>
                )}

                {/* Join Button */}
                <Button
                  onClick={handleJoinMatch}
                  disabled={isParticipant}
                  className="w-full"
                  size="lg"
                >
                  {isParticipant ? (
                    <>
                      <UserCheck className="mr-2 h-5 w-5" />
                      Già Iscritto
                    </>
                  ) : isFull ? (
                    'Entra in Lista d\'Attesa'
                  ) : (
                    'Unisciti alla Partita'
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Chat Section */}
          <div className="lg:col-span-1">
            <Card className="flex h-[600px] flex-col">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  Chat
                </CardTitle>
                <CardDescription>
                  {messages.length} {messages.length === 1 ? 'messaggio' : 'messaggi'}
                </CardDescription>
              </CardHeader>

              <CardContent className="flex flex-1 flex-col overflow-hidden p-0">
                {/* Messages */}
                <div className="flex-1 space-y-4 overflow-y-auto p-4">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex gap-2 ${
                        msg.userId === user.id ? 'flex-row-reverse' : ''
                      }`}
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>
                          {msg.userName.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div
                        className={`flex max-w-[70%] flex-col gap-1 ${
                          msg.userId === user.id ? 'items-end' : 'items-start'
                        }`}
                      >
                        <span className="text-xs text-muted-foreground">
                          {msg.userName}
                        </span>
                        <div
                          className={`rounded-lg px-3 py-2 ${
                            msg.userId === user.id
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted'
                          }`}
                        >
                          <p className="text-sm">{msg.message}</p>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {new Date(msg.timestamp).toLocaleTimeString('it-IT', {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="border-t p-4">
                  <form onSubmit={handleSendMessage} className="flex gap-2">
                    <Input
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Scrivi un messaggio..."
                      className="flex-1"
                    />
                    <Button type="submit" size="icon">
                      <Send className="h-4 w-4" />
                    </Button>
                  </form>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchDetail;
