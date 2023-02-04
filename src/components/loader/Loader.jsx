import { Blocks } from 'react-loader-spinner';

export const Loader = () => (
  <div
    style={{
      backgroundColor: 'rgba(0,0,0,0.9)',
      position: 'fixed',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 1200,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
    className="spinnerOverlay"
  >
    <Blocks
      visible={true}
      height="80"
      width="80"
      ariaLabel="blocks-loading"
      wrapperClass="spinnerOverlay"
    />
  </div>
);
