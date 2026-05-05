import {ShoppingCart} from "lucide-react";

function SidebarHeader() {
  return (
    <div className="p-7 pb-4">
      <div className="flex items-center gap-3">
        <div className="relative w-12 h-12 gradient-primary rounded-2xl flex items-center justify-center shadow-lg">
          <ShoppingCart className="text-white" size={24} />
        </div>
        <div className="flex flex-col leading-none">
          <h2 className="text-xl font-black tracking-tight uppercase">Baedors</h2>
          <span className="text-[10px] font-bold tracking-[0.4em] text-blue-500 uppercase mt-1">Mart · SPK</span>
        </div>
      </div>
    </div>
  );
}

export default SidebarHeader;