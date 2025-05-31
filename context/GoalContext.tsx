import React, { createContext, useState, useContext, ReactNode } from 'react';

type Goal = {
    amount: number;
    type: string;
};

type GoalContextType = {
    goals: Goal[];
    addGoal: (goal: Goal) => void;
};

const GoalContext = createContext<GoalContextType | undefined>(undefined);

export const GoalProvider = ({ children }: { children: ReactNode }) => {
    const [goals, setGoals] = useState<Goal[]>([]);

    const addGoal = (goal: Goal) => {
        setGoals(prev => [...prev, goal]);
    };

    return (
        <GoalContext.Provider value={{ goals, addGoal }}>
            {children}
        </GoalContext.Provider>
    );
};

export const useGoalContext = (): GoalContextType => {
    const context = useContext(GoalContext);
    if (!context) {
        throw new Error('useGoalContext must be used within a GoalProvider');
    }
    return context;
}