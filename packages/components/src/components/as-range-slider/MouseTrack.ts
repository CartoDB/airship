export class MouseTrack {
  public handleMouseDown(listeners: MouseListeners) {
    const handleMove = (eventProperties) => {
      listeners.move(eventProperties);
      eventProperties.preventDefault();
      eventProperties.stopPropagation();
    };

    const handleRelease = (eventProperties) => {
      this._handleRelease(eventProperties, { move: handleMove, release: handleRelease }, listeners);
      eventProperties.preventDefault();
      eventProperties.stopPropagation();
    };

    document.addEventListener('mousemove', handleMove);
    document.addEventListener('touchmove', handleMove);
    document.addEventListener('mouseup', handleRelease);
    document.addEventListener('touchend', handleRelease);
  }

  private _handleRelease(eventProperties: MouseEvent, listeners: MouseListeners, customListeners: MouseListeners) {
    document.removeEventListener('mousemove', listeners.move);
    document.removeEventListener('mouseup', listeners.release);

    if (customListeners.move) {
      customListeners.move(eventProperties);
    }

    if (customListeners.release) {
      customListeners.release(eventProperties);
    }
  }
}

interface MouseListeners {
  move?: (eventProperties: MouseEvent) => void;
  release?: (eventProperties: MouseEvent) => void;
}
