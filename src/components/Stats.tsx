import { useDiceStore } from '../store';

const Stats = () => {
  const rolls = useDiceStore((state) => state.rolls);
  const clearRolls = useDiceStore((state) => state.clearRolls);
  const undoLastRoll = useDiceStore((state) => state.undoLastRoll);
  const robberEmoji = useDiceStore((state) => state.robberEmoji);
  const setRobberEmoji = useDiceStore((state) => state.setRobberEmoji);

  const totalRolls = rolls.length;

  const emojiOptions = ['🍆', '🎲', '⚫', '🔴', '🟣', '👹', '🐉', '🦎', '🐍', '🕷️', '🟠'];

  const handleClear = () => {
    if (totalRolls > 0) {
      if (window.confirm('Are you sure you want to clear all rolls?')) {
        clearRolls();
      }
    }
  };

  const handleUndo = () => {
    undoLastRoll();
    if (navigator.vibrate) {
      navigator.vibrate(10);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <label className="text-gray-600 text-sm font-semibold">Robber Icon:</label>
        <select
          value={robberEmoji}
          onChange={(e) => setRobberEmoji(e.target.value)}
          className="bg-white border-2 border-gray-300 rounded-lg px-3 py-2 text-2xl
                   cursor-pointer hover:border-indigo-400 focus:border-indigo-500 focus:outline-none
                   transition-colors"
        >
          {emojiOptions.map((emoji) => (
            <option key={emoji} value={emoji}>
              {emoji}
            </option>
          ))}
        </select>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm mb-1">Total Rolls</p>
          <p className="text-4xl font-bold text-indigo-600">{totalRolls}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleUndo}
            disabled={totalRolls === 0}
            className="bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700
                     disabled:bg-gray-300 disabled:cursor-not-allowed
                     text-white font-semibold px-6 py-3 rounded-xl
                     transform transition-all duration-100
                     active:scale-95
                     shadow-md hover:shadow-lg
                     touch-manipulation"
            style={{ WebkitTapHighlightColor: 'transparent' }}
          >
            Undo
          </button>
          <button
            onClick={handleClear}
            disabled={totalRolls === 0}
            className="bg-red-500 hover:bg-red-600 active:bg-red-700
                     disabled:bg-gray-300 disabled:cursor-not-allowed
                     text-white font-semibold px-6 py-3 rounded-xl
                     transform transition-all duration-100
                     active:scale-95
                     shadow-md hover:shadow-lg
                     touch-manipulation"
            style={{ WebkitTapHighlightColor: 'transparent' }}
          >
            Clear All
          </button>
        </div>
      </div>
    </div>
  );
};

export default Stats;
