interface props {
  className: string;
}

export default function Explore(props: props) {
  const { className } = props;
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        width="37px"
        height="37px"
        className={className}
      >
        <path
          d="M 7.5 1 C 3.9160714 1 1 3.9160714 1 7.5 C 1 11.083929 3.9160714 14 7.5 14 C 11.083929 14 14 11.083929 14 7.5 C 14 3.9160714 11.083929 1 7.5 1 z M 7.5 2 C 10.543488 2 13 4.4565116 13 7.5 C 13 10.543488 10.543488 13 7.5 13 C 4.4565116 13 2 10.543488 2 7.5 C 2 4.4565116 4.4565116 2 7.5 2 z M 11 4 L 6.5 6.5 L 4 11 L 8.5 8.5 L 11 4 z M 7.5 7 C 7.776 7 8 7.224 8 7.5 C 8 7.776 7.776 8 7.5 8 C 7.224 8 7 7.776 7 7.5 C 7 7.224 7.224 7 7.5 7 z"
          font-weight="400"
          font-family="sans-serif"
          white-space="normal"
          overflow="visible"
          fill="white"
        />
      </svg>
    </>
  );
}
