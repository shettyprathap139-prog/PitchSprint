"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
} from "react";

import type {
  PresentationData,
} from "../lib/presentation/layouts";

type PitchContextType = {
  files: File[];
  setFiles: React.Dispatch<
    React.SetStateAction<File[]>
  >;

  presentationType: string;
  setPresentationType: React.Dispatch<
    React.SetStateAction<string>
  >;

  customPrompt: string;
  setCustomPrompt: React.Dispatch<
    React.SetStateAction<string>
  >;

  theme: string;
  setTheme: React.Dispatch<
    React.SetStateAction<string>
  >;

  enhancement: string;
  setEnhancement: React.Dispatch<
    React.SetStateAction<string>
  >;
 generatedPresentation: PresentationData | null;
setGeneratedPresentation: Dispatch<
  SetStateAction<PresentationData | null>
>;

generatedPdf: string | null;
setGeneratedPdf: Dispatch<
  SetStateAction<string | null>
>;
};
export const PitchContext =
  createContext<PitchContextType | undefined>(
    undefined
  );

export function PitchProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [files, setFiles] = useState<File[]>(
    []
  );

  const [presentationType, setPresentationType] =
    useState<string>("Custom");

  const [customPrompt, setCustomPrompt] =
    useState<string>("");

  const [theme, setTheme] =
    useState<string>("modern-dark");

  const [enhancement, setEnhancement] =
    useState<string>("improve");
      const [
    generatedPresentation,
    setGeneratedPresentation,
  ] = useState<PresentationData | null>(null);
  const [generatedPdf, setGeneratedPdf] =
  useState<string | null>(null);

  return (
    <PitchContext.Provider
      value={{
        files,
        setFiles,

        presentationType,
        setPresentationType,

        customPrompt,
        setCustomPrompt,

        theme,
        setTheme,

        enhancement,
        setEnhancement,

        generatedPresentation,
        setGeneratedPresentation,
        generatedPdf,
setGeneratedPdf,
      }}
    >
      {children}
    </PitchContext.Provider>
  );
}

export function usePitch() {
  const context = useContext(
    PitchContext
  );

  if (!context) {
    throw new Error(
      "usePitch must be used inside PitchProvider"
    );
  }

  return context;
}