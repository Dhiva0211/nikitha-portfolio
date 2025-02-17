import { useRef, useState, useEffect, FC, useCallback } from 'react';

interface SignatureProps {
  onSignatureChange: (signature: string) => void;
}

const ElectronicSignature: FC<SignatureProps> = ({ onSignatureChange }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);

  const clearCanvas = useCallback(
    (
      ctx: CanvasRenderingContext2D = context!,
      width: number = canvasRef.current?.width || 0,
      height: number = canvasRef.current?.height || 0,
    ) => {
      if (ctx) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, width, height);
      }
    },
    [context],
  );

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    const { offsetX, offsetY } = getCoordinates(e);
    if (context) {
      context.beginPath();
      context.moveTo(offsetX, offsetY);
    }
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing || !context) return;

    const { offsetX, offsetY } = getCoordinates(e);
    context.lineTo(offsetX, offsetY);
    context.stroke();
  };

  const stopDrawing = () => {
    if (isDrawing && context) {
      context.closePath();
      setIsDrawing(false);
    }
  };

  const getCoordinates = (e: React.MouseEvent | React.TouchEvent) => {
    if ('touches' in e && e.touches[0]) {
      const rect = canvasRef.current!.getBoundingClientRect();
      return {
        offsetX: e.touches[0].clientX - rect.left,
        offsetY: e.touches[0].clientY - rect.top,
      };
    }
    return {
      offsetX: (e as React.MouseEvent).nativeEvent.offsetX,
      offsetY: (e as React.MouseEvent).nativeEvent.offsetY,
    };
  };

  const saveSignature = () => {
    const dataUrl = canvasRef.current?.toDataURL('image/png');
    if (dataUrl) {
      onSignatureChange(dataUrl);
    }
    return null;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;

    const resizeCanvas = () => {
      if (!canvas || !container) return;

      const containerWidth = container.clientWidth;
      const containerHeight = 176;

      const dpr = window.devicePixelRatio || 1;
      canvas.width = containerWidth * dpr;
      canvas.height = containerHeight * dpr;

      canvas.style.width = `${containerWidth}px`;
      canvas.style.height = `${containerHeight}px`;

      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.scale(dpr, dpr);
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        setContext(ctx);
        clearCanvas(ctx, containerWidth, containerHeight);
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex w-full flex-col items-center gap-4 rounded-xl border-4 p-4">
      <div ref={containerRef} className="relative h-44 w-full">
        <canvas
          ref={canvasRef}
          className="cursor-pointer touch-none rounded-xl border border-gray-300"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />
      </div>
      <div className="flex gap-4">
        <button
          onClick={() => clearCanvas()}
          type="button"
          className="rounded-md border-2 border-gray-300 bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
        >
          Clear
        </button>
        <button
          onClick={saveSignature}
          type="button"
          className="rounded-lg border-2 bg-deep-sapphire px-4 py-2 text-sm font-medium text-white hover:border-deep-sapphire hover:bg-white hover:text-deep-sapphire"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default ElectronicSignature;
