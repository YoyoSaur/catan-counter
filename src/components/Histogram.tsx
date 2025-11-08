import { useDiceStore } from '../store';

const Histogram = () => {
  // Subscribe to rolls array so component re-renders when it changes
  const rolls = useDiceStore((state) => state.rolls);
  const robberMarks = useDiceStore((state) => state.robberMarks);
  const getRollCounts = useDiceStore((state) => state.getRollCounts);
  const robberEmoji = useDiceStore((state) => state.robberEmoji);

  // Get roll counts separated by robber status
  const rollCounts = getRollCounts();

  // Find the maximum total count to scale the bars
  const maxCount = Math.max(
    ...Object.values(rollCounts).map((counts) => counts.normal + counts.robber),
    1
  );

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 h-full flex flex-col">
      <div className="flex-1 flex items-end justify-between gap-2 min-h-[300px]">
        {Object.entries(rollCounts).map(([value, counts]) => {
          const totalCount = counts.normal + counts.robber;
          const normalPercentage = maxCount > 0 ? (counts.normal / maxCount) * 100 : 0;
          const robberPercentage = maxCount > 0 ? (counts.robber / maxCount) * 100 : 0;
          const hasRobberMark = robberMarks[Number(value)];

          return (
            <div key={value} className="flex-1 flex flex-col items-center gap-2">
              <div className="text-center min-h-[24px]">
                {totalCount > 0 && (
                  <span className="text-gray-700 font-bold text-sm">
                    {totalCount}
                  </span>
                )}
              </div>
              <div className="w-full bg-gray-100 overflow-hidden flex flex-col justify-end relative"
                   style={{ height: '250px' }}>
                {/* Normal rolls (indigo) - bottom portion */}
                <div
                  className="w-full bg-gradient-to-t from-indigo-600 to-indigo-500
                           transition-all duration-500 ease-out"
                  style={{ height: `${normalPercentage}%` }}
                />
                {/* Robber rolls (red) - top portion */}
                <div
                  className="w-full bg-gradient-to-t from-red-600 to-red-500
                           transition-all duration-500 ease-out"
                  style={{ height: `${robberPercentage}%` }}
                />
                {hasRobberMark && (
                  <div className="absolute top-1 left-1/2 transform -translate-x-1/2 text-xs">
                    {robberEmoji}
                  </div>
                )}
              </div>
              <div className="font-semibold text-gray-700 text-lg">
                {value}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Histogram;
