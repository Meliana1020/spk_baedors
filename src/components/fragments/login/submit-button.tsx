import { RefreshCcw} from "lucide-react";

function SubmitButton({ loading }: { loading: boolean }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-2xl transition-all flex items-center justify-center gap-3 shadow-lg shadow-blue-600/20 active:scale-[0.98]"
    >
      {loading ? <RefreshCcw className="animate-spin" size={20} /> : "MASUK KE DASHBOARD"}
    </button>
  );
}

export default SubmitButton;