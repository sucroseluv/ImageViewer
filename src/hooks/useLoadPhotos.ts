import {useState, useEffect, useCallback} from 'react';
import {Pagination, Photo} from '../types';
import getPhotos from '../api/getPhotos';

const LIMIT = 20;

type ReturnType = [Photo[], boolean, () => Promise<void>];

function useLoadPhotos(): ReturnType {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pagination, setPagination] = useState<Pagination>({
    offset: 0,
    total_photos: LIMIT,
    limit: LIMIT,
  });
  const fetchData = useCallback(async (...args: any[]) => {
    setIsLoading(true);
    const response = await getPhotos(...args);
    setIsLoading(false);
    return response;
  }, []);

  const fetchMore = useCallback(async () => {
    if (pagination.offset >= pagination.total_photos) {
      return;
    }

    const response = await fetchData(
      pagination.offset + pagination.limit,
      pagination.limit,
    );
    setPhotos([...photos, ...response.photos]);
    setPagination(response.pagination);
  }, [photos, pagination, fetchData]);

  useEffect(() => {
    fetchData().then(response => {
      setPhotos(response.photos);
      setPagination(response.pagination);
    });
  }, [fetchData]);

  return [photos, isLoading, fetchMore];
}

export default useLoadPhotos;
