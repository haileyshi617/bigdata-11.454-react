import Layout from './components/layout/Layout';
import Intro from './components/section/Intro';
import FoodGlobal from './components/section/FoodGlobal';
import Outro from './components/section/Outro';

import SectionBreak01 from './components/section/SectionBreak01';
import SectionBreak02 from './components/section/SectionBreak02';
import SectionBreak03 from './components/section/SectionBreak03';

import Scroll01 from './components/section/Scroll01';
import Scroll02 from './components/section/Scroll02';

function App() {
  return (
    <Layout>
      <Intro />
      <SectionBreak01 />
      <FoodGlobal />
      <Scroll01 />
      <SectionBreak02 />
      <Scroll02 />
      <SectionBreak03 />
      <Outro />
    </Layout>
  );
}

export default App;
