import { useState, useEffect } from 'react';

interface TemporizadorProps {
    initialMinutes?: number;
    initialSeconds?: number;
    expirando?: () => void;
}

function Temporizador({ initialMinutes = 0, initialSeconds = 0, expirando }: TemporizadorProps) {
    const [minutes, setMinutes] = useState(initialMinutes);
    const [seconds, setSeconds] = useState(initialSeconds);

    useEffect(() => {
        let myInterval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(myInterval);
                    if (expirando) {
                        expirando();
                    }
                } else {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                }
            }
        }, 1000);
        return () => {
            clearInterval(myInterval);
        };
    }, [minutes, seconds, expirando]);

    return (
        <div>
            {minutes === 0 && seconds === 0 ? (
                <h1>Tempo esgotado!</h1>
            ) : (
                <h1>
                    {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                </h1>
            )}
        </div>
    );
}

export default Temporizador;
