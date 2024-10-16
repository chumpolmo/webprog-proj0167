import { useParams } from "@remix-run/react";

export default function GetCard () {
    const myParams = useParams();
    return (
        <>
            คุณเลือก Card ID: {myParams.cardid}<br />
            ของผู้ใช้งาน ID: {myParams.userid}
        </>
    );
}