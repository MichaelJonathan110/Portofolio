import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Manifesto } from '@/components/sections/Manifesto';
import { Projects } from '@/components/sections/Projects';
import { MyData } from '@/components/sections/MyData';
import { Stack } from '@/components/sections/Stack';
import { Education } from '@/components/sections/Education';
import { BeyondCode } from '@/components/sections/BeyondCode';
import { Contact } from '@/components/sections/Contact';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <>
      <main id="main">
        <Hero />
        <Manifesto />
        <About />
        <Projects />
        <MyData />
        <Stack />
        <Education />
        <BeyondCode />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
