"use client";

type LogoIconProps = {
  className?: string;
};

export default function LogoIcon({ className }: LogoIconProps) {
  return (
    <div className={className}>
      <svg
        width="1em"
        height="1em"
        viewBox="0 0 1080 1080"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_1_2)">
          <rect
            x="9"
            y="9"
            width="1062"
            height="1062"
            rx="141"
            fill="#F97316"
            stroke="#EA580C"
            strokeWidth="18"
            strokeLinejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_1_2">
            <rect width="1080" height="1080" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}
