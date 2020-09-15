export const getTipsAvatar = (tips) => {
  if (!tips || tips.length < 2) return tips;

  const first = tips.substr(0, 1);
  const second = tips.substr(1, 2);
  if (/[\u4e00-\u9fa5]/.test(first) || /[\u4e00-\u9fa5]/.test(second)) {
    return first;
  }
  return first + second;
};
