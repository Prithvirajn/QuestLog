'use client'; 

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle, User, MailIcon, KeyIcon } from "lucide-react"; // Import User icon

export default function AuthForm() {
  const searchParams = useSearchParams();
  const defaultTab = searchParams.get('tab') || 'signin';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState(''); // New State for Username
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault(); 
    setMessage('');
    setLoading(true);
    
    // Pass the username in the options.data object
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          display_name: username, 
        }
      }
    });

    if (error) {
      setMessage(`Error: ${error.message}`);
    } else {
      setMessage('Success! Check your email to confirm your account.');
    }
    setLoading(false);
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault(); 
    setMessage('');
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setMessage(`Error: ${error.message}`);
    } else {
      router.push('/dashboard');
      router.refresh(); 
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center w-full px-4">
      
      <Tabs defaultValue={defaultTab} className="w-full max-w-[400px]">
        
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signin">Sign In</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>
        
        {/* Sign In Tab */}
        <TabsContent value="signin">
          <Card>
            <CardHeader>
              <CardTitle>Sign In</CardTitle>
              <CardDescription>
                Welcome back! Sign in to continue your quest.
              </CardDescription>
            </CardHeader>
            
            <form onSubmit={handleSignIn}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email-in">Email</Label>
                  <Input 
                    id="email-in" 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    disabled={loading}
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password-in">Password</Label>
                  <Input 
                    id="password-in" 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    disabled={loading}
                    required 
                  />
                </div>
              </CardContent>
              <CardFooter className="pt-4">
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Signing In...' : 'Sign In'}
                </Button>
              </CardFooter>
            </form>

          </Card>
        </TabsContent>

        {/* Sign Up Tab */}
        <TabsContent value="signup">
          <Card>
            <CardHeader>
              <CardTitle>Sign Up</CardTitle>
              <CardDescription>
                Start your journey. Create a free account.
              </CardDescription>
            </CardHeader>
            
            <form onSubmit={handleSignUp}>
              <CardContent className="space-y-4">
                {/* NEW USERNAME FIELD */}
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <div className="relative">
                    <User className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input 
                        id="username" 
                        type="text" 
                        placeholder="Adventurer Name"
                        className="pl-9"
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        disabled={loading} 
                        required
                        minLength={3}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email-up">Email</Label>
                  <div className="relative">
                    <MailIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="email-up" 
                      type="email" 
                      placeholder="Email@example.com"
                      className="pl-9"
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                      disabled={loading} 
                      required
                      
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password-up">Password</Label>
                  <div className="relative">
                    <KeyIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"/>
                    <Input 
                      id="password-up" 
                      type="password" 
                      placeholder="Password"
                      className="pl-9"
                      value={password} 
                      onChange={(e) => setPassword(e.target.value)} 
                      disabled={loading}
                      required 
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-4">
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Creating Account...' : 'Create Account'}
                </Button>
              </CardFooter>
            </form>

          </Card>
        </TabsContent>
      </Tabs>
      
      {message && (
        <div 
          className="mt-4 w-full max-w-[400px] rounded-md border border-destructive/50 bg-destructive/10 p-3 text-center text-sm flex items-center justify-center gap-2"
        >
          <AlertTriangle className="h-4 w-4 flex-shrink-0 text-destructive" />
          <span className="text-destructive break-words">{message}</span>
        </div>
      )}
    </div>
  );
}