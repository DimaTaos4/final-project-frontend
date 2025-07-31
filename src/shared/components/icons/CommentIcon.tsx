import type { Props } from "./iconTypes";
const CommentIcon = ({ size, color, className }: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 21 21"
    className={className}
  >
    <path
      stroke="#000"
      strokeLinejoin="round"
      strokeWidth={1.695}
      d="M17.667 15.078a8.468 8.468 0 1 0-3.042 3.064l4.18 1.167-1.138-4.23Z"
    />
  </svg>
);
export default CommentIcon;
