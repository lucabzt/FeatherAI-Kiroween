import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import GettingStarted from './pages/GettingStarted';
import SystemInstructions from './pages/SystemInstructions';
import ToolCalling from './pages/ToolCalling';
import StructuredOutput from './pages/StructuredOutput';
import Multimodal from './pages/Multimodal';
import Async from './pages/Async';
import Examples from './pages/Examples';
import FeaturedProjects from './pages/FeaturedProjects';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<GettingStarted />} />
          <Route path="system-instructions" element={<SystemInstructions />} />
          <Route path="tool-calling" element={<ToolCalling />} />
          <Route path="structured-output" element={<StructuredOutput />} />
          <Route path="multimodal" element={<Multimodal />} />
          <Route path="async" element={<Async />} />
          <Route path="examples" element={<Examples />} />
          <Route path="featured-projects" element={<FeaturedProjects />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
