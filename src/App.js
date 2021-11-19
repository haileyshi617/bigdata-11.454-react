import Layout from './components/layout/Layout';
import Intro from './components/section/Intro';
import Outro from './components/section/Outro';

import Section01Migration from './components/section/Section01Migration';
import Section02FoodGlobal from './components/section/Section02FoodGlobal';
import Section03Dot from './components/section/Section03Dot';
import Section04Bar from './components/section/Section04Bar';
import Section05Pie from './components/section/Section05Pie';

import Scroll01Dot from './components/section/Scroll01Dot';
import Scroll02Bar from './components/section/Scroll02Bar';

function App() {
  return (
    <Layout>
      <Intro />
      <Section01Migration />
      <Section02FoodGlobal />
      <Section03Dot />
      <Scroll01Dot />
      <Section04Bar />
      <Scroll02Bar />
      <Section05Pie />
      <Outro />
    </Layout>
  );
}

export default App;
