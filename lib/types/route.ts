export const TripRoutes = {
  create: () => '/trip/create',
  details: (id: string) => `/trip/${id}/details`,
  settings: (id: string) => `/trip/${id}/settings`,
  calendar: (id: string) => `/trip/${id}/calendar`,
} as const;

export const DashboardRoutes = {
  dashboard: () => '/dashboard',
} as const;

export const AccountRoutes = {
  account: () => '/account',
} as const;

export const HomeRoutes = {
  home: () => '/',
} as const;

export const ActivityRoutes = {
  create: (tripId: string) => `/trip/${tripId}/activity/create`,
  details: (tripId: string, id: string) =>
    `/trip/${tripId}/activity/${id}/details`,
  edit: (tripId: string, id: string) => `/trip/${tripId}/activity/${id}/edit`,
} as const;
