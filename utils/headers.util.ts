import { LocalStorageConstants } from "@/constants/local-storage.constants"

export const getHeadersRequest = () => {
    return {
        'authorization': `Bearer ${localStorage.getItem(LocalStorageConstants.MagicToken)}`,
        'content-type': 'application/json'
    }
}