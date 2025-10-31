import { differenceInDays, subMonths, addDays, isAfter, isBefore, parseISO } from 'date-fns';

/**
 * Calculate visa stay based on Condition 8558 (12 months in 18 months rule)
 * @param {Array} travelHistory - Array of travel entries
 * @param {Date} currentDate - Current date for calculation
 * @returns {Object} Calculation results
 */
export function calculateVisaStay(travelHistory, currentDate = new Date()) {
  // 18-month window start date
  const windowStart = subMonths(currentDate, 18);
  const windowEnd = currentDate;
  
  // Filter and calculate days within window
  let totalDaysUsed = 0;
  const breakdown = [];
  
  travelHistory.forEach(entry => {
    const arrival = typeof entry.arrivalDate === 'string' 
      ? parseISO(entry.arrivalDate) 
      : entry.arrivalDate;
    const exit = entry.exitDate 
      ? (typeof entry.exitDate === 'string' ? parseISO(entry.exitDate) : entry.exitDate)
      : currentDate;
    
    // Skip if entirely outside window
    if (isBefore(exit, windowStart) || isAfter(arrival, windowEnd)) {
      breakdown.push({
        ...entry,
        daysInWindow: 0,
        inWindow: false,
        totalDays: differenceInDays(exit, arrival) + 1
      });
      return;
    }
    
    // Clip dates to window boundaries
    const clippedArrival = isAfter(arrival, windowStart) ? arrival : windowStart;
    const clippedExit = isBefore(exit, windowEnd) ? exit : windowEnd;
    
    // Calculate days (inclusive)
    const daysInWindow = differenceInDays(clippedExit, clippedArrival) + 1;
    const totalDays = differenceInDays(exit, arrival) + 1;
    
    totalDaysUsed += daysInWindow;
    
    breakdown.push({
      ...entry,
      daysInWindow,
      inWindow: true,
      totalDays,
      clippedArrival,
      clippedExit
    });
  });
  
  const maxDays = 365;
  const daysRemaining = Math.max(0, maxDays - totalDaysUsed);
  const isOverLimit = totalDaysUsed > maxDays;
  
  // Calculate key dates
  const maxStayEndDate = addDays(currentDate, daysRemaining);
  
  // Calculate when 18-month window will have reset enough to allow return
  // This is when the oldest days start falling out of the window
  const canReturnDate = addDays(windowStart, 365);
  
  return {
    windowStart,
    windowEnd,
    totalDaysUsed,
    daysRemaining,
    maxStayEndDate,
    canReturnDate,
    percentageUsed: (totalDaysUsed / maxDays) * 100,
    isOverLimit,
    breakdown
  };
}

/**
 * Calculate "what-if" scenario for future travel
 * @param {Array} travelHistory - Existing travel history
 * @param {Date} plannedArrival - Planned future arrival date
 * @param {Date} currentDate - Current date
 * @returns {Object} Future stay calculation
 */
export function calculateFutureStay(travelHistory, plannedArrival, currentDate = new Date()) {
  const arrivalDate = typeof plannedArrival === 'string' 
    ? parseISO(plannedArrival) 
    : plannedArrival;
  
  const windowStartAtArrival = subMonths(arrivalDate, 18);
  
  // Calculate days used from new window perspective
  let daysUsedAtArrival = 0;
  
  travelHistory.forEach(entry => {
    const arrival = typeof entry.arrivalDate === 'string' 
      ? parseISO(entry.arrivalDate) 
      : entry.arrivalDate;
    const exit = entry.exitDate 
      ? (typeof entry.exitDate === 'string' ? parseISO(entry.exitDate) : entry.exitDate)
      : currentDate;
    
    // Skip if entirely outside window
    if (isBefore(exit, windowStartAtArrival) || isAfter(arrival, arrivalDate)) {
      return;
    }
    
    const clippedArrival = isAfter(arrival, windowStartAtArrival) ? arrival : windowStartAtArrival;
    const clippedExit = isBefore(exit, arrivalDate) ? exit : arrivalDate;
    
    const days = differenceInDays(clippedExit, clippedArrival) + 1;
    daysUsedAtArrival += days;
  });
  
  const daysAvailable = Math.max(0, 365 - daysUsedAtArrival);
  const mustExitBy = addDays(arrivalDate, daysAvailable);
  
  return {
    plannedArrival: arrivalDate,
    windowStartAtArrival,
    daysUsedAtArrival,
    daysAvailable,
    mustExitBy,
    isViable: daysAvailable > 0,
    percentageUsed: (daysUsedAtArrival / 365) * 100
  };
}

/**
 * Validate travel entry
 * @param {Object} entry - Travel entry to validate
 * @returns {Object} Validation result
 */
export function validateTravelEntry(entry) {
  const errors = [];
  
  if (!entry.arrivalDate) {
    errors.push('Arrival date is required');
  }
  
  if (!entry.isCurrentStay && !entry.exitDate) {
    errors.push('Exit date is required (or mark as current stay)');
  }
  
  if (entry.arrivalDate && entry.exitDate) {
    const arrival = typeof entry.arrivalDate === 'string' 
      ? parseISO(entry.arrivalDate) 
      : entry.arrivalDate;
    const exit = typeof entry.exitDate === 'string' 
      ? parseISO(entry.exitDate) 
      : entry.exitDate;
    
    if (isAfter(arrival, exit)) {
      errors.push('Exit date must be after arrival date');
    }
    
    if (isAfter(arrival, new Date())) {
      errors.push('Arrival date cannot be in the future');
    }
    
    if (isAfter(exit, new Date())) {
      errors.push('Exit date cannot be in the future');
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}