"use client";

import Image from "next/image";
import { useRouter, useParams, usePathname } from "next/navigation";
import { LayoutDashboard, BarChart2, Users, Lightbulb } from "lucide-react";

export default function Sidebar() {
  const router = useRouter();
  const { channelId } = useParams();
  const pathname = usePathname();

  const menu = [
    {
      label: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      path: `/dashboard/${channelId}`,
    },
    {
      label: "Competitors",
      icon: <Users size={20} />,
      path: `/dashboard/${channelId}/competitors`,
    },
    {
      label: "Metrics",
      icon: <BarChart2 size={20} />,
      path: `/dashboard/${channelId}/metrics`,
    },
    {
      label: "Insights",
      icon: <Lightbulb size={20} />,
      path: `/dashboard/${channelId}/insights`,
    },
  ];

  return (
    <div className="w-100 h-screen bg-[#fcfcfc] border-r border-gray-200 fixed top-0 left-0 flex flex-col px-6 py-8">

      {/* Logo */}
      <div
        className="flex items-center gap-2 cursor-pointer mb-10"
        onClick={() => router.push("/")}
      >
        <Image src="/logoo.svg" alt="logo" width={150} height={40} />
      </div>

      {/* Menu */}
      <nav className="flex flex-col gap-4 mt-4">
        {menu.map((item) => {
          const isActive = pathname === item.path;

          return (
            <button
              key={item.label}
              onClick={() => router.push(item.path)}
              className={`
                flex items-center gap-3 py-3 px-3 rounded-[8px] transition text-sm font-medium
                ${isActive
                  ? "bg-[#f9e4ee] text-[#E94C88]"
                  : "text-gray-700 hover:text-[#E94C88] hover:bg-[#f9e4ee]"
                }
              `}
            >
              {item.icon}
              {item.label}
            </button>
          );
        })}
      </nav>

    </div>
  );
}