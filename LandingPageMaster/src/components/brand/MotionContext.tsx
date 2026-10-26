"use client";

import { createContext, useContext } from "react";

/** True while the visitor has pressed "pause motion". Heavy effects (WebGL, orbit) read this to stop. */
const MotionPausedContext = createContext(false);

export const MotionPausedProvider = MotionPausedContext.Provider;
export const useMotionPaused = () => useContext(MotionPausedContext);
