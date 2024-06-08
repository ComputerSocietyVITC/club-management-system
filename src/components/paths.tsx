import { signOut } from "next-auth/react";

const navItems = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Profile",
    link: "/profile",
  },
  {
    name: "Documentation",
    link: "/documentation",
  },
  {
    name: "Leaderboard",
    link: "/leaderboard",
  },
  {
    name: "Admin",
    link: "/admin",
  },
  {
    name: "Logout",
    link: "/logout",
  },
];
export default navItems;
