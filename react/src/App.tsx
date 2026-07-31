import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Navigation from './components/Navigation';
import FrameworkSwitcher from './components/FrameworkSwitcher';
import TechFooter from './components/TechFooter';
import { useTheme } from './hooks/useTheme';

const Home = lazy(() => import('./pages/Home'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
const TechStack = lazy(() => import('./pages/TechStack'));
const Timeline = lazy(() => import('./pages/Timeline'));
const About = lazy(() => import('./pages/About'));

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 5 * 60 * 1000, retry: 1 } },
});

function Shell() {
  useTheme();

  return (
    <>
      <Navigation />
      <main className="app-main">
        <FrameworkSwitcher />
        <Suspense fallback={<div style={{padding:'4rem 0',textAlign:'center',color:'#aaa'}}>Loading…</div>}>
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
    </>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Shell />
      </BrowserRouter>
    </QueryClientProvider>
  );
}
