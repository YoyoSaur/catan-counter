import DiceButtons from './components/DiceButtons';
import Histogram from './components/Histogram';
import Stats from './components/Stats';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 pb-8 lg:overflow-hidden lg:h-screen lg:flex lg:flex-col">
      <div className="max-w-7xl mx-auto w-full lg:flex lg:flex-col lg:h-full">
        <header className="text-center mb-6 mt-4">
          <h1 className="text-4xl font-bold text-indigo-900 mb-2">
            Dice Roll Recorder
          </h1>
          <p className="text-indigo-600">Track your rolls and see the stats</p>
        </header>

        <div className="space-y-6 lg:space-y-0 lg:flex lg:flex-col lg:gap-6 lg:flex-1 lg:min-h-0">
          <Stats />

          {/* Histogram and Buttons side by side on desktop, stacked on mobile */}
          <div className="flex flex-col lg:flex-row gap-6 lg:flex-1 lg:min-h-0">
            <div className="lg:flex-1 lg:min-w-0">
              <Histogram />
            </div>
            <div className="lg:w-96 lg:flex-shrink-0">
              <DiceButtons />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
