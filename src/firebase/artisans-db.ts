import { db } from "./client";
import { Artisan, ArtisanType, ArtisanConverter } from "@/models/Artisan";
import { collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, setDoc } from "firebase/firestore";

const addArtisan = async (artisan: ArtisanType) => {
    const artisanRef = doc(collection(db, "artisans")).withConverter(new ArtisanConverter());
    await setDoc(artisanRef, artisan);
    return artisanRef.id;
}

const getArtisan = async (uid: string) => {
    const artisanRef = doc(db, "artisans", uid).withConverter(new ArtisanConverter());
    const artisanDoc = await getDoc(artisanRef);
    return artisanDoc.data();
}
//TODO imlement condtional query limit
const getArtisans = async () => {
    const q = query(collection(db, 'artisans'), orderBy("createdAt"), /*limit(25)*/).withConverter(new ArtisanConverter());
    const { docs } = await getDocs(q);
    const data: Artisan[] = docs.map((doc) => doc.data());
    return data;
}

const updateArtisan = async (artisan: ArtisanType) => {
    if (!artisan.uid) return;
    const artisanRef = doc(db, "artisans", artisan.uid).withConverter(new ArtisanConverter());
    await setDoc(artisanRef, artisan, { merge: true });
    return artisanRef.id;
}

// TODO implement logical delete
const deleteArtisan = async (uid: string) => deleteDoc(doc(db, "artisans", uid));

export { addArtisan, getArtisan, getArtisans, updateArtisan, deleteArtisan };

