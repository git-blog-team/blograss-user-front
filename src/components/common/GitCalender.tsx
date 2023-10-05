import { useEffect, useState } from 'react';
import GitHubCalendar from 'react-github-calendar';

export default function GitCalender({ userId }: { userId: string }) {
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, []);
    return (
        isMounted && (
            <GitHubCalendar
                username={userId}
                labels={{
                    totalCount: 'Learn how we count contributions',
                }}
                showWeekdayLabels
                blockSize={13}
                style={{
                    height: '18rem',
                    width: '90rem',
                }}
            />
        )
    );
}
