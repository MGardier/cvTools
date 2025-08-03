
//TODO: remove fake data

import {   JobDataTableColumns } from "@/features/job/components/job-data-table-columns"
import { DataTable } from "@/shared/components/data-table/data-table"

export interface Candidature {
  id: string
  enterprise: string
  category: string
  localisation: string
  url: string
  technos: string[]
  job: string
  contactName: string
  contactEmail: string
  statut: string
  priority: string
  dateCreated: Date
  dateMaj: Date
}

// 📊 DONNÉES D'EXEMPLE - 10 CANDIDATURES
export const candidatures: Candidature[] = [
  {
    id: "cand-001",
    enterprise: "TechCorp Solutions",
    category: "Startup",
    localisation: "Paris, France",
    url: "https://techcorp.fr",
    technos: ["React", "TypeScript", "Node.js", "PostgreSQL"],
    job: "Développeur Frontend Senior",
    contactName: "Marie Dubois",
    contactEmail: "marie.dubois@techcorp.fr",
    statut: "En attente",
    priority: "Haute",
    dateCreated: new Date("2024-01-15"),
    dateMaj: new Date("2024-01-20")
  },
  {
    id: "cand-002",
    enterprise: "Digital Innovation",
    category: "Scale-up",
    localisation: "Lyon, France",
    url: "https://digital-innovation.com",
    technos: ["Vue.js", "Python", "Django", "MySQL"],
    job: "Développeur Full Stack",
    contactName: "Pierre Martin",
    contactEmail: "p.martin@digital-innovation.com",
    statut: "Entretien planifié",
    priority: "Moyenne",
    dateCreated: new Date("2024-01-18"),
    dateMaj: new Date("2024-01-25")
  },
  {
    id: "cand-003",
    enterprise: "FinanceApp",
    category: "Fintech",
    localisation: "Remote",
    url: "https://financeapp.io",
    technos: ["React", "Next.js", "Prisma", "Supabase"],
    job: "Frontend Developer",
    contactName: "Sophie Leroy",
    contactEmail: "sophie@financeapp.io",
    statut: "Refusé",
    priority: "Basse",
    dateCreated: new Date("2024-01-10"),
    dateMaj: new Date("2024-01-22")
  },
  {
    id: "cand-004",
    enterprise: "CloudTech SAAS",
    category: "Enterprise",
    localisation: "Nantes, France",
    url: "https://cloudtech-saas.fr",
    technos: ["Angular", "TypeScript", "C#", ".NET", "Azure"],
    job: "Développeur Angular Senior",
    contactName: "Thomas Rousseau",
    contactEmail: "thomas.rousseau@cloudtech.fr",
    statut: "En cours",
    priority: "Haute",
    dateCreated: new Date("2024-01-22"),
    dateMaj: new Date("2024-01-28")
  },
  {
    id: "cand-005",
    enterprise: "E-Commerce Plus",
    category: "E-commerce",
    localisation: "Bordeaux, France",
    url: "https://ecommerce-plus.fr",
    technos: ["Shopify", "React", "GraphQL", "Node.js"],
    job: "Développeur E-commerce",
    contactName: "Amélie Garnier",
    contactEmail: "amelie@ecommerce-plus.fr",
    statut: "Candidature envoyée",
    priority: "Moyenne",
    dateCreated: new Date("2024-01-25"),
    dateMaj: new Date("2024-01-25")
  },
  {
    id: "cand-006",
    enterprise: "HealthTech Innovation",
    category: "HealthTech",
    localisation: "Toulouse, France",
    url: "https://healthtech-innovation.com",
    technos: ["React Native", "TypeScript", "MongoDB", "Express"],
    job: "Développeur Mobile",
    contactName: "Dr. Claire Moreau",
    contactEmail: "claire.moreau@healthtech.com",
    statut: "Entretien technique passé",
    priority: "Haute",
    dateCreated: new Date("2024-01-12"),
    dateMaj: new Date("2024-01-30")
  },
  {
    id: "cand-007",
    enterprise: "Gaming Studio Alpha",
    category: "Gaming",
    localisation: "Montpellier, France",
    url: "https://gaming-alpha.fr",
    technos: ["Unity", "C#", "React", "Firebase"],
    job: "Développeur Frontend Gaming",
    contactName: "Lucas Petit",
    contactEmail: "lucas.petit@gaming-alpha.fr",
    statut: "En attente",
    priority: "Basse",
    dateCreated: new Date("2024-01-20"),
    dateMaj: new Date("2024-01-26")
  },
  {
    id: "cand-008",
    enterprise: "AgriTech Solutions",
    category: "AgriTech",
    localisation: "Rennes, France",
    url: "https://agritech-solutions.fr",
    technos: ["Vue.js", "Laravel", "PHP", "MySQL", "Docker"],
    job: "Développeur Web Full Stack",
    contactName: "Jean-Baptiste Lemoine",
    contactEmail: "jb.lemoine@agritech.fr",
    statut: "Accepté",
    priority: "Haute",
    dateCreated: new Date("2024-01-08"),
    dateMaj: new Date("2024-02-01")
  },
  {
    id: "cand-009",
    enterprise: "EdTech Learning",
    category: "EdTech",
    localisation: "Lille, France",
    url: "https://edtech-learning.com",
    technos: ["React", "TypeScript", "Strapi", "PostgreSQL"],
    job: "Développeur Frontend React",
    contactName: "Camille Durand",
    contactEmail: "camille.durand@edtech.com",
    statut: "En cours",
    priority: "Moyenne",
    dateCreated: new Date("2024-01-28"),
    dateMaj: new Date("2024-02-02")
  },
  {
    id: "cand-010",
    enterprise: "CryptoTrade Pro",
    category: "Crypto",
    localisation: "Remote",
    url: "https://cryptotrade-pro.io",
    technos: ["React", "Web3", "Solidity", "Ethereum", "TypeScript"],
    job: "Frontend Developer Web3",
    contactName: "Alexandre Moreau",
    contactEmail: "alex@cryptotrade-pro.io",
    statut: "Candidature envoyée",
    priority: "Moyenne",
    dateCreated: new Date("2024-02-01"),
    dateMaj: new Date("2024-02-01")
  },
  
]

// 🎨 TYPES AUXILIAIRES
export type StatutCandidature = 
  | "Candidature envoyée"
  | "En attente" 
  | "Entretien planifié"
  | "Entretien technique passé"
  | "En cours"
  | "Accepté"
  | "Refusé"

export type PriorityCandidature = 
  | "Haute"
  | "Moyenne" 
  | "Basse"

export type CategoryEnterprise = 
  | "Startup"
  | "Scale-up"
  | "Enterprise"
  | "Fintech"
  | "HealthTech"
  | "E-commerce"
  | "Gaming"
  | "AgriTech"
  | "EdTech"
  | "Crypto"


//TODO : Step 1  - Transformer le composants data table en réutilisable
//TODO : Step 2 -  Le rendre responsive et adapter à mobile



//TODO: pagination avec page courante et nb total  + séléction dynamique du nombre de pages affiché  puis s 
//TODO: triage par column 
//TODO: responsive mobile + affichage lisible et épuré + card pour les status
//TODO: pouvoir retirer des columns
//TODO: pouvoir sélectionner des col pour faire des actions multiples + nb colonnes séléctionnés
//TODO: action edit, delete , favoris (à définir )
//TODO: recherche global sur les divers champs + mini dropdown pour les status et la priorité





export function Home () {
     return (
    <div className="container mx-auto py-10">
      <DataTable columns={JobDataTableColumns} data={candidatures} />
    </div>
  );
}


