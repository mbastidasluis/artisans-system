
import { useEffect, useState } from 'react'
import { collection, getDocs, query, limit, where, orderBy, startAfter, endBefore, Timestamp, FieldValue } from 'firebase/firestore';
import { db } from '@/firebase/client';
import { Artisan } from '@/models/Artisan';


export default function ArtisanForm({ artisan }: { artisan?: Artisan }) {

    const [profile, setProfile] = useState<Artisan | undefined>(artisan);

    return (
        <div>
            <h1>Artisan</h1>
     
     
        </div>
    )
}   