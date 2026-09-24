export type SlideLayout =
  | "title"
  | "content"
  | "two-column"
  | "stats"
  | "process"
  | "comparison"
  | "feature-grid"
  | "highlight"
  | "conclusion";

export type SlideItem = {
  label?: string;
  title?: string;
  text?: string;
  value?: string;
};

export type PresentationSlide = {
  title: string;
  subtitle?: string;
  layout: SlideLayout;
  items?: SlideItem[];
};

export type PresentationData = {
  title: string;
  subtitle?: string;
  slides: PresentationSlide[];
};