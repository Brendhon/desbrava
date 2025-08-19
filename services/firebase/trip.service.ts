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
  limit,
  QueryConstraint,
} from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { Trip } from '@/lib/types/trip';

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
      orderBy('startDate', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const trips: Trip[] = [];
    
    querySnapshot.forEach((doc) => {
      trips.push({
        id: doc.id,
        ...doc.data()
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
        ...tripSnap.data()
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
    startDate?: string;
    endDate?: string;
    country?: string;
  }
): Promise<Trip[]> {
  try {
    const tripsRef = collection(db, COLLECTION_NAME);
    const constraints: QueryConstraint[] = [
      where('user', '==', userEmail)
    ];
    
    // Add filters if provided
    if (filters?.startDate) {
      constraints.push(where('startDate', '>=', filters.startDate));
    }
    
    if (filters?.endDate) {
      constraints.push(where('endDate', '<=', filters.endDate));
    }
    
    if (filters?.country) {
      constraints.push(where('country.code', '==', filters.country));
    }
    
    const q = query(tripsRef, ...constraints, orderBy('startDate', 'desc'));
    const querySnapshot = await getDocs(q);
    
    let trips: Trip[] = [];
    querySnapshot.forEach((doc) => {
      trips.push({
        id: doc.id,
        ...doc.data()
      } as Trip);
    });
    
    // Filter by search term if provided
    if (searchTerm) {
      trips = trips.filter(trip => 
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
      updatedAt: new Date().toISOString()
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
export async function updateTrip(tripId: string, updates: Partial<Trip>): Promise<void> {
  try {
    const tripRef = doc(db, COLLECTION_NAME, tripId);
    await updateDoc(tripRef, {
      ...updates,
      updatedAt: new Date().toISOString()
    });
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
    const tripRef = doc(db, COLLECTION_NAME, tripId);
    await deleteDoc(tripRef);
  } catch (error) {
    console.error('Error deleting trip:', error);
    throw new Error('Failed to delete trip');
  }
}

/**
 * Get trips with pagination
 */
export async function getTripsPaginated(
  userEmail: string, 
  page: number = 1, 
  pageSize: number = 10
): Promise<{ trips: Trip[]; total: number; hasMore: boolean }> {
  try {
    const tripsRef = collection(db, COLLECTION_NAME);
    const q = query(
      tripsRef,
      where('user', '==', userEmail),
      orderBy('startDate', 'desc'),
      limit(pageSize * page)
    );
    
    const querySnapshot = await getDocs(q);
    const trips: Trip[] = [];
    
    querySnapshot.forEach((doc) => {
      trips.push({
        id: doc.id,
        ...doc.data()
      } as Trip);
    });
    
    // Calculate pagination info
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedTrips = trips.slice(startIndex, endIndex);
    
    return {
      trips: paginatedTrips,
      total: trips.length,
      hasMore: trips.length > endIndex
    };
  } catch (error) {
    console.error('Error fetching paginated trips:', error);
    throw new Error('Failed to fetch paginated trips');
  }
}
