import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';

const useSelectedClasses = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { refetch, data: selectedClasses = [] } = useQuery({
    queryKey: ['selectedclasses', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/selectedclasses?email=${user.email}`);
      return res.data;
    }
  });

  return [selectedClasses, refetch];
};

export default useSelectedClasses;
