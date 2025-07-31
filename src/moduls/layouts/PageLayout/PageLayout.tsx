import styles from "./PageLayout.module.css";

import type { ReactNode } from "react";

interface PropsChildren {
  children: ReactNode;
}

const PageLayout = ({ children }: PropsChildren) => {
  return <div className={styles.pageLayout}>{children}</div>;
};
export default PageLayout;
