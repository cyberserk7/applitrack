import { JobApplication } from "@/models/User";
import axios from "axios";
import { create } from "zustand";
export type ModalType = "new-application" | "trash" | "feedback" | "settings" | "search" | "support"

interface ModalData {
    
}

interface ModalStore {
    type: ModalType | null;
    data: ModalData;
    isOpen: boolean;
    onOpen: (type: ModalType, data?: ModalData) => void;
    onClose: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
    type: null,
    data: {},
    isOpen: false,
    onOpen: (type, data = {}) => set({ type, data, isOpen: true }),
    onClose: () => set({ type: null, isOpen: false })
}));


interface ApplicationStoreProps {
    applications: JobApplication[];
    fetchApplications: () => Promise<void>;
    loading: boolean;
}

export const useApplicationStore = create<ApplicationStoreProps>((set) => ({
    applications: [],
    loading: false,
    fetchApplications: async () => {
        set({ loading: true });
        try {
            const response = await axios.get(`/api/get-applications`);
            if (response.data.success) {
                set({ applications: response.data.applications });
            }
            } catch (error) {
                console.error('Failed to fetch applications', error);
        } finally {
            set({ loading: false });
        }
    }
}));