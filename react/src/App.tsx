import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
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
      <div className="noise-overlay" aria-hidden="true" />
      {viewMode !== 'print' && <Navigation />}
      <main className={mainClass.join(' ')}>
        {viewMode === 'print' ? (
          <PrintBar />
        ) : (
          <div className="toolbar-row no-print">
            <span className="toolbar-pill">⚛ React 版 · <a href="/vue/">Vue 3 →</a></span>
            <button onClick={toggleViewMode} className="toolbar-pill toolbar-btn">打印预览</button>
          </div>
        )}
        <Suspense fallback={<LoadingFallback />}>
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
