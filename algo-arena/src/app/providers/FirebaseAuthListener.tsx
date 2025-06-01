'use client';
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/slices/authSlice";
import { AuthUser } from "../redux/slices/authSlice";
import { AppDispatch } from "../redux/store";
import { auth } from "../firebase/firebase";

export default function FirebaseAuthListener({ children }: { children: React.ReactNode }) {
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        const unsub = onAuthStateChanged(auth, user => {
            if (user) {
                const safeUser: AuthUser = {
                    uid: user.uid,
                    email: user.email || '',
                    displayName: user.displayName || 'user'
                };
                dispatch(setUser(safeUser));
            } else {
                dispatch(setUser(null));
            }
        });

        return () => unsub();
    }, [dispatch]);

    return <>{ children }</>
}