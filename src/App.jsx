import React from 'react'
import Sidebar from './Components/main/sidebar/Sidebar'
import Main from './Components/main/Main'
import BottomNav from './Components/main/sidebar/BottomNav';

const App = () => {
  // Use a state to track window width for responsive rendering
  // (No longer needed for BottomNav)
  const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 600);
  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 600);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="app-container">
      <div className="main-flex">
        <Sidebar />
        <Main />
      </div>
      {isMobile && <BottomNav />}
    </div>
  );
}

export default App
