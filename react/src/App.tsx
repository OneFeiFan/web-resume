import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Navigation from './components/Navigation';
import FrameworkSwitcher from './components/FrameworkSwitcher';
import TechFooter from './components/TechFooter';
import { useTheme } from './hooks/useTheme';

// Route-level code splitting — each page is a separate chunk
const Home = lazy(() => import('./pages/Home'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
const TechStack = lazy(() => import('./pages/TechStack'));
const Timeline = lazy(() => import('./pages/Timeline'));
const About = lazy(() => import('./pages/About'));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
    },
  },
});

function PageLoader() {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-primary-60 border-t-transparent rounded-full animate-spin" />
        <span className="text-xs text-secondary-50 font-mono">Loading...</span>
      </div>
    </div>
  );
}

function ThemeProvider({ children }: { children: React.ReactNode }) {
  useTheme();
  return <>{children}</>;
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter basename={import.meta.env.PROD ? '/react' : '/'}>
        <ThemeProvider>
          <div className="min-h-screen bg-surface text-secondary-20 transition-colors duration-300">
            <Navigation />
            <main className="ml-20 p-6 sm:p-10 max-w-4xl mx-auto">
              <FrameworkSwitcher />
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/project/:id" element={<ProjectDetail />} />
                  <Route path="/tech-stack" element={<TechStack />} />
                  <Route path="/timeline" element={<Timeline />} />
                  <Route path="/about" element={<About />} />
                </Routes>
              </Suspense>
              <TechFooter />
            </main>
          </div>
        </ThemeProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
