import { PropsWithChildren, useEffect, useState } from "react";
import { Button, OverlayTrigger, Tooltip, TooltipProps } from "react-bootstrap";

interface CopyButtonProps extends PropsWithChildren {
    text: string;
}

export const CopyButton = (props: CopyButtonProps) => {
    const [getShow, setShow] = useState(false);
    const [getTimeoutFunc, setTimeoutFunc] = useState<NodeJS.Timeout | null>(
        null
    );
    const copy = () => {
        navigator.clipboard.writeText(props.text);
        setShow(true);
        setTimeoutFunc(
            setTimeout(() => {
                setShow(false);
            }, 2000)
        );
    };
    const renderTooltip = (props: TooltipProps) => {
        return <Tooltip {...props}>Copied!</Tooltip>;
    };
    useEffect(
        () => () => {
            if (getTimeoutFunc) clearTimeout(getTimeoutFunc);
        },
        [getTimeoutFunc]
    );
    return (
        <OverlayTrigger
            placement="top"
            delay={{ show: 250, hide: 250 }}
            show={getShow}
            overlay={renderTooltip}
        >
            <Button onClick={copy}>{props.children}</Button>
        </OverlayTrigger>
    );
};
