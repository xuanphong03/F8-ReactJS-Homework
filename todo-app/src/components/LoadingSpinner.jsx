function LoadingSpinner() {
  return (
    <div className="lds-roller absolute inset-0 left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

export default LoadingSpinner;
