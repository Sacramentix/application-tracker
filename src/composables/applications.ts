import { useStorage } from "@vueuse/core";
import { Application } from "../components/type";

export const applications = useStorage<Application[]>("applications", [])