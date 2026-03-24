// Matterport SDK global type
declare global {
  interface Window {
    MP_SDK: {
      connect: (
        iframe: HTMLIFrameElement,
        sdkKey: string,
        version: string,
      ) => Promise<MpSdk>;
    };
  }
}

export interface MpSdk {
  Sweep: {
    current: {
      subscribe: (cb: (sweep: { id: string } | null) => void) => void;
    };
    data: {
      subscribe: (opts: {
        onCollectionUpdated: (col: Record<string, unknown>) => void;
      }) => void;
    };
    moveTo: (
      id: string,
      opts: { transition: unknown; transitionTime: number },
    ) => Promise<void>;
    Transition: { FADE: unknown; FLY: unknown; INSTANT: unknown };
  };
}

// Project data types
export interface Unit {
  id: string;
  sweepId: string;
  label: string;
  area: string;
  price: string;
  beds: number;
  baths: number;
  icon: string;
  tag: string | null;
  tagColor: string | null;
}

export interface Amenity {
  icon: string;
  label: string;
}

export type SdkStatus = "connecting" | "ready" | "error";
export type TransitionKey = "FADE" | "FLY" | "INSTANT";
