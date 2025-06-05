'use client'
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import styles from './page.module.css'
import RequireAuth from '@/app/components/RequireAuth';
import Navbar from '@/app/components/Navbar/Navbar';
import Workspace from '@/app/components/Workspace/Workspace';
import LoaderScreen from '@/app/components/LoaderScreen/LoaderScreen';
import { ProblemData } from '@/types/problem';

const ProblemPage: React.FC = () => {
    const params = useParams();
    const [problemData, setProblemData] = useState<ProblemData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchingRef = useRef(false);
    const currentArenaRef = useRef<string | null>(null);

    useEffect(() => {
        const arena = params.arena as string;
        if (fetchingRef.current || currentArenaRef.current === arena) {
            return;
        }

        const fetchProblemData = async () => {
            try {
                fetchingRef.current = true;
                currentArenaRef.current = arena;
                setLoading(true);
                setError(null);
                
                const response = await fetch(`/api/problem?arena=${arena}`);
                
                if (!response.ok) {
                    throw new Error('Failed to fetch problem data');
                }
                
                const data = await response.json();
                setProblemData(data);
            } catch (err) {
                console.error('Error fetching problem:', err);
                setError('Failed to load problem data');
            } finally {
                setLoading(false);
                fetchingRef.current = false;
            }
        };

        if (params.arena) {
            fetchProblemData();
        }

        return () => {
            fetchingRef.current = false;
        };
    }, [params.arena]);

    if (loading) {
        return <LoaderScreen/>
    }

    if (error || !problemData) {
        return (
            <RequireAuth>
                <div className={`${styles["problem-page-wrapper"]}`}>
                    <div className={`${styles["navbar"]}`}>
                        <Navbar problemPage={true}/>
                    </div>
                    <div className={`${styles["workspace-container"]} flex-row align-items-center justify-content-center`}>
                        <div>Error: {error || 'Problem not found'}</div>
                    </div>
                </div>
            </RequireAuth>
        );
    }

    return (
        <RequireAuth>
            <div className={`${styles["problem-page-wrapper"]}`}>
                <div className={`${styles["navbar"]}`}>
                    <Navbar problemPage={true}/>
                </div>
                <div className={`${styles["workspace-container"]}`}>
                    <Workspace problemData={problemData} />
                </div>
            </div>
        </RequireAuth>
    )
}

export default ProblemPage;