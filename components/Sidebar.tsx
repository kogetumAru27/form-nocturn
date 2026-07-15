"use client";
import { useState } from "react";
import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/chokubai", label: "直売所" },
  { href: "/about", label: "Polaris" },
  { href: "/contact", label: "お問い合わせ" },
  { href: "/mypage", label: "マイページ" },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)} className="text-3xl p-2">≡</button>
      {isOpen && (
  <>
    {/* 暗いオーバーレイ */}
    <div 
      className="fixed inset-0 bg-black/50 z-10"
      onClick={() => setIsOpen(false)}
    />
    {/* サイドバー本体 */}
    <nav className="fixed top-0 left-0 h-full w-64 bg-white z-20 flex flex-col gap-4 p-6 cusor-underline">
      {links.map((link) => (
        <Link key={link.href} href={link.href}>
          {link.label}
        </Link>
      ))}
    </nav>
  </>
)}
    </div>
  );
}