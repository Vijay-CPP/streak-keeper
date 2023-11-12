import { useReducer, useEffect } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../config/firebase";

// Action types
const FETCH_STREAK_SUCCESS = "FETCH_STREAK_SUCCESS";
const FETCH_STREAK_FAILURE = "FETCH_STREAK_FAILURE";

// Reducer function
const streakReducer = (state, action) => {
    switch (action.type) {
        case FETCH_STREAK_SUCCESS:
            return {
                ...state,
                streakData: action.payload,
                loading: false,
                error: null,
            };
        case FETCH_STREAK_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

// Initial state
const initialState = {
    streakId: null,
    streakData: null,
    loading: true,
    error: null,
};

const useStreak = (userId) => {
    const [state, dispatch] = useReducer(streakReducer, initialState);

    useEffect(() => {
        const streaksRef = collection(db, "streaks");
        const q = query(streaksRef, where("userId", "==", userId));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            if (!snapshot.empty) {
                snapshot.forEach((docSnap) => {
                    const doc = docSnap.data();
                    dispatch({ type: FETCH_STREAK_SUCCESS, payload: { ...doc, streakId: docSnap.id } });
                });
            } else {
                dispatch({ type: FETCH_STREAK_FAILURE, payload: "Streak does not exist!" });
            }
        }, (error) => {
            dispatch({ type: FETCH_STREAK_FAILURE, payload: error });
        });

        return unsubscribe;
    }, [userId]);

    return state;
};

export default useStreak;
