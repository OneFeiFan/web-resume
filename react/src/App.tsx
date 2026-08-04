import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Navigation from './components/Navigation';
import TechFooter from './components/TechFooter';
import PrintBar from './components/PrintBar';
import ScrollToTop from './components/ScrollToTop';
import { useResumeStore } from './stores/useResumeStore';
import { useTheme } from './hooks/useTheme';

const Home = lazy(() => import('./pages/Home'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
const TechStack = lazy(() => import('./pages/TechStack'));
const Timeline = lazy(() => import('./pages/Timeline'));
const About = lazy(() => import('./pages/About'));

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 5 * 60 * 1000, retry: 1 } },
});

function LoadingFallback() {
  return <div className="loading-placeholder">Loading…</div>;
}

function Shell() {
  useTheme();
  const { pathname } = useLocation();
  const viewMode = useResumeStore((s) => s.viewMode);
  const toggleViewMode = useResumeStore((s) => s.toggleViewMode);

  const mainClass = ['app-main'];
  if (['/project/', '/tech-stack', '/timeline', '/about'].some((p) => pathname.startsWith(p))) {
    mainClass.push('wide');
  }
  if (viewMode === 'print') mainClass.push('print-mode');

  return (
    <>
      <ScrollToTop />
      {viewMode !== 'print' && <Navigation />}
      <main className={mainClass.join(' ')}>
        {viewMode === 'print' ? (
          <PrintBar />
        ) : (
          <div className="top-bar no-print">
            <div className="top-bar-ver">
              <span>⚛ React 版</span>
              <a href="/vue/">Vue 3 版 →</a>
            </div>
            <button onClick={toggleViewMode} className="top-bar-btn">打印预览</button>
          </div>
        )}
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/project/:id" element={<ProjectDetail />} />
            <Route path="/tech-stack" element={<TechStack />} />
            <Route path="/timeline" element={<Timeline />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<Navigate to="/" replace />} />
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
