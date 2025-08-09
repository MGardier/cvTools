

import type { RouteConfigInterface } from './route-config.interface';
import { Home } from '@/pages/Home';
import { SignIn } from '@/pages/auth/Signin';
import { SignUpPage } from '@/pages/auth/sign-up-page';


export const appRoutes: RouteConfigInterface[] = [
  {
    path: '/',
    element: Home,
    title: 'Accueil',
    isPublic: true,
    requiresAuth: false,
  },
  {
    path: '/inscription',
    element: SignUpPage,
    title: 'Inscription',
    isPublic: true,
    requiresAuth: false,
  },
  {
    path: '/connexion',
    element: SignIn,
    title: 'Connexion',
    isPublic: true,
    requiresAuth: false,
  },

  

];