import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  orderBy,
  QueryConstraint,
  writeBatch,
} from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { Trip } from '@/lib/types/trip';
import { getTimestampWithTime } from '@/lib/utils';
import { deleteAllActivitiesByTrip } from './activity.service';

const COLLECTION_NAME = 'trip';

/**
 * Get all trips for a specific user
 */
export async function getUserTrips(userEmail: string): Promise<Trip[]> {
  try {
    const tripsRef = collection(db, COLLECTION_NAME);
    const q = query(
      tripsRef,
      where('user', '==', userEmail),
      orderBy('startAt', 'desc')
    );

    const querySnapshot = await getDocs(q);
    const trips: Trip[] = [];

    querySnapshot.forEach((doc) => {
      trips.push({
        id: doc.id,
        ...doc.data(),
      } as Trip);
    });

    return trips;
  } catch (error) {
    console.error('Error fetching user trips:', error);
    throw new Error('Failed to fetch user trips');
  }
}

/**
 * Get a specific trip by ID
 */
export async function getTripById(tripId: string): Promise<Trip | null> {
  try {
    const tripRef = doc(db, COLLECTION_NAME, tripId);
    const tripSnap = await getDoc(tripRef);

    if (tripSnap.exists()) {
      return {
        id: tripSnap.id,
        ...tripSnap.data(),
      } as Trip;
    }

    return null;
  } catch (error) {
    console.error('Error fetching trip:', error);
    throw new Error('Failed to fetch trip');
  }
}

/**
 * Search trips by various criteria
 */
export async function searchTrips(
  userEmail: string,
  searchTerm?: string,
  filters?: {
    country?: string;
  }
): Promise<Trip[]> {
  try {
    const tripsRef = collection(db, COLLECTION_NAME);
    const constraints: QueryConstraint[] = [where('user', '==', userEmail)];

    if (filters?.country) {
      constraints.push(where('country.code', '==', filters.country));
    }

    const q = query(tripsRef, ...constraints, orderBy('startAt', 'desc'));
    const querySnapshot = await getDocs(q);

    let trips: Trip[] = [];
    querySnapshot.forEach((doc) => {
      trips.push({
        id: doc.id,
        ...doc.data(),
      } as Trip);
    });

    // Filter by search term if provided
    if (searchTerm) {
      trips = trips.filter(
        (trip) =>
          trip.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          trip.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          trip.country.country.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return trips;
  } catch (error) {
    console.error('Error searching trips:', error);
    throw new Error('Failed to search trips');
  }
}

/**
 * Create a new trip
 */
export async function createTrip(tripData: Omit<Trip, 'id'>): Promise<string> {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...tripData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      startAt: getTimestampWithTime(tripData.startDate),
      endAt: getTimestampWithTime(tripData.endDate),
    });

    return docRef.id;
  } catch (error) {
    console.error('Error creating trip:', error);
    throw new Error('Failed to create trip');
  }
}

/**
 * Update an existing trip
 */
export async function updateTrip(
  tripId: string,
  updates: Partial<Trip>
): Promise<void> {
  try {
    const tripRef = doc(db, COLLECTION_NAME, tripId);

    // Get updatedAt
    const updatedAt = new Date().toISOString();

    // Get startAt and endAt
    const startAt = getTimestampWithTime(updates.startDate);
    const endAt = getTimestampWithTime(updates.endDate);

    // Create update data
    const updateData = {
      ...updates,
      updatedAt,
    };

    // If has startAt, set startAt
    if (startAt) updateData.startAt = startAt;

    // If has endAt, set endAt
    if (endAt) updateData.endAt = endAt;

    // Update trip
    await updateDoc(tripRef, updateData);
  } catch (error) {
    console.error('Error updating trip:', error);
    throw new Error('Failed to update trip');
  }
}

/**
 * Delete a trip
 */
export async function deleteTrip(tripId: string): Promise<void> {
  try {
    // Get trip reference
    const tripRef = doc(db, COLLECTION_NAME, tripId);

    // Delete activities for this trip
    await deleteAllActivitiesByTrip(tripId);

    // Delete trip
    await deleteDoc(tripRef);
  } catch (error) {
    console.error('Error deleting trip:', error);
    throw new Error('Failed to delete trip');
  }
}

/**
 * Delete all trips for a specific user using batch operations
 */
export async function deleteAllTripsByUser(userEmail: string): Promise<void> {
  try {
    // Get all trips for the user
    const tripsRef = collection(db, COLLECTION_NAME);
    const q = query(tripsRef, where('user', '==', userEmail));
    const querySnapshot = await getDocs(q);

    // No trips to delete
    if (querySnapshot.empty) {
      return;
    }

    // Use batch operations for better performance and atomicity
    const batch = writeBatch(db);

    // Promise array to delete activities
    const activitiesPromises: Promise<void>[] = [];

    // Delete all trips and activities
    querySnapshot.forEach(async (doc) => {
      // Delete activities for this trip
      activitiesPromises.push(deleteAllActivitiesByTrip(doc.id));

      // Delete trip
      batch.delete(doc.ref);
    });

    // Wait for all activities to be deleted
    await Promise.allSettled(activitiesPromises);

    // Commit the batch
    await batch.commit();
  } catch (error) {
    console.error('Error deleting all trips:', error);
    throw new Error('Failed to delete all trips');
  }
}