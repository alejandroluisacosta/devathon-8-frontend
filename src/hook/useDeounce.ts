import { useRef } from 'react';

export const useDeounce = () => {
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();

  return { debounceRef };
};
