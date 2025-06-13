import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Alert, ImageSourcePropType } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Goal = {
    amount: number;
    title: string;
    increment: number;
    trackedAmount: number;
    dullImage: ImageSourcePropType;
    colorImage: ImageSourcePropType;
};

type GoalContextType = {
    goals: Goal[];
    addGoal: (goal: Goal) => void;
    removeGoal: (indexToRemove: number) => void;
    updateTrackedAmount: (indexToUpdate: number, newAmount: number) => void;
};

const GoalContext = createContext<GoalContextType | undefined>(undefined);


export const GoalProvider = ({ children }: { children: ReactNode }) => {
    const [goals, setGoals] = useState<Goal[]>([]);

    // ⬇ AsyncStorage functions:
    useEffect(() => {
        const loadGoals = async () => {
            try {
                const json = await AsyncStorage.getItem('userGoals');
                if (json) {
                    const savedGoals = JSON.parse(json);
                    setGoals(savedGoals);
                }
            } catch (e) {
                console.error('Failed to load goals', e);
            }
        };

        loadGoals();
    }, []);
    useEffect(() => {
        const saveGoals = async () => {
            try {
                await AsyncStorage.setItem('userGoals', JSON.stringify(goals));
            } catch (e) {
                console.error('Failed to save goals', e);
            }
        };

        saveGoals();
    }, [goals]);

    // ⬇ Goal manipulation functions:
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
    const updateTrackedAmount = (indexToUpdate: number, newAmount: number) => {
        setGoals(prevGoals => {
            const updatedGoals = [...prevGoals];
            updatedGoals[indexToUpdate] = {
                ...updatedGoals[indexToUpdate],
                trackedAmount: newAmount,
            };
            return updatedGoals;
        });
    };

    return (
        <GoalContext.Provider value={{ goals, addGoal, removeGoal, updateTrackedAmount }}>
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