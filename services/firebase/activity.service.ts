import { db } from '@/lib/firebase/config';
import {
  Activity,
  CreateActivityData,
  UpdateActivityData,
} from '@/lib/types/activity';
import { getTimestampWithTime } from '@/lib/utils';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  QueryConstraint,
  updateDoc,
  where,
} from 'firebase/firestore';

const COLLECTION_NAME = 'activities';

const getPath = (tripId: string) => `trip/${tripId}/${COLLECTION_NAME}`;

/**
 * Get all activities for a specific trip
 */
export async function getTripActivities(tripId: string): Promise<Activity[]> {
  try {
    const activitiesRef = collection(db, getPath(tripId));
    const q = query(
      activitiesRef,
      where('tripId', '==', tripId),
      orderBy('startAt', 'asc')
    );

    const querySnapshot = await getDocs(q);
    const activities: Activity[] = [];

    querySnapshot.forEach((doc) => {
      activities.push({
        id: doc.id,
        ...doc.data(),
      } as Activity);
    });

    return activities;
  } catch (error) {
    console.error('Error fetching trip activities:', error);
    throw new Error('Failed to fetch trip activities');
  }
}

/**
 * Get a specific activity by ID
 */
export async function getActivityById(
  tripId: string,
  activityId: string
): Promise<Activity | null> {
  try {
    const activityRef = doc(db, getPath(tripId), activityId);
    const activitySnap = await getDoc(activityRef);

    if (activitySnap.exists()) {
      return {
        id: activitySnap.id,
        ...activitySnap.data(),
      } as Activity;
    }

    return null;
  } catch (error) {
    console.error('Error fetching activity:', error);
    throw new Error('Failed to fetch activity');
  }
}

/**
 * Search activities by various criteria within a trip
 */
export async function searchTripActivities(
  tripId: string,
  searchTerm?: string,
  filters?: {
    type?: string;
    subType?: string;
    startDate?: string;
    endDate?: string;
  }
): Promise<Activity[]> {
  try {
    const activitiesRef = collection(db, getPath(tripId));
    const constraints: QueryConstraint[] = [where('tripId', '==', tripId)];

    // Add filters if provided
    if (filters?.type) {
      constraints.push(where('type', '==', filters.type));
    }

    if (filters?.subType) {
      constraints.push(where('subType', '==', filters.subType));
    }

    if (filters?.startDate) {
      constraints.push(where('startDate', '>=', filters.startDate));
    }

    if (filters?.endDate) {
      constraints.push(where('endDate', '<=', filters.endDate));
    }

    const q = query(
      activitiesRef,
      ...constraints,
      orderBy('startAt', 'asc')
    );
    const querySnapshot = await getDocs(q);
    const activities: Activity[] = [];

    querySnapshot.forEach((doc) => {
      activities.push({
        id: doc.id,
        ...doc.data(),
      } as Activity);
    });

    // If search term is provided, filter by description or place name
    if (searchTerm) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      return activities.filter(
        (activity) =>
          activity.description?.toLowerCase().includes(lowerSearchTerm) ||
          activity.place.displayName.text
            .toLowerCase()
            .includes(lowerSearchTerm) ||
          activity.place.formattedAddress
            .toLowerCase()
            .includes(lowerSearchTerm)
      );
    }

    return activities;
  } catch (error) {
    console.error('Error searching trip activities:', error);
    throw new Error('Failed to search trip activities');
  }
}

/**
 * Create a new activity
 */
export async function createActivity(
  tripId: string,
  activityData: CreateActivityData
): Promise<string> {
  try {
    const activitiesRef = collection(db, getPath(tripId));
    const now = new Date().toISOString();

    // Get startAt and endAt
    const startAt = getTimestampWithTime(activityData.startDate, activityData.startTime);
    const endAt = getTimestampWithTime(activityData.endDate, activityData.endTime);

    // Create new activity
    const newActivity = {
      ...activityData,
      tripId,
      createdAt: now,
      updatedAt: now,
      startAt,
      endAt,
    };

    const docRef = await addDoc(activitiesRef, newActivity);
    return docRef.id;
  } catch (error) {
    console.error('Error creating activity:', error);
    throw new Error('Failed to create activity');
  }
}



/**
 * Update an existing activity
 */
export async function updateActivity(
  tripId: string,
  activityId: string,
  updateData: UpdateActivityData
): Promise<void> {
  try {
    // Get activity reference
    const activityRef = doc(db, getPath(tripId), activityId);

    // Get updatedAt
    const updatedAt = new Date().toISOString();

    // Calculate startAt and endAt
    const startAt = getTimestampWithTime(updateData.startDate, updateData.startTime);
    const endAt = getTimestampWithTime(updateData.endDate, updateData.endTime);

    // Create update data
    const updateDataWithDates = { ...updateData, updatedAt };

    // If has startAt, set startAt
    if (startAt) updateDataWithDates.startAt = startAt;

    // If has endAt, set endAt
    if (endAt) updateDataWithDates.endAt = endAt;

    // Update activity
    await updateDoc(activityRef, updateDataWithDates);
  } catch (error) {
    console.error('Error updating activity:', error);
    throw new Error('Failed to update activity');
  }
}

/**
 * Delete an activity
 */
export async function deleteActivity(
  tripId: string,
  activityId: string
): Promise<void> {
  try {
    const activityRef = doc(db, getPath(tripId), activityId);
    await deleteDoc(activityRef);
  } catch (error) {
    console.error('Error deleting activity:', error);
    throw new Error('Failed to delete activity');
  }
}

/**
 * Get activities by type for a specific trip
 */
export async function getTripActivitiesByType(
  tripId: string,
  type: string
): Promise<Activity[]> {
  try {
    const activitiesRef = collection(db, getPath(tripId));
    const q = query(
      activitiesRef,
      where('tripId', '==', tripId),
      where('type', '==', type),
      orderBy('startAt', 'asc')
    );

    const querySnapshot = await getDocs(q);
    const activities: Activity[] = [];

    querySnapshot.forEach((doc) => {
      activities.push({
        id: doc.id,
        ...doc.data(),
      } as Activity);
    });

    return activities;
  } catch (error) {
    console.error('Error fetching activities by type:', error);
    throw new Error('Failed to fetch activities by type');
  }
}

/**
 * Get the last activity for a specific trip (sorted by startDate)
 */
export async function getLastActivity(
  tripId: string
): Promise<Activity | null> {
  try {
    const activitiesRef = collection(db, getPath(tripId));
    const q = query(
      activitiesRef,
      where('tripId', '==', tripId),
      orderBy('startAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    const activities: Activity[] = [];

    querySnapshot.forEach((doc) => {
      activities.push({
        id: doc.id,
        ...doc.data(),
      } as Activity);
    });

    return activities?.[0] || null;
  } catch (error) {
    console.error('Error fetching last activity:', error);
    throw new Error('Failed to fetch last activity');
  }
}
