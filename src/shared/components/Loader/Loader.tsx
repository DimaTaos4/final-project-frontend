import { ClipLoader } from "react-spinners";

interface LoadingProps {
  loading: boolean;
}

const Loader = ({ loading }: LoadingProps) => {
  if (!loading) return null;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px 0",
      }}
    >
      <ClipLoader
        color="grey"
        loading={loading}
        size={50}
        speedMultiplier={1}
      />
    </div>
  );
};

export default Loader;
