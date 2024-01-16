import "./winner-text.module.css";

interface WinnerTextProps {
  children: string;
  className?: string;
  fontSize?: string;
}

export default function WinnerText(props: WinnerTextProps) {
  const { children, className, fontSize } = props;

  return (
    <div className="px-5 py-5">
      <h1
        data-heading={children}
        className={`${className}`}
        style={{
          fontSize,
        }}
      >
        {children}
      </h1>
    </div>
  );
}
