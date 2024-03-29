import "./winner-text.css";

interface WinnerTextProps {
  children: string;
  className?: string;
  fontSize?: string;
  blur?: boolean;
}

export default function WinnerText(props: WinnerTextProps) {
  const { children, className, fontSize, blur = false } = props;

  return (
    <div
      className={`${
        blur ? "blur-md" : ""
      } px-5 py-3 transition-all duration-700`}
    >
      <h1
        data-heading={children}
        className={`${className} winner`}
        style={{
          fontSize,
        }}
      >
        {children}
      </h1>
    </div>
  );
}
