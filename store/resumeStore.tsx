import { create } from "zustand";

interface ResumeState {
  resumeText: string;
  setResumeText: (text: string) => void;
}

export const useResumeStore = create<ResumeState>((set) => ({
  resumeText: "",
  setResumeText: (text) => set({ resumeText: text }),
}));
