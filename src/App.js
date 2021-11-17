import Layout from './components/layout/Layout';
import Intro from './components/section/Intro';
import FoodGlobal from './components/section/FoodGlobal';
import Outro from './components/section/Outro';

import SectionBreak01 from './components/section/SectionBreak01';

import Scroll01 from './components/section/Scroll01';

function App() {
    return (
        <Layout>
            <Intro />
            <SectionBreak01 />
            <FoodGlobal />
            <Scroll01 />
            <Outro />
        </Layout>
    );
}

export default App;
