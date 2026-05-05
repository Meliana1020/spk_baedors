import { RefreshCcw, Sun, Moon, LogIn } from "lucide-react";
import { useTheme } from "@/lib/theme";
import { useLogin } from "@/hooks/useLogin";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/lebel";

export function LoginPage() {
  const { theme, toggle } = useTheme();
  const { email, setEmail, password, setPassword, loading, handleLogin } = useLogin();

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background text-foreground relative overflow-hidden transition-colors duration-500">
      
      <div className="absolute top-6 right-6 z-50">
        <Button variant="outline" size="icon" onClick={toggle} className="rounded-2xl glass shadow-lg">
          {theme === "dark" ? <Sun className="h-5 w-5 text-amber-400" /> : <Moon className="h-5 w-5 text-blue-600" />}
        </Button>
      </div>

      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

      <Card className="w-full max-w-md glass rounded-[32px] border-border shadow-2xl relative z-10 mx-4 overflow-hidden">
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-3xl font-black tracking-tighter uppercase">Baedors Mart</CardTitle>
          <CardDescription className="text-[10px] font-bold uppercase tracking-[0.3em] mt-2">
            Login, Mulailah bekerja!
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6 mt-4">
            <div className="space-y-4">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="email" className="text-xs font-bold uppercase tracking-widest ml-1">Email</Label>
                <Input 
                  id="email"
                  type="email" 
                  placeholder="admin@baedors.com" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-2xl py-6 bg-muted/50 border-border focus-visible:ring-blue-500"
                />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="password" className="text-xs font-bold uppercase tracking-widest ml-1">Password</Label>
                <Input 
                  id="password"
                  type="password" 
                  placeholder="••••••••" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)}
                  className="rounded-2xl py-6 bg-muted/50 border-border focus-visible:ring-blue-500"
                />
              </div>
            </div>
            
            <Button 
              type="submit" 
              disabled={loading} 
              className="w-full py-7 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-2xl transition-all shadow-lg shadow-blue-600/20 text-md"
            >
              {loading ? <RefreshCcw className="animate-spin mr-2" size={20} /> : "MASUK KE DASHBOARD"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default LoginPage;