const parseRelativeDate = (relativeDate: string): Date => {
  const now = new Date();

  // Split the string into parts
  const parts = relativeDate.split(' ');

  // Extract the number and unit
  const number = parseInt(parts[0], 10);
  const unit = parts[1].toLowerCase();

  // Calculate the offset in milliseconds
  let offset = 0;
  switch (unit) {
    case 'day':
    case 'days':
      offset = number * 24 * 60 * 60 * 1000; // days to milliseconds
      break;
    case 'hour':
    case 'hours':
      offset = number * 60 * 60 * 1000; // hours to milliseconds
      break;
    case 'minute':
    case 'minutes':
      offset = number * 60 * 1000; // minutes to milliseconds
      break;
    case 'second':
    case 'seconds':
      offset = number * 1000; // seconds to milliseconds
      break;
    default:
      throw new Error(`Unsupported time unit: ${unit}`);
  }

  // Subtract the offset from the current date
  const pastDate = new Date(Number(now) - offset);

  return pastDate;
};

export { parseRelativeDate };
