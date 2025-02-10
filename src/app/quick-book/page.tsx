'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';


export default function QuickBookPage() {
    const router = useRouter();

    useEffect(() => {
        router.push('/quick-book/location');
    }, [router]);

    return null;
} 