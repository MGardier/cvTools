import { BookOpen } from "lucide-react";

import { ROUTES } from "./routes";

export const NAVBAR_MENU_ITEMS: any[] = [
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
