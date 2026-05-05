function LoginInput({ ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      required
      className="w-full pl-6 pr-4 py-4 bg-muted/50 border border-border rounded-2xl text-foreground outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-muted-foreground"
    />
  );
}

export default LoginInput;