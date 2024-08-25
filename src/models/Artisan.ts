import { FieldValue, QueryDocumentSnapshot, serverTimestamp, SnapshotOptions, Timestamp } from 'firebase/firestore';
import { DateTime } from 'luxon'

export class Artisan {
    uid?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    identityDocumentNumber?: string;
    taxDocumentNumber?: string;
    livingAddress?: string;
    workingAddress?: string;
    // dates
    createdAt?: Timestamp | FieldValue;
    createdAtAux?: DateTime | FieldValue;
    createdDate?: string;
    createdTime?: string;

    constructor({
        uid,
        firstName,
        lastName,
        email,
        identityDocumentNumber,
        taxDocumentNumber,
        livingAddress,
        workingAddress,
        createdAt,
        createdAtAux,
        createdDate,
        createdTime,
    }: Artisan) {
        this.uid = uid;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.identityDocumentNumber = identityDocumentNumber;
        this.taxDocumentNumber = taxDocumentNumber;
        this.livingAddress = livingAddress;
        this.workingAddress = workingAddress;
        // dates
        this.createdAt = createdAt;
        this.createdAtAux = createdAtAux;
        this.createdDate = createdDate;
        this.createdTime = createdTime;

    }

    static converter: any = {
        toFirestore: (artisan: Artisan) => {
            const toFirestoreData: Artisan = {
                firstName: artisan.firstName,
                lastName: artisan.lastName,
                email: artisan.email,
                identityDocumentNumber: artisan.identityDocumentNumber,
                taxDocumentNumber: artisan.taxDocumentNumber,
                livingAddress: artisan.livingAddress,
                workingAddress: artisan.workingAddress,
            };
            if (!artisan.createdAt) {
                toFirestoreData.createdAt = serverTimestamp();
            }
            return toFirestoreData;
        },
        fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions) => {
            const artisan = snapshot.data(options)
            const createdAtAux = DateTime.fromJSDate(artisan.createdAt.toDate(), { zone: 'America/Caracas', }).setLocale('es');
            const finalArtisan = new Artisan({
                uid: snapshot.id,
                createdAtAux,
                firstName: artisan.firstName,
                lastName: artisan.lastName,
                email: artisan.email,
                identityDocumentNumber: artisan.identityDocumentNumber,
                taxDocumentNumber: artisan.taxDocumentNumber,
                livingAddress: artisan.livingAddress,
                workingAddress: artisan.workingAddress,
                createdAt: artisan.createdAt,
                createdDate: createdAtAux.toLocaleString(DateTime.DATE_SHORT),
                createdTime: createdAtAux.toLocaleString(DateTime.TIME_24_WITH_SECONDS),
            });
            return finalArtisan
        }
    }

    toString() {
        return this.firstName + ', ' + this.lastName;
    }
}