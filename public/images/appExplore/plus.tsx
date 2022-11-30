interface props {
  className: string;
}

export default function Plus(props: props) {
  const { className } = props;
  return (
    <>
      <svg
        className={className}
        width="73"
        height="73"
        viewBox="0 0 73 73"
        fill=""
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="31.1333" width="9.98382" height="73" rx="4.99191" fill="" />
        <rect
          y="41.9272"
          width="10.8558"
          height="73"
          rx="5.4279"
          transform="rotate(-90 0 41.9272)"
          fill=""
        />
      </svg>
    </>
  );
}
