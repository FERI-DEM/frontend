type SunPathProps = {
    sunrise: string[];
    sunset: string[];
}

const SunPath = ({ sunrise, sunset }: SunPathProps) => {

    return (
        <>
            <h5>Test</h5>
            <p>{sunrise}</p>
        </>
    );
}

export {
    SunPath
}
