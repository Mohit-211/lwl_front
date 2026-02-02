// "use client";

// import Link from "next/link";
// import { useEffect, useState, useRef } from "react";
// import { usePathname, useRouter } from "next/navigation";
// import { apiFetch, GetProfile } from "@/lib/api";
// import Logo from "../../../public/logo2.png"
// import Image from "next/image";
// interface User {
//   id: number;
//   email: string;
// }

// export default function Navbar() {
//   const pathname = usePathname();
//   const router = useRouter();

//   const [mounted, setMounted] = useState(false);
//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [open, setOpen] = useState(false);

//   const dropdownRef = useRef<HTMLDivElement>(null);

//   // Hydration guard
//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     GetProfile().then((res) => {
//       console.log(res, "===>>")
//       setUser(res?.data);

//     }).catch((e) => {
//       console.log(e, "erorr")
//     })
//     // function handleClickOutside(event: MouseEvent) {
//     //   if (
//     //     dropdownRef.current &&
//     //     !dropdownRef.current.contains(event.target as Node)
//     //   ) {
//     //     setOpen(false);
//     //   }
//     // }

//     // if (open) {
//     //   document.addEventListener("mousedown", handleClickOutside);
//     // }
//     // return () => {
//     //   document.removeEventListener("mousedown", handleClickOutside);
//     // };
//   }, [open]);


//   // Fetch auth state on mount + route change
//   // useEffect(() => {
//   //   async function fetchMe() {
//   //     try {
//   //       const res = await apiFetch("/api/auth/me");
//   //       if (res.ok) {
//   //         const data = await res.json();
//   //         setUser(data.user);
//   //       } else {
//   //         setUser(null);
//   //       }
//   //     } catch {
//   //       setUser(null);
//   //     } finally {
//   //       setLoading(false);
//   //     }
//   //   }

//   //   fetchMe();
//   // }, [pathname]);

//   async function handleLogout() {
//     await apiFetch("/api/auth/logout", { method: "POST" });
//     setUser(null);
//     setOpen(false);
//     router.push("/auth/login");
//   }

//   if (!mounted) {
//     return (
//       <header className="sticky top-0 z-50 h-[72px] bg-gray-950 border-b border-white/10" />
//     );
//   }
//   console.log(user, "user")
//   return (
//     <header className="sticky top-0 z-50 bg-gray-950 border-b border-white/10">
//       <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
//         {/* Logo */}
//         <Link href="/" className="flex flex-col items-center text-center">
//     <Image
//       src={Logo}// Replace with your logo path
//       alt="Life Worth Living Logo"
//       width={140}      // Adjust size
//       height={80}
//       className="mt-2 hover:scale-105 transition-transform duration-200"
//     />
//     <span className="text-lg font-semibold text-amber-400">Life Worth Living</span>
//   </Link>

//         {/* Right side */}
//         <div className="flex items-center gap-6 md:gap-8">
//           <NavLink href="/checkout" label="Pricing" pathname={pathname} />
//           {user && <NavLink href="/dashboard" label="Watch" pathname={pathname} />}

//           {/* AUTH SECTION */}
//           {!loading && !user && (
//             <Link
//               href="/auth/login"
//               className="bg-amber-500 hover:bg-amber-400 text-black px-5 py-2.5 rounded-lg font-medium transition-colors"
//             >
//               Get Started
//             </Link>
//           )}

//           {!loading && user && (
//             <div className="relative" ref={dropdownRef}>
//               {/* Avatar button */}
//               <button
//                 onClick={() => setOpen((v) => !v)}
//                 className="w-10 h-10 rounded-full bg-amber-500 text-black flex items-center justify-center font-semibold hover:bg-amber-400 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400/40 focus:ring-offset-2 focus:ring-offset-gray-950"
//                 aria-label="Account menu"
//                 aria-expanded={open}
//               >
//                 {user.email.charAt(0).toUpperCase()}
//               </button>

//               {/* Dropdown */}
//               {open && (
//                 <div
//                   className={`
//                     absolute right-0 mt-2 w-64 sm:w-72
//                     bg-gray-900 border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50
//                     animate-in fade-in-0 zoom-in-95 duration-150 origin-top-right
//                   `}
//                 >
//                   {/* User info header */}
//                   <div className="px-5 py-4 border-b border-white/8">
//                     <p className="text-sm font-medium text-white truncate">
//                       {user.email}
//                     </p>
//                     <p className="text-xs text-white/50 mt-0.5">Signed in</p>
//                   </div>

//                   {/* Menu items */}
//                   <div className="py-1">
//                     <Link
//                       href="/account"
//                       onClick={() => setOpen(false)}
//                       className="block px-5 py-3 text-sm text-white/90 hover:bg-white/5 transition-colors"
//                     >
//                       Dashboard
//                     </Link>
//                     <Link
//                       href="/account/payments"
//                       onClick={() => setOpen(false)}
//                       className="block px-5 py-3 text-sm text-white/90 hover:bg-white/5 transition-colors"
//                     >
//                       Payments & Plans
//                     </Link>
//                     <Link
//                       href="/account/settings"
//                       onClick={() => setOpen(false)}
//                       className="block px-5 py-3 text-sm text-white/90 hover:bg-white/5 transition-colors"
//                     >
//                       Settings
//                     </Link>
//                   </div>

//                   <div className="border-t border-white/8 py-1">
//                     <button
//                       onClick={handleLogout}
//                       className="w-full text-left px-5 py-3 text-sm text-red-400 hover:bg-white/5 transition-colors"
//                     >
//                       Log out
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </nav>
//     </header>
//   );
// }

// function NavLink({
//   href,
//   label,
//   pathname,
// }: {
//   href: string;
//   label: string;
//   pathname: string;
// }) {
//   const active = pathname === href;

//   return (
//     <Link
//       href={href}
//       className={`text-sm font-medium transition-colors ${active ? "text-amber-400" : "text-white/70 hover:text-white"
//         }`}
//     >
//       {label}
//     </Link>
//   );
// }
