import "./LoadingSpinner.css";

function LoadingSpinner() {
  return (
    <div className="fixed inset-0 flex justify-center items-center">
      <div className="absolute inset-0 bg-white bg-opacity-50"></div>
      <div className="lds-roller absolute">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default LoadingSpinner;
