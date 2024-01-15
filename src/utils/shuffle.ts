export const shuffle = (winners: any[]) => {
  const shuffledWinners = [...winners];
  for (let i = shuffledWinners.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledWinners[i], shuffledWinners[j]] = [
      shuffledWinners[j],
      shuffledWinners[i],
    ];
  }
  return shuffledWinners;
};
