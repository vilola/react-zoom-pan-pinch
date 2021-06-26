import { ReactZoomPanPinchContext } from "../../models";
import { handleZoomToViewCenter, resetTransformations } from "./handlers.utils";
import { animations } from "../animations/animations.constants";
import { animate } from "../animations/animations.utils";
import { getCenteredTransformStyles } from "../../utils";

export const zoomIn = (contextInstance: ReactZoomPanPinchContext) => (
  step = 0.5,
  animationTime = 300,
  animationName: keyof typeof animations = "easeOut",
): void => {
  handleZoomToViewCenter(
    contextInstance,
    1,
    step,
    animationTime,
    animationName,
  );
};

export const zoomOut = (contextInstance: ReactZoomPanPinchContext) => (
  step = 0.5,
  animationTime = 300,
  animationName: keyof typeof animations = "easeOut",
): void => {
  handleZoomToViewCenter(
    contextInstance,
    -1,
    step,
    animationTime,
    animationName,
  );
};

export const setTransform = (contextInstance: ReactZoomPanPinchContext) => (
  newPositionX: number,
  newPositionY: number,
  newScale: number,
  animationTime = 200,
  animationType: keyof typeof animations = "easeOut",
): void => {
  const { positionX, positionY, scale } = contextInstance.transformState;
  const { wrapperComponent, contentComponent } = contextInstance;
  const { disabled } = contextInstance.setup;

  if (disabled || !wrapperComponent || !contentComponent) return;

  const targetState = {
    positionX: isNaN(newPositionX) ? positionX : newPositionX,
    positionY: isNaN(newPositionY) ? positionY : newPositionY,
    scale: isNaN(newScale) ? scale : newScale,
  };

  animate(contextInstance, targetState, animationTime, animationType);
};

export const resetTransform = (contextInstance: ReactZoomPanPinchContext) => (
  animationTime = 200,
  animationType: keyof typeof animations = "easeOut",
): void => {
  resetTransformations(contextInstance, animationTime, animationType);
};

export const centerView = (contextInstance: ReactZoomPanPinchContext): void => {
  const { initialPositionX, initialPositionY } = contextInstance.props;
  const {
    transformState,
    wrapperComponent,
    contentComponent,
  } = contextInstance;
  if (wrapperComponent && contentComponent) {
    const { transform, positionsState } = getCenteredTransformStyles(
      initialPositionX,
      initialPositionY,
      transformState.scale,
      wrapperComponent,
      contentComponent,
    );
    contentComponent.style.transform = transform;
    contextInstance.transformState = {
      ...contextInstance.transformState,
      ...positionsState,
    };
  }
};