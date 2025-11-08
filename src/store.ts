import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Roll {
  value: number;
  wasRobberActive: boolean;
}

export interface DiceStore {
  rolls: Roll[];
  lastClickedValue: number | null;
  robberMarks: Record<number, boolean>;
  isRobberMode: boolean;
  robberEmoji: string;
  addRoll: (value: number) => void;
  undoLastRoll: () => void;
  clearRolls: () => void;
  getRollCounts: () => Record<number, { normal: number; robber: number }>;
  toggleRobberMark: (value: number) => void;
  setRobberMode: (mode: boolean) => void;
  clearRobberMarks: () => void;
  setRobberEmoji: (emoji: string) => void;
}

export const useDiceStore = create<DiceStore>()(
  persist(
    (set, get) => ({
      rolls: [],
      lastClickedValue: null,
      robberMarks: {},
      isRobberMode: false,
      robberEmoji: '🍆',

      addRoll: (value: number) => {
        set((state) => ({
          rolls: [...state.rolls, { value, wasRobberActive: !!state.robberMarks[value] }],
          lastClickedValue: value,
        }));
      },

      undoLastRoll: () => {
        set((state) => {
          if (state.rolls.length === 0) return state;

          const newRolls = state.rolls.slice(0, -1);
          const newLastClicked = newRolls.length > 0
            ? newRolls[newRolls.length - 1].value
            : null;

          return {
            rolls: newRolls,
            lastClickedValue: newLastClicked,
          };
        });
      },

      clearRolls: () => {
        set({ rolls: [], lastClickedValue: null });
      },

      toggleRobberMark: (value: number) => {
        set((state) => {
          // If clicking the number that already has the robber, remove it
          if (state.robberMarks[value]) {
            return {
              robberMarks: {
                ...state.robberMarks,
                [value]: false,
              },
            };
          }

          // Otherwise, clear all robber marks and set only this one
          const newMarks: Record<number, boolean> = {};
          for (let i = 2; i <= 12; i++) {
            newMarks[i] = i === value;
          }
          return { robberMarks: newMarks };
        });
      },

      setRobberMode: (mode: boolean) => {
        set({ isRobberMode: mode });
      },

      clearRobberMarks: () => {
        set({ robberMarks: {} });
      },

      setRobberEmoji: (emoji: string) => {
        set({ robberEmoji: emoji });
      },

      getRollCounts: () => {
        const rolls = get().rolls;
        const counts: Record<number, { normal: number; robber: number }> = {};

        // Initialize counts for 2-12
        for (let i = 2; i <= 12; i++) {
          counts[i] = { normal: 0, robber: 0 };
        }

        // Count each roll, separating normal vs robber rolls
        rolls.forEach((roll) => {
          if (roll.value >= 2 && roll.value <= 12) {
            if (roll.wasRobberActive) {
              counts[roll.value].robber++;
            } else {
              counts[roll.value].normal++;
            }
          }
        });

        return counts;
      },
    }),
    {
      name: 'dice-rolls-storage',
      version: 1,
      migrate: (persistedState: any, version: number) => {
        // Migration for version 0 to 1: convert old number[] rolls to Roll[] format
        if (version === 0) {
          const state = persistedState as any;
          if (state.rolls && Array.isArray(state.rolls)) {
            // Check if rolls are in old format (just numbers)
            if (state.rolls.length > 0 && typeof state.rolls[0] === 'number') {
              state.rolls = state.rolls.map((roll: number) => ({
                value: roll,
                wasRobberActive: false,
              }));
            }
          }
        }
        return persistedState;
      },
    }
  )
);
