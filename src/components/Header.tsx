import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Github, Bell, Plus, Menu, Search } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { CommandMenu } from './CommandMenu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
export function Header() {
  const [open, setOpen] = useState(false);
  const navLinks = [
    { name: 'Pull requests', href: '#' },
    { name: 'Issues', href: '#' },
    { name: 'Codespaces', href: '#' },
    { name: 'Marketplace', href: '#' },
    { name: 'Explore', href: '#' },
  ];
  return (
    <>
      <header className="bg-card border-b border-border px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-foreground hover:text-primary transition-colors">
              <Github className="h-8 w-8" />
            </Link>
            <div className="hidden md:flex items-center space-x-4">
              <Button
                variant="outline"
                className="w-64 justify-start text-sm text-muted-foreground"
                onClick={() => setOpen(true)}
              >
                <Search className="h-4 w-4 mr-2" />
                Search or jump to...
                <kbd className="pointer-events-none ml-auto hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                  <span className="text-xs">⌘</span>K
                </kbd>
              </Button>
              <nav className="flex items-center space-x-4">
                {navLinks.map((link) => (
                  <span
                    key={link.name}
                    className="text-sm font-medium text-muted-foreground/50 cursor-not-allowed"
                  >
                    {link.name}
                  </span>
                ))}
              </nav>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <ThemeToggle />
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-muted-foreground cursor-not-allowed">
                      <Bell className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Notifications (Not Implemented)</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-muted-foreground cursor-not-allowed">
                      <Plus className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Create new (Not Implemented)</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <Link to="/cto-cloudflare">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://i.pravatar.cc/150?u=cto-cloudflare" alt="@cto-cloudflare" />
                  <AvatarFallback>CC</AvatarFallback>
                </Avatar>
              </Link>
            </div>
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left">
                  <nav className="flex flex-col space-y-4 mt-8">
                    {navLinks.map((link) => (
                      <span
                        key={link.name}
                        className="text-lg font-medium text-foreground/50 cursor-not-allowed"
                      >
                        {link.name}
                      </span>
                    ))}
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>
      <CommandMenu open={open} setOpen={setOpen} />
    </>
  );
}