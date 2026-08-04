import { useResume } from '../hooks/useResume';

export default function PrintBar() {
  const { viewMode, toggleViewMode } = useResume();

  const btnStyle: React.CSSProperties = {
    border: '1px solid var(--border)',
    background: 'var(--card-bg)',
    color: 'var(--t2)',
    padding: '0.35rem 0.9rem',
    borderRadius: 'var(--radius-sm)',
    cursor: 'pointer',
    fontSize: '0.78rem',
    fontFamily: 'inherit',
    transition: 'all 0.15s ease',
  };

  if (viewMode !== 'print') {
    return (
      <div style={{ textAlign: 'right', marginBottom: '0.3rem' }} className="no-print">
        <button onClick={toggleViewMode} style={btnStyle}>
          🖨 打印预览
        </button>
      </div>
    );
  }

  return (
    <div
      className="print-toolbar no-print"
      style={{
        position: 'sticky', top: 0, zIndex: 50,
        display: 'flex', alignItems: 'center', gap: '0.8rem',
        padding: '0.6rem 0', marginBottom: '2rem',
        borderBottom: '1px solid var(--border)',
        background: 'var(--bg)',
        fontSize: '0.78rem',
      }}
    >
      <span style={{ color: 'var(--t3)', fontSize: '0.75rem', fontFamily: "'JetBrains Mono', monospace" }}>
        打印预览 · A4
      </span>
      <div style={{ flex: 1 }} />
      <button onClick={toggleViewMode} style={btnStyle}>
        退出
      </button>
      <button onClick={() => window.print()} style={{
        ...btnStyle,
        background: 'var(--accent)',
        color: '#fff',
        borderColor: 'var(--accent)',
        fontWeight: 500,
      }}>
        下载 PDF
      </button>
    </div>
  );
}
