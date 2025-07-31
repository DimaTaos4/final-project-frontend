import type { Props } from "./iconTypes";

const HomeIcon = ({ size }: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className="homeIcon"
  >
    <path
      stroke="#000"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9.005 16.545a2.997 2.997 0 1 1 5.995 0V22h7V11.543L12 2 2 11.543V22h7.005v-5.455Z"
    />
  </svg>
);
export default HomeIcon;
