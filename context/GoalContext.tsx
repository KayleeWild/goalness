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

    // ⬇ AsyncStorage functions:
    // useEffect(() => {
    //     const loadGoals = async () => {
    //         try {
    //             const json = await AsyncStorage.getItem('userGoals');
    //             if (json) {
    //                 const savedGoals = JSON.parse(json);
    //                 setGoals(savedGoals);
    //             }
    //         } catch (e) {
    //             console.error('Failed to load goals', e);
    //         }
    //     };

    //     loadGoals();
    // }, []);
    // useEffect(() => {
    //     const saveGoals = async () => {
    //         try {
    //             await AsyncStorage.setItem('userGoals', JSON.stringify(goals));
    //         } catch (e) {
    //             console.error('Failed to save goals', e);
    //         }
    //     };

    //     saveGoals();
    // }, [goals]);
    useEffect(() => {
        const loadData = async () => {
            try {
                const [goalsJson, streakJson, completeJson, dateJson] = await Promise.all([
                    AsyncStorage.getItem('userGoals'),
                    AsyncStorage.getItem('userStreak'),
                    AsyncStorage.getItem('didCompleteToday'),
                    AsyncStorage.getItem('lastCheckDate')
                ]);

                if (goalsJson) setGoals(JSON.parse(goalsJson));
                if (streakJson) setStreak(Number(streakJson));
                if (completeJson) setDidCompleteToday(completeJson === 'true');
                if (dateJson) setLastCheckDate(dateJson);
            } catch (e) {
                console.error('Failed to load streak data', e);
            }
        };

        loadData();
    }, []);
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
    useEffect(() => {
        const checkAndResetStreak = () => {
            const today = new Date().toISOString().split('T')[0];

            if (lastCheckDate !== today) {
                if (didCompleteToday) {
                    setStreak(prev => prev + 1);
                } else {
                    setStreak(0);
                }

                // Reset tracked amounts
                setGoals(prev =>
                    prev.map(goal => ({
                        ...goal,
                        trackedAmount: 0
                    }))
                );

                setDidCompleteToday(false);
                setLastCheckDate(today);
            }
        }
    }, [lastCheckDate, didCompleteToday]);




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

            if (newAmount >= goal.amount && goal.trackedAmount < goal.amount && !didCompleteToday) {
                setDidCompleteToday(true);
            }

            updatedGoals[indexToUpdate] = {
                ...goal,
                trackedAmount: newAmount,
            };
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