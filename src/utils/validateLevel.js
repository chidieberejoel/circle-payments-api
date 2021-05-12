const levels = ["basic", "premium", "pro"];

const validateLevel = (levelFrom, levelTo) => {
  if (levels.indexOf(levelFrom) >= levels.indexOf(levelTo)) {
    return false;
  }
  return true;
};

export default validateLevel;
