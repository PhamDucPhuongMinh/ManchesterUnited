import React from "react";

interface Props {
  className?: string;
}

const Footer: React.FC<Props> = ({ className }) => {
  return (
    <div className={`footer bg-light ${className}`}>
      <div className="container-md py-4">
        <p className="mb-0 text-black-50" style={{ fontSize: "1.4rem" }}>
          2022 © Copyright by MiChu - Manucians
        </p>
      </div>
    </div>
  );
};

export default Footer;
