import { FieldValue, FirestoreDataConverter, QueryDocumentSnapshot, serverTimestamp, SnapshotOptions, Timestamp, WithFieldValue } from 'firebase/firestore';

export interface ArtisanType {
    uid?: string,
    firstName?: string,
    lastName?: string,
    email?: string,
    phoneNumber?: string,
    identityDocumentNumber?: string,
    taxDocumentNumber?: string,
    livingAddress?: string,
    workingAddress?: string,
    createdAt?: number,
}

export class Artisan {
    uid: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    identityDocumentNumber: string;
    taxDocumentNumber: string;
    livingAddress: string;
    workingAddress: string;
    // dates
    createdAt: number;

    // dateOfBirth?: DateTime | FieldValue;
    // dateOfBirthAux?: DateTime | FieldValue;
    // dateOfBirthDate: string;

    constructor({
        uid,
        firstName,
        lastName,
        email,
        phoneNumber,
        identityDocumentNumber,
        taxDocumentNumber,
        livingAddress,
        workingAddress,
        createdAt,
    }: ArtisanType) {
        this.uid = uid || '';
        this.firstName = firstName || '';
        this.lastName = lastName || '';
        this.email = email || '';
        this.phoneNumber = phoneNumber || '';
        this.identityDocumentNumber = identityDocumentNumber || '';
        this.taxDocumentNumber = taxDocumentNumber || '';
        this.livingAddress = livingAddress || '';
        this.workingAddress = workingAddress || '';
        // dates
        this.createdAt = createdAt ?? 0;
    }

    toString() {
        return this.firstName + ', ' + this.lastName;
    }
}

interface ArtisanDbModel {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    identityDocumentNumber: string;
    taxDocumentNumber: string;
    livingAddress: string;
    workingAddress: string;
    createdAt: Timestamp | FieldValue;
    // dateOfBirth: DateTime | FieldValue;
    // dateOfBirthAux: DateTime | FieldValue;
    // dateOfBirthDate: string;
}

export class ArtisanConverter implements FirestoreDataConverter<Artisan, ArtisanDbModel> {

    toFirestore(artisan: WithFieldValue<Artisan>): WithFieldValue<ArtisanDbModel> {
        const toFirestoreData = {
            firstName: artisan.firstName,
            lastName: artisan.lastName,
            email: artisan.email,
            phoneNumber: artisan.phoneNumber,
            identityDocumentNumber: artisan.identityDocumentNumber,
            taxDocumentNumber: artisan.taxDocumentNumber,
            livingAddress: artisan.livingAddress,
            workingAddress: artisan.workingAddress,
            createdAt: this._createdAtDbValue(artisan.createdAt),
        };
        return toFirestoreData as ArtisanDbModel;
    }

    fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): Artisan {
        const artisan = snapshot.data(options)
        const finalArtisan = new Artisan({
            uid: snapshot.id,
            firstName: artisan.firstName,
            lastName: artisan.lastName,
            email: artisan.email,
            phoneNumber: artisan.phoneNumber,
            identityDocumentNumber: artisan.identityDocumentNumber,
            taxDocumentNumber: artisan.taxDocumentNumber,
            livingAddress: artisan.livingAddress,
            workingAddress: artisan.workingAddress,
            createdAt: artisan.createdAt.toMillis(),
            // dateOfBirthAux,
            // dateOfBirth: artisan.dateOfBirth,
            // dateOfBirthDate: artisan.dateOfBirthAux.toLocaleString(DateTime.DATE_SHORT),
        });
        return finalArtisan
    }

    _createdAtDbValue(createdAt: undefined | number | FieldValue): Timestamp | FieldValue {
        if (typeof createdAt === 'number') {
            return createdAt > 0 ? Timestamp.fromMillis(createdAt) : serverTimestamp();
        } else if (createdAt) {
            return createdAt;
        }
        return serverTimestamp();
    }
}

