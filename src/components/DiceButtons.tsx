import { useDiceStore } from '../store';

const DiceButtons = () => {
  const addRoll = useDiceStore((state) => state.addRoll);
  const lastClickedValue = useDiceStore((state) => state.lastClickedValue);
  const robberMarks = useDiceStore((state) => state.robberMarks);
  const toggleRobberMark = useDiceStore((state) => state.toggleRobberMark);
  const isRobberMode = useDiceStore((state) => state.isRobberMode);
  const setRobberMode = useDiceStore((state) => state.setRobberMode);
  const clearRobberMarks = useDiceStore((state) => state.clearRobberMarks);
  const robberEmoji = useDiceStore((state) => state.robberEmoji);

  const diceValues = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  const handleClick = (value: number) => {
    if (isRobberMode) {
      // In robber mode, toggle the robber mark
      toggleRobberMark(value);
      // Turn off robber mode after placing
      setRobberMode(false);
      // Stronger haptic feedback for robber mark
      if (navigator.vibrate) {
        navigator.vibrate([20, 10, 20]);
      }
    } else {
      // Normal mode, record the roll
      addRoll(value);
      // Haptic feedback on mobile devices
      if (navigator.vibrate) {
        navigator.vibrate(10);
      }
    }
  };

  const handleRobberModeToggle = () => {
    // If we're turning on robber mode, clear any existing robber marks
    if (!isRobberMode) {
      clearRobberMarks();
    }
    setRobberMode(!isRobberMode);
    if (navigator.vibrate) {
      navigator.vibrate(10);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      {isRobberMode && (
        <div className="text-sm text-orange-600 text-center mb-3 font-semibold">
          Click a number to move the robber
        </div>
      )}
      <div className="grid grid-cols-4 gap-2">
        {diceValues.map((value) => {
          const isLastClicked = lastClickedValue === value;
          const hasRobber = robberMarks[value];

          return (
            <button
              key={value}
              onClick={() => handleClick(value)}
              className={`${
                isLastClicked && !isRobberMode
                  ? 'bg-green-600 hover:bg-green-700 active:bg-green-800'
                  : hasRobber
                  ? 'bg-red-600 hover:bg-red-700 active:bg-red-800'
                  : 'bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800'
              }
                       text-white font-bold text-2xl rounded-xl
                       h-14 w-full relative
                       transform transition-all duration-100
                       active:scale-95
                       shadow-lg hover:shadow-xl
                       touch-manipulation`}
              style={{ WebkitTapHighlightColor: 'transparent' }}
            >
              {value}
              {hasRobber && (
                <span className="absolute top-0.5 right-1.5 text-xs">{robberEmoji}</span>
              )}
            </button>
          );
        })}
        {/* Robber mode toggle button */}
        <button
          onClick={handleRobberModeToggle}
          className={`${
            isRobberMode
              ? 'bg-orange-600 hover:bg-orange-700 active:bg-orange-800'
              : 'bg-purple-600 hover:bg-purple-700 active:bg-purple-800'
          }
                   text-white font-bold text-2xl rounded-xl
                   h-14 w-full
                   transform transition-all duration-100
                   active:scale-95
                   shadow-lg hover:shadow-xl
                   touch-manipulation`}
          style={{ WebkitTapHighlightColor: 'transparent' }}
        >
          {robberEmoji}
        </button>
      </div>
    </div>
  );
};

export default DiceButtons;
