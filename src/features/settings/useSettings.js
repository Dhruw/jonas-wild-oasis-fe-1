import { getSettings } from '@/services/apiSettings';
import { useQuery } from '@tanstack/react-query';

function useSettings() {
  const { data, error, isLoading } = useQuery({
    queryKey: 'setting',
    queryFn: getSettings,
  });

  return { data, error, isLoading };
}

export default useSettings;
