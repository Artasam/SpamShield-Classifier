import { useEffect } from 'react';
import { useTheme } from './hooks/useTheme';
import { usePredict } from './hooks/usePredict';
import { useHistory } from './hooks/useHistory';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HeroSection from './components/hero/HeroSection';
import FeatureGrid from './components/features/FeatureGrid';
import PredictCard from './components/predict/PredictCard';
import ResultDisplay from './components/predict/ResultDisplay';
import HistoryPanel from './components/history/HistoryPanel';

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const { history, addEntry, clearHistory } = useHistory();
  const { result, loading, error, predict, reset } = usePredict();

  // Save successful predictions to history
  useEffect(() => {
    if (result) {
      addEntry(result);
    }
  }, [result, addEntry]);

  return (
    <>
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      
      <main>
        <HeroSection />
        
        <section className="section" style={{ position: 'relative', zIndex: 3 }}>
          {!result && !error ? (
            <PredictCard onPredict={predict} loading={loading} />
          ) : (
            <div style={{ maxWidth: 700, margin: '0 auto' }}>
              <ResultDisplay 
                result={result} 
                error={error} 
                onReset={reset} 
              />
            </div>
          )}
          
          <HistoryPanel history={history} onClear={clearHistory} />
        </section>

        <FeatureGrid />
      </main>

      <Footer />
    </>
  );
}
