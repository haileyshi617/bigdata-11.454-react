import { Transition, animated } from 'react-spring';

import Layout from './components/layout/Layout';
import Intro from './components/section/Intro';
import Outro from './components/section/Outro';

import Section01Map from './components/section/Section01Map';

import Section02Scroll from './components/section/Section02Scroll';

import Section03Dot from './components/section/Section03Dot';
import Scroll01Dot from './components/section/Scroll01Dot';

import Section04Grid from './components/section/Section04Grid';
import Section04Scroll from './components/section/Section04Scroll';

import Section05Pie from './components/section/Section05Pie';

export default function App() {
  return (
    <Layout>
      <Intro />

      <Section01Map />

      <Section02Scroll />

      <Section03Dot />
      <Scroll01Dot />

      <Section04Grid />
      <Section04Scroll />

      <Section05Pie />

      <Outro />
    </Layout>
  );
}
