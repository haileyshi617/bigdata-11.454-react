import { Transition, animated } from 'react-spring';

import Layout from './components/layout/Layout';
import Intro from './components/section/Intro';
import Outro from './components/section/Outro';

import Section01Map from './components/section/Section01Map';

import Section02Scroll from './components/section/Section02Scroll';

import Section03DotCard from './components/section/Section03DotCard';
import Section03Scroll from './components/section/Section03Scroll';

import Section04GridCard from './components/section/Section04GridCard';
import Section04Scroll from './components/section/Section04Scroll';

import Section05PieCard from './components/section/Section05PieCard';
import Section05Pie from './components/section/Section05Pie';

export default function App() {
  return (
    <Layout>
      <Intro />

      <Section01Map />

      <Section02Scroll />

      <Section03DotCard />
      <Section03Scroll />

      <Section04GridCard />
      <Section04Scroll />

      <Section05PieCard />
      <Section05Pie />

      <Outro />
    </Layout>
  );
}
