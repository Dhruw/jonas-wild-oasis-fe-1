import { createCabin } from '@/services/apiCabins';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

function useCreateCabin() {
  const queryClient = useQueryClient();
  const { mutate: createCabinMutation } = useMutation({
    mutationFn: (newCabin) => createCabin(newCabin),
    onSuccess: () => {
      queryClient.invalidateQueries({ exact: 'cabin' });
      toast.success('New cabin created');
    },
    onError: (error) => {
      alert(error.message);
    },
  });
  return createCabinMutation;
}

export default useCreateCabin;
