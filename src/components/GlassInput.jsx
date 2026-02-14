import { memo } from "react";

const GlassInput = memo(({ placeholder }) => {
  return (
    <input
      className="glass-input"
      placeholder={placeholder}
    />
  );
});

export default GlassInput;
