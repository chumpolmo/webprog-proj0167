import { useParams } from "@remix-run/react";

export default function GetParams () {
    const myParams = useParams();
    return (
        <>
            คุณเลือก Card ID: {myParams.body}<br />
            ของผู้ใช้งาน ID: {myParams.userid}
        </>
    );
}