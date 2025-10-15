/**
 * Stats Section Styles
 */

export const statsStyles = {
  statsSection: {
    padding: '5rem 2rem',
    background: 'linear-gradient(180deg, #0a0a0a 0%, #000000 100%)',
    position: 'relative'
  },

  container: {
    maxWidth: '1200px',
    margin: '0 auto'
  },

  title: {
    fontSize: '2.5rem',
    fontWeight: 700,
    textAlign: 'center',
    marginBottom: '1rem',
    background: 'linear-gradient(135deg, #ffffff 0%, #999999 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  },

  subtitle: {
    fontSize: '1.1rem',
    color: 'rgba(255, 255, 255, 0.6)',
    textAlign: 'center',
    marginBottom: '3rem'
  },

  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '2rem',
    marginBottom: '4rem'
  },

  statCard: {
    background: 'rgba(255, 255, 255, 0.02)',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    borderRadius: '16px',
    padding: '2rem',
    textAlign: 'center',
    transition: 'all 0.3s ease',
    ':hover': {
      background: 'rgba(255, 255, 255, 0.04)',
      transform: 'translateY(-2px)'
    }
  },

  statNumber: {
    fontSize: '2.5rem',
    fontWeight: 700,
    color: '#007aff',
    marginBottom: '0.5rem'
  },

  statLabel: {
    fontSize: '0.9rem',
    color: 'rgba(255, 255, 255, 0.6)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em'
  },

  chartContainer: {
    background: 'rgba(255, 255, 255, 0.02)',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    borderRadius: '20px',
    padding: '2rem',
    marginTop: '3rem'
  },

  chartTitle: {
    fontSize: '1.5rem',
    fontWeight: 600,
    marginBottom: '2rem',
    color: '#f5f5f7',
    textAlign: 'center'
  },

  chart: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: '300px',
    marginBottom: '2rem',
    gap: '1rem'
  },

  chartBar: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },

  barContainer: {
    position: 'relative',
    width: '100%',
    height: '250px',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
    gap: '4px'
  },

  barTraditional: {
    width: '40%',
    background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.1) 100%)',
    borderRadius: '4px 4px 0 0',
    transition: 'height 1s ease-out',
    cursor: 'pointer',
    ':hover': {
      background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.2) 100%)'
    }
  },

  barLaunchPrep: {
    width: '40%',
    background: 'linear-gradient(180deg, #007aff 0%, #0056cc 100%)',
    borderRadius: '4px 4px 0 0',
    transition: 'height 1s ease-out 0.2s',
    cursor: 'pointer',
    ':hover': {
      background: 'linear-gradient(180deg, #0088ff 0%, #0066dd 100%)'
    }
  },

  barLabel: {
    fontSize: '0.75rem',
    color: 'rgba(255, 255, 255, 0.5)',
    marginTop: '0.5rem'
  },

  chartLegend: {
    display: 'flex',
    justifyContent: 'center',
    gap: '2rem'
  },

  legendItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.9rem',
    color: 'rgba(255, 255, 255, 0.6)'
  },

  legendDotTraditional: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    background: 'rgba(255, 255, 255, 0.3)'
  },

  legendDotLaunchPrep: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    background: '#007aff'
  }
};