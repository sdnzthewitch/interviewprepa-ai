"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import {
  LayoutDashboard,
  BookOpen,
  MessageSquare,
  Zap,
  ArrowLeft,
} from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Panel", icon: LayoutDashboard },
  { href: "/questions", label: "Soru Bankası", icon: BookOpen },
  { href: "/coach", label: "AI Koç", icon: MessageSquare },
];

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { profile, resetProgress } = useAppContext();

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-60 bg-card border-r border-border flex flex-col z-40">
        {/* Logo */}
        <div className="p-6 border-b border-border">
          <Link href="/" className="flex items-center gap-2.5 font-semibold text-sm">
            <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center">
              <Zap size={13} className="text-white" />
            </div>
            <span>Interview Prep AI</span>
          </Link>
        </div>

        {/* User context */}
        {profile && (
          <div className="px-4 py-4 border-b border-border">
            <p className="text-xs text-muted-foreground mb-0.5">Hazırlanılan Rol</p>
            <p className="text-sm font-medium text-foreground truncate">
              {profile.targetRole || "Hedef rolünüz"}
            </p>
            <p className="text-xs text-muted-foreground truncate mt-0.5">
              {profile.sector} · {profile.interviewType}
            </p>
          </div>
        )}

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? "bg-indigo-500/15 text-indigo-300"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                }`}
              >
                <Icon size={17} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom actions */}
        <div className="p-4 border-t border-border space-y-2">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors px-3 py-2 rounded-lg hover:bg-white/5"
          >
            <ArrowLeft size={13} />
            Anasayfaya Dön
          </Link>
          <button
            onClick={resetProgress}
            className="w-full text-left flex items-center gap-2 text-xs text-muted-foreground/60 hover:text-muted-foreground transition-colors px-3 py-2 rounded-lg hover:bg-white/5"
          >
            Sıfırla ve Baştan Başla
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="ml-60 flex-1 min-h-screen">
        {children}
      </main>
    </div>
  );
}
