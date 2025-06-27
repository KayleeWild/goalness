import React, { createContext, useState, useContext, ReactNode, useEffect, useCallback } from 'react';
import { Alert, ImageSourcePropType } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Goal = {
    amount: number;
    title: string;
    increment: number;
    unit: string;
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
    completeGoalToday: (index: number) => void;
    completedIndexesToday: number[];
    hasShownStreakToday: boolean;
    setHasShownStreakToday: (val: boolean) => void;
};

const GoalContext = createContext<GoalContextType | undefined>(undefined);


export const GoalProvider = ({ children }: { children: ReactNode }) => {
    const [ goals, setGoals ] = useState<Goal[]>([]);
    const [ streak, setStreak ] = useState(0);
    const [ didCompleteToday, setDidCompleteToday ] = useState(false);
    const [ lastCheckDate, setLastCheckDate ] = useState('');
    const [completedIndexesToday, setCompletedIndexesToday] = useState<number[]>([]);
    const [hasShownStreakToday, setHasShownStreakToday] = useState(false);
    const getToday = () => new Date().toISOString().split('T')[0];
    const getYesterday = useCallback(() => {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        return yesterday.toISOString().split('T')[0];
    }, []);

    // ⬇ AsyncStorage functions:
    // Load app data (streak and goals)
    useEffect(() => {
        const loadData = async () => {
            try {
                // // Temporary code for testing date:
                // const oneWeekAgo = new Date();
                // oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
                // const lastWeekDateFormatted = oneWeekAgo.toISOString().split('T')[0];
                // await AsyncStorage.setItem('lastCheckDate', lastWeekDateFormatted);
                // console.log("TESTING: lastcheckdate set to one week ago: ", lastWeekDateFormatted);
                
                const [goalsJson, streakJson, completeJson, dateJson, shownStreakJson] = await Promise.all([
                    AsyncStorage.getItem('userGoals'),
                    AsyncStorage.getItem('userStreak'),
                    AsyncStorage.getItem('didCompleteToday'),
                    AsyncStorage.getItem('lastCheckDate'),
                    AsyncStorage.getItem('hasShownStreakToday'),
                ]);

                // AsyncStorage.setItem('userStreak', '0') // Toggle if you need to reset streak for testing
                const today = getToday();
                const yesterday = getYesterday();
                let savedDate = dateJson || ''; // date last checked
                const isNewDay = savedDate !== today;

                let loadedGoals: Goal[] = goalsJson ? JSON.parse(goalsJson) : [];
                let loadedStreak = streakJson ? Number(streakJson) : 0;
                let loadedComplete = completeJson === 'true'; // completed previous day?
                const loadedHasShown = shownStreakJson === 'true';
                setHasShownStreakToday(loadedHasShown)

                if (isNewDay) {
                    console.log(`New day detected! Today: ${today}, Last Check: ${savedDate}`);
                    if (!loadedComplete || savedDate < yesterday) {
                        console.log('Previous day not completed, resetting streak to 0.');
                        loadedStreak = 0;
                    } else {
                        console.log('Previous day completed, streak continues.');
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
                        AsyncStorage.setItem('hasShownStreakToday', 'false'),
                    ]);

                    setHasShownStreakToday(false);
                } else {
                    console.log(`Still same day: ${today}`);
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

    useEffect(() => {
        AsyncStorage.setItem('hasShownStreakToday', hasShownStreakToday.toString());
    }, [hasShownStreakToday]);


    // new one 🤨
    const recalculateTodayStatus = (updatedGoals: Goal[]) => {
        const anyCompleted = updatedGoals.some(g => g.trackedAmount >= g.amount);
        
        if (!anyCompleted) {
            setDidCompleteToday(false);
            setStreak(s => s - 1);
            setCompletedIndexesToday([]);
            AsyncStorage.setItem('didCompleteToday', 'false');
            AsyncStorage.setItem('userStreak', streak.toString());
            AsyncStorage.setItem('hasShownStreakToday', 'false');
            setHasShownStreakToday(false);
        } else {
            setDidCompleteToday(true); 
        }

        return anyCompleted;
    };

    // complete goal and increment streak
    const completeGoalToday = (index: number) => {
        setCompletedIndexesToday(prev => {
            if (!prev.includes(index)) {
                const updated = [...prev, index];
                if (!didCompleteToday) {
                    setStreak(s => s + 1);
                    setDidCompleteToday(true);
                }
                return updated;
            }
            return prev;
        });
    };

    // ⬇ Goal manipulation functions:
    const addGoal = (goal: Goal) => {
        setGoals(prev => [...prev, goal]);
    };
    const removeGoal = (indexToRemove: number) => {
        Alert.alert("Are you sure you want to delete this goal?", "This action cannot be undone", 
            [
            {
                text: 'Delete Goal',
                onPress: () => {
                    setGoals(prev => {
                        const updated = prev.filter((_, index) => index !== indexToRemove);
                        recalculateTodayStatus(updated);
                        return updated;
                    });

                    setCompletedIndexesToday(prev => prev.filter(i => i !== indexToRemove));
                },
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
        <GoalContext.Provider value={{ 
            goals, addGoal, removeGoal, updateTrackedAmount, 
            streak, didCompleteToday,
            completeGoalToday, completedIndexesToday,
            hasShownStreakToday, setHasShownStreakToday }}>
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