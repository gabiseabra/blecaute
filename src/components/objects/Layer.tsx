import React, { useRef } from 'react'
import { useFrame } from "@react-three/fiber";
import { Scene } from "three";

interface LayerProps {
  layer: number;
  children: React.ReactNode;
}
/**
 * Renders children in a predictable order. Some may render above others by
 * having a higher layer number.
 *
 * @example
 * ```typescript
 * // will render above backgound component
 * <Layer layer={2}>
 *   <MyText />
 * </Layer>
 *
 * // below the text as it is rendered first/low layer
 * <Layer layer={1}>
 *   <MyBackground />
 * </Layer>
 * ```
 */
export function Layer({ layer, children }: LayerProps): JSX.Element {
  const sceneRef = useRef<Scene>(null!);

  useFrame(({ gl, camera }) => {
    gl.autoClear = false;
    gl.clearDepth();
    gl.render(sceneRef.current, camera);
  }, layer);

  return <scene ref={sceneRef}>{children}</scene>;
};
