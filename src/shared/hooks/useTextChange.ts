import {useState, useCallback} from 'react';

const useTextChange = (
  initialValue: string,
): [string, (text: string) => void] => {
  const [value, setValue] = useState<string>(initialValue);

  const onChangeText = useCallback((text: string) => {
    setValue(text);
  }, []);

  return [value, onChangeText];
};

export default useTextChange;
