import Hero from './Hero';
import Recommendation from './Recommendation';

export default function Home() {
  return (
    <main>
      <Hero title="Hello Bob!" contents="Scan your fridge for recommendation recipe" />
      <Recommendation />
    </main>
  );
}
