import { useReducer, useEffect } from "react";
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { db } from "../config/firebase";
import { useUserAuth } from "../context/UserAuthContext"

// Action types
const FETCH_LEADERBOARD_SUCCESS = "FETCH_LEADERBOARD_SUCCESS";
const FETCH_LEADERBOARD_FAILURE = "FETCH_LEADERBOARD_FALIURE";

// Reducer function
const streakReducer = (state, action) => {
    switch (action.type) {
        case FETCH_LEADERBOARD_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                leaderboard: action.payload.leaderboardArray,
                currentRank: action.payload.currentRank
            };
        case FETCH_LEADERBOARD_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
};

// Initial state
const initialState = {
    leaderboard: [],
    loading: true,
    error: null,
    currentRank: 0
};

const useLeaderboard = (userId) => {
    const { user } = useUserAuth();
    const [state, dispatch] = useReducer(streakReducer, initialState);

    useEffect(() => {
        const streaksRef = collection(db, "streaks");

        const q = query(streaksRef, where("isRunning", "==", true));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            let leaderboardArray = []

            if (!snapshot.empty) {
                snapshot.forEach((docSnap) => {
                    const doc = docSnap.data();
                    leaderboardArray.push(doc)
                });

                leaderboardArray.sort((a, b) => {

                    const d1 = new Date(a.start.seconds * 1000);
                    const d2 = new Date(b.start.seconds * 1000);

                    if (d1 == d2)
                        return b.lastStreak - a.lastStreak;
                    else {
                        return d1 - d2;
                    }
                });

                let currentRank = 0;

                leaderboardArray.map((obj, idx) => {
                    if (obj.userId === user.uid) {
                        currentRank = idx + 1;
                    }
                })

                dispatch({ type: FETCH_LEADERBOARD_SUCCESS, payload: { leaderboardArray, currentRank } });
            } else {
                dispatch({ type: FETCH_LEADERBOARD_FAILURE, payload: "No Streaks!" });
            }
        }, (error) => {
            dispatch({ type: FETCH_LEADERBOARD_FAILURE, payload: error });
        });

        return unsubscribe;
    }, [userId]);

    return state;
};

export default useLeaderboard;
