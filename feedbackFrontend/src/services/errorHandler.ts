import { AxiosError } from "axios";
import { toast } from "react-toastify";

// BU KISIM BACKEND TARAFINDA EXCEPTİONHANDLE Middleware aktif edildiğinde kullanılır

export const handleApiError = (error: unknown) => {
    const err = error as AxiosError;

    const problemDetails = err.response?.data as {
        title?: string;
        detail?: string;
        status?: number;
        type?: string;
    };

    if (problemDetails?.detail) {
        toast.error(problemDetails.detail);
    } else if (err.message.includes("Network")) {
        toast.error("Sunucuya ulaşılamadı.");
    } else {
        toast.error("Bilinmeyen bir hata oluştu.");
    }

    console.error("API Hatası:", problemDetails || err);
};