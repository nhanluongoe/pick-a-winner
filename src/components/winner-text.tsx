import "./winner-text.module.css";

interface WinnerTextProps {
  children: string;
  className?: string;
  fontSize?: string;
  blur?: boolean;
}

export default function WinnerText(props: WinnerTextProps) {
  const { children, className, fontSize, blur = false } = props;

  console.log(blur);

  return (
    <div className={`${blur ? "blur-md" : ""} px-5 py-5 transition-all duration-700`}>
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
