import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import WhatIsFeatherAI from './pages/WhatIsFeatherAI';
import GettingStarted from './pages/GettingStarted';
import SystemInstructions from './pages/SystemInstructions';
import ToolCalling from './pages/ToolCalling';
import StructuredOutput from './pages/StructuredOutput';
import Multimodal from './pages/Multimodal';
import NativeTools from './pages/NativeTools';
import ArunMethod from './pages/ArunMethod';
import AsynchronousTools from './pages/AsynchronousTools';
import Examples from './pages/Examples';
import FeaturedProjects from './pages/FeaturedProjects';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<GettingStarted />} />
          <Route path="what-is-featherai" element={<WhatIsFeatherAI />} />
          <Route path="system-instructions" element={<SystemInstructions />} />
          <Route path="tool-calling" element={<ToolCalling />} />
          <Route path="structured-output" element={<StructuredOutput />} />
          <Route path="multimodal" element={<Multimodal />} />
          <Route path="native-tools" element={<NativeTools />} />
          <Route path="arun-method" element={<ArunMethod />} />
          <Route path="async-tools" element={<AsynchronousTools />} />
          <Route path="examples" element={<Examples />} />
          <Route path="featured-projects" element={<FeaturedProjects />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
