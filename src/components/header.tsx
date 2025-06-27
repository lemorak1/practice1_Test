"use client";

import Link from 'next/link';
import { Home, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useRole } from '@/hooks/use-role';
import { cn } from '@/lib/utils';

export function Header() {
  const [role, setRole] = useRole();
  const isAdmin = role === 'admin';

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="flex items-center gap-2 mr-6">
          <Home className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg font-headline">Real Estate Hub</span>
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          {isAdmin && (
            <Link
              href="/admin"
              className={cn(
                'transition-colors hover:text-foreground/80',
                'text-foreground'
              )}
            >
              Manage Properties
            </Link>
          )}
        </nav>
        <div className="flex flex-1 items-center justify-end gap-4">
          <div className="flex items-center space-x-2">
            <Label htmlFor="role-switcher" className="text-sm font-medium">
              User
            </Label>
            <Switch
              id="role-switcher"
              checked={isAdmin}
              onCheckedChange={(checked) => setRole(checked ? 'admin' : 'user')}
              aria-label="Toggle admin mode"
            />
            <Label htmlFor="role-switcher" className="text-sm font-medium">
              Admin
            </Label>
          </div>
        </div>
      </div>
    </header>
  );
}
