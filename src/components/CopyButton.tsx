import { PropsWithChildren } from "react";

interface CopyButtonProps extends PropsWithChildren {
    text: string;
}

export const CopyButton = (props: CopyButtonProps) => {
    const copy = () => {
        navigator.clipboard.writeText(props.text);
    };
    return <button onClick={copy}>{props.children}</button>;
};
