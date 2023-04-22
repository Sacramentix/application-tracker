import { useStorage } from "@vueuse/core";

export const config = useStorage("config", {
    comfirmToDeleteApplication: true,
    comfirmToDeleteInterview: true,
    showInterviewInGraph: true
})