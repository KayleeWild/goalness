import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Alert } from 'react-native';

type Goal = {
    amount: number;
    type: string;
};

type GoalContextType = {
    goals: Goal[];
    addGoal: (goal: Goal) => void;
    removeGoal: (indexToRemove: number) => void;
};

const GoalContext = createContext<GoalContextType | undefined>(undefined);


export const GoalProvider = ({ children }: { children: ReactNode }) => {
    const [goals, setGoals] = useState<Goal[]>([]);

    const addGoal = (goal: Goal) => {
        setGoals(prev => [...prev, goal]);
    };
    const removeGoal = (indexToRemove: number) => {
        Alert.alert("Are you sure you want to delete this goal?", "This action cannot be undone", 
            [
            {
                text: 'Delete Goal',
                onPress: () => setGoals(prev => prev.filter((_, index) => index !== indexToRemove)),
            },
            {
                text: 'Cancel',
                style: 'cancel'
            }
        ]);
    };

    return (
        <GoalContext.Provider value={{ goals, addGoal, removeGoal }}>
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