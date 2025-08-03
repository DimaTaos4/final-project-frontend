import type { Props } from "./iconTypes";
const EmailIcon = ({ size }: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="#fff"
    viewBox="0 0 24 24"
  >
    <rect width={24} height={24} fill="#007AFF" rx={6} />
    <path d="m4 8 8 5 8-5v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8zm8 3L4 8h16l-8 3z" />
  </svg>
);
export default EmailIcon;
