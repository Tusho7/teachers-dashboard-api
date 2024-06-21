const calculateNextPaymentDate = (start_date, _, days_of_week) => {
  const startDate = new Date(start_date);
  const daysOfWeek = days_of_week.split(",").map((day) => day.trim());

  let attendanceCount = 0;
  let currentDate = new Date(startDate);

  while (attendanceCount < 8) {
    if (daysOfWeek.includes(getDayName(currentDate))) {
      attendanceCount++;
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return currentDate;
};

const getDayName = (date) => {
  const days = [
    "კვირა",
    "ორშაბათი",
    "სამშაბათი",
    "ოთხშაბათი",
    "ხუთშაბათი",
    "პარასკევი",
    "შაბათი",
  ];
  return days[date.getDay()];
};

const calculateEighthLessonDate = (start_date, _, days_of_week) => {
  const startDate = new Date(start_date);
  const daysOfWeek = days_of_week.split(",").map((day) => day.trim());

  let attendanceCount = 0;
  let currentDate = new Date(startDate);

  while (attendanceCount < 8) {
    if (daysOfWeek.includes(getDayName(currentDate))) {
      attendanceCount++;
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }

  currentDate.setDate(currentDate.getDate() - 1);

  return currentDate;
};

const isValidCurrency = (currency) => {
  const validCurrencies = ['GEL', 'USD', 'EUR']; 
  const normalizedCurrency = currency.toUpperCase(); 
  return validCurrencies.includes(normalizedCurrency);
};

export { calculateEighthLessonDate, calculateNextPaymentDate, isValidCurrency }