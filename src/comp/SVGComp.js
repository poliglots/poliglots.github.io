const SVGComponent = (props) => (
  <svg
    fill="#000000"
    width="800px"
    height="800px"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M21.87,11.5l-4.5-7.79a1,1,0,0,0-.87-.5h-9a1,1,0,0,0-.87.5L2.13,11.5a1,1,0,0,0,0,1l4.5,7.79a1,1,0,0,0,.87.5h9a1,1,0,0,0,.87-.5l4.5-7.79A1,1,0,0,0,21.87,11.5Zm-6,7.29H8.08L4.15,12,8.08,5.21h7.84L19.85,12Z" />
    <svg viewBox="0 0 600 120" {...props}>
      <defs>
        <linearGradient id="neonG" x1={0} x2={1}>
          <stop offset={0} stopColor="#00f7ff" />
          <stop offset={1} stopColor="#7a00ff" />
        </linearGradient>
        <filter id="neon">
          <feGaussianBlur stdDeviation={6} result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <rect width="100%" height="100%" fill="#ffffff" />
      <text
        x="50%"
        y="55%"
        textAnchor="middle"
        fontSize={44}
        fill="url(#neonG)"
        filter="url(#neon)"
      >
        {"polyglot.dev"}
      </text>
    </svg>
  </svg>
);
export default SVGComponent;
