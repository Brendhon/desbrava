'use client';

import { Activity } from '@/lib/types';
import { parsePtBrToDate } from '@/lib/utils';
import { Calendar, Clock, MapPin, TrendingUp } from 'lucide-react';

interface ItineraryStatsProps {
  activities: Activity[];
  tripStartDate?: string;
  tripEndDate?: string;
}

export function ItineraryStats({ 
  activities, 
  tripStartDate, 
  tripEndDate 
}: ItineraryStatsProps) {
  if (activities.length === 0) return null;

  const totalActivities = activities.length;
  const uniqueDates = new Set(activities.map(a => a.startDate)).size;
  
  // Calculate total duration
  const totalDuration = activities.reduce((total, activity) => {
    const start = parsePtBrToDate(activity.startTime);
    const end = parsePtBrToDate(activity.endTime);
    if (!start || !end) return total;
    const duration = end.getTime() - start.getTime();
    return total + duration;
  }, 0);
  
  const totalHours = Math.round(totalDuration / (1000 * 60 * 60));
  
  // Group by type
  const activitiesByType = activities.reduce((acc, activity) => {
    acc[activity.type] = (acc[activity.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const mostCommonType = Object.entries(activitiesByType)
    .sort(([,a], [,b]) => b - a)[0];

  // Calculate trip coverage if dates are provided
  let tripCoverage = 0;
  if (tripStartDate && tripEndDate) {
    const tripStart = parsePtBrToDate(tripStartDate);
    const tripEnd = parsePtBrToDate(tripEndDate);
    if (!tripStart || !tripEnd) return 0;
    const tripDays = Math.ceil((tripEnd.getTime() - tripStart.getTime()) / (1000 * 60 * 60 * 24));
    tripCoverage = Math.round((uniqueDates / tripDays) * 100);
  }

  return (
    <div className={styles.container}>
      <h4 className={styles.title}>Estatísticas do Itinerário</h4>
      
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <Calendar className={styles.icon} />
          </div>
          <div className={styles.statContent}>
            <span className={styles.statValue}>{totalActivities}</span>
            <span className={styles.statLabel}>Atividades</span>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <MapPin className={styles.icon} />
          </div>
          <div className={styles.statContent}>
            <span className={styles.statValue}>{uniqueDates}</span>
            <span className={styles.statLabel}>Dias com atividades</span>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <Clock className={styles.icon} />
          </div>
          <div className={styles.statContent}>
            <span className={styles.statValue}>{totalHours}h</span>
            <span className={styles.statLabel}>Tempo total</span>
          </div>
        </div>

        {tripCoverage > 0 && (
          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <TrendingUp className={styles.icon} />
            </div>
            <div className={styles.statContent}>
              <span className={styles.statValue}>{tripCoverage}%</span>
              <span className={styles.statLabel}>Cobertura da viagem</span>
            </div>
          </div>
        )}
      </div>

      {mostCommonType && (
        <div className={styles.typeBreakdown}>
          <h5 className={styles.breakdownTitle}>Distribuição por Tipo</h5>
          <div className={styles.typeBars}>
            {Object.entries(activitiesByType).map(([type, count]) => (
              <div key={type} className={styles.typeBar}>
                <div className={styles.typeInfo}>
                  <span className={styles.typeName}>{type}</span>
                  <span className={styles.typeCount}>{count}</span>
                </div>
                <div className={styles.barContainer}>
                  <div 
                    className={styles.bar} 
                    style={{ 
                      width: `${(count / totalActivities) * 100}%`,
                      backgroundColor: getTypeColor(type)
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function getTypeColor(type: string): string {
  const colors: Record<string, string> = {
    accommodation: '#3b82f6', // blue-500
    transportation: '#10b981', // emerald-500
    food: '#f59e0b', // amber-500
    leisure: '#8b5cf6', // violet-500
    other: '#6b7280', // gray-500
  };
  return colors[type] || '#6b7280';
}

const styles = {
  container: 'bg-slate-dark rounded-lg border border-slate-dark/20 p-4 sm:p-6 space-y-6',
  title: 'text-lg font-semibold text-parchment-white',
  statsGrid: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4',
  statCard: 'flex items-center gap-3 p-3 bg-midnight-blue rounded-lg',
  statIcon: 'w-10 h-10 bg-royal-purple rounded-lg flex items-center justify-center',
  icon: 'w-5 h-5 text-parchment-white',
  statContent: 'flex flex-col',
  statValue: 'text-xl font-bold text-parchment-white',
  statLabel: 'text-xs text-mist-gray',
  typeBreakdown: 'space-y-4',
  breakdownTitle: 'text-md font-medium text-parchment-white',
  typeBars: 'space-y-3',
  typeBar: 'space-y-2',
  typeInfo: 'flex items-center justify-between text-sm',
  typeName: 'text-mist-gray capitalize',
  typeCount: 'text-parchment-white font-medium',
  barContainer: 'w-full bg-slate-dark/40 rounded-full h-2',
  bar: 'h-2 rounded-full transition-all duration-300',
};
