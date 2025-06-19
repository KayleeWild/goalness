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
    streak: number;
    didCompleteToday: boolean;
};

const GoalContext = createContext<GoalContextType | undefined>(undefined);


export const GoalProvider = ({ children }: { children: ReactNode }) => {
    const [ goals, setGoals ] = useState<Goal[]>([]);
    const [ streak, setStreak ] = useState(0);
    const [ didCompleteToday, setDidCompleteToday ] = useState(false);
    const [ lastCheckDate, setLastCheckDate ] = useState('');
    const getToday = () => new Date().toISOString().split('T')[0];

    // ⬇ AsyncStorage functions:
    // Load app data (streak and goals)
    useEffect(() => {
        const loadData = async () => {
            try {
                const [goalsJson, streakJson, completeJson, dateJson] = await Promise.all([
                    AsyncStorage.getItem('userGoals'),
                    AsyncStorage.getItem('userStreak'),
                    AsyncStorage.getItem('didCompleteToday'),
                    AsyncStorage.getItem('lastCheckDate')
                ]);

                const today = getToday();
                let savedDate = dateJson || '';
                const isNewDay = savedDate !== today;

                let loadedGoals: Goal[] = goalsJson ? JSON.parse(goalsJson) : [];
                let loadedStreak = streakJson ? Number(streakJson) : 0;
                let loadedComplete = completeJson === 'true';

                if (isNewDay) {
                    if (loadedComplete) {
                        loadedStreak += 1;
                    } else {
                        loadedStreak = 0;
                    }
                    loadedComplete = false;
                    savedDate = today;

                    loadedGoals = loadedGoals.map((goal: Goal) => ({
                        ...goal,
                        trackedAmount: 0
                    }));

                    await Promise.all([
                        AsyncStorage.setItem('userGoals', JSON.stringify(loadedGoals)),
                        AsyncStorage.setItem('userStreak', loadedStreak.toString()),
                        AsyncStorage.setItem('didCompleteToday', 'false'),
                        AsyncStorage.setItem('lastCheckDate', today),
                    ]);
                }

                setGoals(loadedGoals);
                setStreak(loadedStreak);
                setDidCompleteToday(loadedComplete);
                setLastCheckDate(savedDate);

            } catch (e) {
                console.error('Failed to load or initialize streak data', e);
            }
        };

        loadData();
    }, []);

    // Save goals whenever they change
    useEffect(() => {
        AsyncStorage.setItem('userGoals', JSON.stringify(goals));
    }, [goals]);

    useEffect(() => {
        AsyncStorage.setItem('userStreak', streak.toString());
    }, [streak]);

    useEffect(() => {
        AsyncStorage.setItem('didCompleteToday', didCompleteToday.toString());
    }, [didCompleteToday]);

    useEffect(() => {
        AsyncStorage.setItem('lastCheckDate', lastCheckDate);
    }, [lastCheckDate]);


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
            const goal = updatedGoals[indexToUpdate];

            updatedGoals[indexToUpdate] = {
                ...goal,
                trackedAmount: newAmount,
            };
            // only update streak if goal stays completed
            const anyCompleted = updatedGoals.some(g => g.trackedAmount >= g.amount);
            setDidCompleteToday(anyCompleted);
            return updatedGoals;
        });
    };


    return (
        <GoalContext.Provider value={{ goals, addGoal, removeGoal, updateTrackedAmount, streak, didCompleteToday }}>
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