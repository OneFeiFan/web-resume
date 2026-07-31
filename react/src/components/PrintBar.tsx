import { useResumeStore } from '../stores/useResumeStore';

export default function PrintBar() {
  const viewMode = useResumeStore((s) => s.viewMode);
  const toggleViewMode = useResumeStore((s) => s.toggleViewMode);

  if (viewMode !== 'print') {
    return (
      <div style={{ textAlign: 'right', marginBottom: '.5rem' }} className="no-print">
        <button onClick={toggleViewMode} className="chip" style={{ cursor: 'pointer' }}>
          🖨 打印预览
        </button>
      </div>
    );
  }

  return (
    <div
      className="no-print"
      style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: '#2A2D32', color: '#fff',
        padding: '.5rem 1.2rem', marginBottom: '1.5rem',
        borderRadius: 6, display: 'flex', alignItems: 'center', gap: '1rem',
        fontSize: '.85rem',
      }}
    >
      <span style={{ fontWeight: 500 }}>打印预览</span>
      <span style={{ color: '#999', fontSize: '.75rem' }}>此页面已优化为 A4 简历格式</span>
      <div style={{ flex: 1 }} />
      <button
        onClick={() => window.print()}
        style={{
          background: 'var(--c-accent)', color: '#fff', border: 'none',
          padding: '.4rem 1rem', borderRadius: 4, cursor: 'pointer',
          fontSize: '.8rem', fontWeight: 500,
        }}
      >
        下载 PDF
      </button>
      <button
        onClick={toggleViewMode}
        style={{
          background: 'transparent', color: '#ccc', border: '1px solid #555',
          padding: '.4rem 1rem', borderRadius: 4, cursor: 'pointer',
          fontSize: '.8rem',
        }}
      >
        退出
      </button>
    </div>
  );
}
