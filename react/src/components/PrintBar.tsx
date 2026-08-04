import { useResume } from '../hooks/useResume';

export default function PrintBar() {
  const { viewMode, toggleViewMode } = useResume();

  if (viewMode !== 'print') {
    return (
      <div style={{ textAlign: 'right', marginBottom: '0.3rem' }} className="no-print">
        <button onClick={toggleViewMode} style={{
          border: '1px solid var(--rule)',
          background: 'var(--paper)',
          color: 'var(--ink-muted)',
          padding: '0.25rem 0.75rem',
          cursor: 'pointer',
          fontSize: 'var(--text-sm)',
          fontFamily: 'inherit',
          borderRadius: 2,
        }}>
          打印预览
        </button>
      </div>
    );
  }

  return (
    <div className="print-toolbar" style={{ position: 'sticky', top: 0, zIndex: 30 }}>
      <span style={{ color: 'var(--ink-muted)', fontSize: 'var(--text-xs)' }}>打印预览 · A4</span>
      <div style={{ flex: 1 }} />
      <button onClick={toggleViewMode} style={{
        border: '1px solid var(--rule)',
        background: 'var(--paper)',
        color: 'var(--ink-muted)',
        padding: '0.25rem 0.75rem',
        cursor: 'pointer',
        fontSize: 'var(--text-sm)',
        fontFamily: 'inherit',
        borderRadius: 2,
      }}>
        退出
      </button>
      <button onClick={() => window.print()} style={{
        border: '1px solid var(--red)',
        background: 'var(--red-pale)',
        color: 'var(--red)',
        padding: '0.25rem 0.75rem',
        cursor: 'pointer',
        fontSize: 'var(--text-sm)',
        fontFamily: 'inherit',
        borderRadius: 2,
        fontWeight: 500,
      }}>
        下载 PDF
      </button>
    </div>
  );
}
