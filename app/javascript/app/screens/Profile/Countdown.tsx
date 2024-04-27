import { useState, type FC, useEffect } from "react";

interface Props {
  startAt: number;
}

const Countdown: FC<Props> = ({ startAt }) => {
  const [countDown, setCountDown] = useState(startAt);

  useEffect(() => {
    const countDownInterval = setInterval(() => {
      setCountDown((prevCountdown) => {
        if (prevCountdown > 0) {
          return prevCountdown - 1;
        }

        clearInterval(countDownInterval);
        return 0;
      });
    }, 1000);

    return () => {
      clearInterval(countDownInterval);
    };
  }, []);

  return <span>{countDown}</span>;
};

export default Countdown;
