import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@/hooks/useTheme';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { AppLayout } from '@/pages/AppLayout';
import DashboardPage from '@/pages/DashboardPage';
import UserProfilePage from '@/pages/UserProfilePage';
import RepoPage from '@/pages/RepoPage';
import { RouteErrorBoundary } from '@/components/RouteErrorBoundary';
import { Toaster } from "@/components/ui/sonner"
const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <RouteErrorBoundary />,
    children: [
      {
        path: "/",
        element: <DashboardPage />,
      },
      {
        path: "/:username",
        element: <UserProfilePage />,
      },
      {
        path: "/:owner/:repoName/*",
        element: <RepoPage />,
      },
    ]
  }
]);
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="codeharbor-theme">
        <RouterProvider router={router} />
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  );
}