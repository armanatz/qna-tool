import { useEffect, useRef } from 'react';

interface TooltipProps extends React.PropsWithChildren {
  title: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

export default function Tooltip({
  children,
  title,
  position = 'bottom',
}: TooltipProps) {
  const { current: tooltipClassName } = useRef(
    `tooltip__${Math.round(Date.now() * Math.random())}`,
  );

  useEffect(() => {
    const styleEl = document.createElement('style');
    document.head.appendChild(styleEl);

    const generateCSS = () => {
      let positionCSS = `
        bottom: -0.5rem;
        left: 50%;
        transform: translateX(-50%) translateY(100%);
      `;

      switch (position) {
        case 'top':
          positionCSS = `
            left: 50%;
            top: -0.5rem;
            transform: translateX(-50%) translateY(-100%);
          `;
          break;
        case 'left':
          positionCSS = `
            left: -0.5rem;
            top: 50%;
            transform: translateX(-100%) translateY(-50%);
          `;
          break;
        case 'right':
          positionCSS = `
            right: -0.5rem;
            top: 50%;
            transform: translateX(100%) translateY(-50%);
          `;
          break;
        case 'bottom':
        default:
          positionCSS = `
            bottom: -0.5rem;
            left: 50%;
            transform: translateX(-50%) translateY(100%);
          `;
      }

      return `
        .${tooltipClassName} {
          position: relative;
          height: 100%;
        }

        .${tooltipClassName}::after {
          display: none;
          position: absolute;
          z-index: -1;
          ${positionCSS}
        }

        .${tooltipClassName}::after {
          background-color: rgba(52, 50, 50, 0.95);
          border: 1px solid #252525;
          border-radius: 0.3rem;
          box-shadow: rgb(0 0 0 / 15%) 0 8px 14px -5px;
          color: #ffffff;
          content: '${title}';
          font-size: 0.8rem;
          line-height: 1.25;
          max-width: 200px;
          padding: 0.6rem;
          text-align: center;
          width: max-content;
        }

        .${tooltipClassName}:hover::after {
          z-index: 999;
          display: inherit;
        }
      `;
    };

    styleEl.innerHTML = generateCSS();

    return () => styleEl.remove();
  }, [position, title, tooltipClassName]);

  return <div className={tooltipClassName}>{children}</div>;
}
