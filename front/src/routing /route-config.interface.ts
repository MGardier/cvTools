export interface RouteConfigInterface {
  path: string;
  element: React.ComponentType;
  title: string;
  isPublic?: boolean;                    
  requiresAuth?: boolean;                
  icon?: string;
}