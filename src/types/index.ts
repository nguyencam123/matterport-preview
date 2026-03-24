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
  on(CLICK: string, arg1: (sid: string) => void): unknown;
  Mattertag: {
    Event: { CLICK: string };
    injectHTML(
      tagSid: string,
      arg1: string,
      arg2: { size: { w: number; h: number } },
    ): unknown;
    add: (options: {
      label: string;
      description: string;
      anchorPosition: { x: number; y: number; z: number };
      stemVector?: { x: number; y: number; z: number };
      color: { r: number; g: number; b: number };
    }) => Promise<string | string[]>;
  };
  Camera: {
    pose: {
      subscribe: (
        cb: (pose: { rotation: { x: number; y: number } }) => void,
      ) => void;
    };
    setRotation: (
      rotation: { x: number; y: number },
      opts: { speed: number },
    ) => Promise<void>;
  };
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
