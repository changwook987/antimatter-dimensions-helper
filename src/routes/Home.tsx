import { useEffect } from "react";
import { FullScreen } from "../components/FullScreen";
import { useNavigate, useSearchParams } from "react-router-dom";
import { keyframes, styled } from "styled-components";

export const Home = () => {
    const [getSearchParams] = useSearchParams();
    const navigate = useNavigate();
    useEffect(() => {
        const path = getSearchParams.get("path");
        if (path) {
            navigate(path);
        }
    }, [getSearchParams, navigate]);
    return <FullScreen>HI</FullScreen>;
};
