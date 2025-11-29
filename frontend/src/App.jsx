import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './components/Layout/MainLayout';
import GettingStarted from './pages/GettingStarted';
import SystemInstructions from './pages/SystemInstructions';
import ToolCalling from './pages/ToolCalling';
import StructuredOutput from './pages/StructuredOutput';
import Multimodal from './pages/Multimodal';
import AsyncExecution from './pages/AsyncExecution';
import Examples from './pages/Examples';
import FeaturedProjects from './pages/FeaturedProjects';
import APIReference from './pages/APIReference';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<GettingStarted />} />
          <Route path="system-instructions" element={<SystemInstructions />} />
          <Route path="tool-calling" element={<ToolCalling />} />
          <Route path="structured-output" element={<StructuredOutput />} />
          <Route path="multimodal" element={<Multimodal />} />
          <Route path="async-execution" element={<AsyncExecution />} />
          <Route path="examples" element={<Examples />} />
          <Route path="featured-projects" element={<FeaturedProjects />} />
          <Route path="api-reference" element={<APIReference />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
