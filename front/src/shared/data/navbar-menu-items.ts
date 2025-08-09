import { BookOpen } from "lucide-react";
import type { MenuItemInterface } from "../interfaces/routing/menu-item.interface";
import { ROUTES } from "./routes";

export const NAVBAR_MENU_ITEMS: MenuItemInterface[] = [
  {
    title: "Profil",
    linkItems: [
      {
        icon: BookOpen,
        title: "Inscription",
        link: ROUTES.auth.signUp,
        description: "Permet de créer un compte",
      },
      {
        icon: BookOpen,
        title: "Inscription",
        link: ROUTES.auth.signUp,
        description: "Permet de créer un compte",
      },
    ],
  },
];
