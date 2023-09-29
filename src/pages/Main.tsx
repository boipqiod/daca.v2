import React, { useEffect } from "react";
import { Button, Container } from "react-bootstrap";

export const Main = () => {
    const videoRef = React.useRef<HTMLVideoElement>(null);

    useEffect(() => {
        try {
            navigator.mediaDevices
                .getUserMedia({ video: true })
                .then((stream) => {
                    if (videoRef.current) videoRef.current.srcObject = stream;
                })
                .catch((err) => {
                    alert("카메라 접근을 허용해주세요.");
                    console.error("카메라 접근 실패:", err);
                });
        } catch (e) {
            alert("카메라 접근을 허용해주세요.");
            console.log(e);
        }
    }, []);

    const onShot = () => {
        if (!videoRef.current) return;
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        ctx.drawImage(videoRef.current, 0, 0);
        const data = canvas.toDataURL("image/png");
        console.log(data);

        const link = document.createElement("a");
        link.href = data; // data는 canvas.toDataURL("image/png")에서 얻은 값
        link.download = "snapshot.png";
        link.click();
    };

    return (
        <Container>
            <video
                style={{
                    width: "100vw",
                    height: "100vh"
                }}
                ref={videoRef}
                autoPlay
            />
            <Button onClick={onShot}>캡쳐</Button>
        </Container>
    );
};
