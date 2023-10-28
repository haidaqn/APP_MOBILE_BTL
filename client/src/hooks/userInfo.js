import StorageKeys from '../constants/storage-keys';
import { useSelector } from 'react-redux';

export function useInfoUser() {
    const user = useSelector((state) => state.auth.currentUser);
    return user || JSON.parse(localStorage.getItem(StorageKeys.USER) || 'null');
}
