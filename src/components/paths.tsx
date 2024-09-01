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
    link: "https://docs.ieeecsvitc.com/",
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
