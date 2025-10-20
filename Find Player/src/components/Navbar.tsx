import { Link, useLocation } from 'react-router-dom';
import { Home, PlusCircle, User, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center space-x-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/80">
            <span className="text-xl font-bold text-primary-foreground">TG</span>
          </div>
          <span className="hidden text-xl font-bold sm:inline-block">Trova Giocatori</span>
        </Link>

        <div className="flex items-center gap-2">
          <Button
            variant={isActive('/') ? 'default' : 'ghost'}
            size="sm"
            asChild
          >
            <Link to="/">
              <Home className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Home</span>
            </Link>
          </Button>

          <Button
            variant={isActive('/create') ? 'default' : 'ghost'}
            size="sm"
            asChild
          >
            <Link to="/create">
              <PlusCircle className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Crea Partita</span>
            </Link>
          </Button>

          <Button
            variant={isActive('/dashboard') ? 'default' : 'ghost'}
            size="sm"
            asChild
          >
            <Link to="/dashboard">
              <User className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Profilo</span>
            </Link>
          </Button>

          <Button
            variant={isActive('/auth') ? 'secondary' : 'outline'}
            size="sm"
            asChild
          >
            <Link to="/auth">
              <LogIn className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Login</span>
            </Link>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
