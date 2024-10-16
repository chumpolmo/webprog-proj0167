import { useParams } from "@remix-run/react";

export default function GetCard () {
    const myParams = useParams();
    return (
        <>You choose: {myParams.lang}</>
    );
}