import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Wallet, 
  CreditCard, 
  LogOut, 
  TrendingUp,
  MessageCircle
} from "lucide-react";

const navItems = [
  { to: "/", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/income", icon: Wallet, label: "Income" },
  { to: "/expense", icon: CreditCard, label: "Expense" },
  { to: "/predictions", icon: TrendingUp, label: "Predictions" },
  { to: "/assistant", icon: MessageCircle, label: "AI Assistant" },
];

export function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-card border-r border-border p-6 flex flex-col">
      <div className="mb-8">
        <h1 className="text-xl font-bold text-foreground">Finance Manager</h1>
      </div>

      <div className="flex flex-col items-center mb-8">
        <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center text-xl font-semibold text-muted-foreground mb-3">
          AS
        </div>
        <span className="font-semibold text-foreground">Aryan Singh</span>
      </div>

      <nav className="flex-1 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                isActive
                  ? "bg-primary text-primary-foreground shadow-card"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )
            }
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <button className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-all duration-200 mt-auto">
        <LogOut className="w-5 h-5" />
        <span className="font-medium">Logout</span>
      </button>
    </aside>
  );
}
