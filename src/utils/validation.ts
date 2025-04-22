export const isValidPhone = (phone: string) => {
  const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
  return phoneRegex.test(phone);
};

export const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidDate = (date: string) => {
  const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(19|20)\d\d$/;
  return dateRegex.test(date);
};

export const MIN_AGE_BY_LICENSE_TYPE: Record<string, number> = {
  "2533a434-35c7-47fa-9306-8e45da5ec3b4": 18,
  "d64eb185-9581-4de8-b041-dd7a06449cf1": 18,
  "39462652-008d-4b17-b647-2a3f1102be15": 18,
  "518cf7ba-7977-4307-997f-1a64b7e0fde8": 18,
  "34a37e6c-24ae-4d7a-a875-2452f5ef9fd0": 21,
};

export const calculateAge = (dateString: string): number => {
  // Make sure dateString is in DD/MM/YYYY format
  const [day, month, year] = dateString.split("/").map(Number);

  // Create a date object for the birth date
  const birthDate = new Date(year, month - 1, day); // month is 0-indexed in JS Date

  // Get today's date
  const today = new Date();

  // Calculate the difference in years
  let age = today.getFullYear() - birthDate.getFullYear();

  // Check if birthday hasn't occurred yet this year
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
};
