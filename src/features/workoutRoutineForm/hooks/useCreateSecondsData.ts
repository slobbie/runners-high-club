const useCreateSecondsData = () => {
  const createSecondsData = () => {
    const data = [];
    for (let i = 0; i <= 1800; i += 10) {
      const minutes = Math.floor(i / 60);
      const seconds = i % 60;

      let label = '';
      if (minutes === 0) {
        label = `${seconds}초`;
      } else {
        label = `${minutes}분 ${seconds}초`;
      }

      data.push({id: i, label});
    }
    return data;
  };

  return createSecondsData();
};

export default useCreateSecondsData;
