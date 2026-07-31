import { useResumeStore } from '../stores/useResumeStore';

export default function PrintBar() {
  const viewMode = useResumeStore((s) => s.viewMode);
  const toggleViewMode = useResumeStore((s) => s.toggleViewMode);

  const btn: React.CSSProperties = {
    border: '1px solid var(--c-border)',
    background: 'var(--c-card)',
    color: 'var(--t2)',
    padding: '.35rem .9rem',
    borderRadius: 4,
    cursor: 'pointer',
    fontSize: '.78rem',
    fontFamily: 'inherit',
    transition: 'all .15s',
  };

  const primaryBtn: React.CSSProperties = {
    ...btn,
    background: 'var(--c-primary)',
    color: 'var(--c-surface)',
    borderColor: 'var(--c-primary)',
    fontWeight: 500,
  };

  // Entry button (interactive mode)
  if (viewMode !== 'print') {
    return (
      <div style={{ textAlign: 'right', marginBottom: '.3rem' }} className="no-print">
        <button onClick={toggleViewMode} style={{ ...btn, fontSize: '.75rem' }}>
          打印预览
        </button>
      </div>
    );
  }

  // Toolbar (preview mode)
  return (
    <div
      className="print-toolbar"
      style={{
        position: 'sticky', top: 0, zIndex: 50,
        display: 'flex', alignItems: 'center', gap: '.8rem',
        padding: '.6rem 0', marginBottom: '2rem',
        borderBottom: '1px solid var(--c-border)',
        background: 'var(--c-surface)',
        fontSize: '.78rem',
      }}
    >
      <span style={{ color: 'var(--t3)', fontSize: '.75rem', fontFamily: "'JetBrains Mono',monospace" }}>
        打印预览 · A4
      </span>
      <div style={{ flex: 1 }} />
      <button onClick={toggleViewMode} style={btn}>
        退出
      </button>
      <button onClick={() => window.print()} style={primaryBtn}>
        下载 PDF
      </button>
    </div>
  );
}
