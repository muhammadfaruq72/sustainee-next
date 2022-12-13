interface props {
  className: string;
}

export default function User(props: props) {
  const { className } = props;
  return (
    <>
      <svg
        className={className}
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M22 12C22 13.02 21.85 14.01 21.56 14.94C20.77 13.21 19.03 12 17 12C14.24 12 12 14.24 12 17C12 19.03 13.21 20.77 14.94 21.56C14.01 21.85 13.02 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2C17.52 2 22 6.48 22 12Z"
          fill="#ea2d49"
          stroke="black"
          strokeWidth="1.2"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14.9299 21.55C13.1999 20.76 11.9999 19.02 11.9999 17C11.9999 15.9 12.3499 14.89 12.9599 14.06C12.6399 14.02 12.3199 14 11.9999 14C8.71992 14 5.90992 15.97 4.66992 18.79C6.49992 20.76 9.09992 22 11.9999 22C13.0199 22 13.9999 21.85 14.9299 21.55Z"
          fill="white"
          stroke="black"
          strokeWidth="1.2"
          strokeMiterlimit="10"
          strokeLinecap="round"
        />
        <path
          d="M13.12 13.84H13.13C13.68 13.16 14.42 12.62 15.26 12.31C15.73 11.65 16 10.86 16 10C16 7.79 14.21 6 12 6C9.79 6 8 7.79 8 10C8 12.21 9.79 14 12 14C12.39 14 12.77 13.94 13.13 13.84"
          fill="white"
        />
        <path
          d="M13.12 13.84H13.13C13.68 13.16 14.42 12.62 15.26 12.31C15.73 11.65 16 10.86 16 10C16 7.79 14.21 6 12 6C9.79 6 8 7.79 8 10C8 12.21 9.79 14 12 14C12.39 14 12.77 13.94 13.13 13.84"
          stroke="black"
          strokeWidth="1.2"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M17 22C19.7614 22 22 19.7614 22 17C22 14.2386 19.7614 12 17 12C14.2386 12 12 14.2386 12 17C12 19.7614 14.2386 22 17 22Z"
          fill="white"
          stroke="black"
          strokeWidth="1.2"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14.5996 16.35L16.3996 18.15L19.3996 15.15"
          stroke="#ea2d49"
          strokeWidth="1.2"
          strokeMiterlimit="10"
        />
      </svg>
    </>
  );
}
