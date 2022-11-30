interface props {
  className: string;
}

export default function Arrow(props: props) {
  const { className } = props;
  return (
    <>
      <svg
        className={className}
        width="24"
        height="24"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="none"
          d="M13.5 4.5L21 12M21 12L13.5 19.5M21 12H3"
          stroke=""
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </>
  );
}
