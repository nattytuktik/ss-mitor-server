export const removeSpaceString = (testString: string): string => {
  if (testString === null || testString === undefined) {
    return '';
  }
  let newString: string = testString.trim().replace(/\s+/g, '');
  return newString;
};
