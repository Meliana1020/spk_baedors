import { LogIn } from "lucide-react";

function LoginHeader() {
  return (
    <div className="text-center mb-10">
      <div className="inline-flex p-4 bg-blue-600 rounded-2xl shadow-[0_0_25px_rgba(37,99,235,0.4)] mb-5">
        <LogIn className="text-white" size={32} />
      </div>
      <h1 className="text-3xl font-black text-foreground tracking-tighter uppercase">Baedors Mart</h1>
      <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.3em] mt-2 italic">
        Login, Mulailah bekerja!
      </p>
    </div>
  );
}

export default LoginHeader;