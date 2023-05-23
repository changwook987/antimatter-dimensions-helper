import { useEffect, useState } from "react";
import { FullScreen } from "../components/FullScreen";
import { Horizontal } from "../components/Horizontal";
import { findEC, order } from "../utils/databases/eternitychallenges";
import { CopyButton } from "../components/CopyButton";
import styled from "styled-components";

const WrapPre = styled.pre`
    overflow: scroll;
    width: 80%;
`;

const Button = styled(CopyButton)`
    width: 20%;
`;

const SelectButton = styled.button<{ selected?: boolean }>`
    background-color: ${(props) => (props.selected ? "green" : "white")};
    color: ${(props) => (props.selected ? "white" : "black")};
    border: 1px gray solid;
    padding: 5px;
    text-align: center;
    transition: 0.2s;
    border-left: none;
    &:first-child {
        border-left: 1px gray solid;
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
    }
    &:last-child {
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
    }
    &:hover {
        background-color: ${(props) => (props.selected ? "green" : "gray")};
    }
`;

const StyledSpan = styled.span`
    display: inline-block;
    padding: 5px;
`;

export const EternityChallge = () => {
    const [getChallenge, setChallenge] = useState(1);
    const [getCompletion, setCompletion] = useState(1);

    const [getTree, setTree] = useState("|0");
    const [getTheorems, setTheorems] = useState(0);
    const [getNote, setNote] = useState<string | null>(null);

    const clamp = (n: number, min: number, max: number) => {
        return Math.max(Math.min(n, max), min);
    };

    // EC controller
    const nextEC = () => {
        const ec = `${getChallenge}x${getCompletion}`;
        const nextEC = order[clamp(order.indexOf(ec) + 1, 0, order.length - 1)];
        const [challenge, completion] = nextEC
            .split("x")
            .map((s) => parseInt(s));
        setChallenge(challenge);
        setCompletion(completion);
    };
    const prevEC = () => {
        const ec = `${getChallenge}x${getCompletion}`;
        const prevEC = order[clamp(order.indexOf(ec) - 1, 0, order.length - 1)];
        const [challenge, completion] = prevEC
            .split("x")
            .map((s) => parseInt(s));
        setChallenge(challenge);
        setCompletion(completion);
    };

    // Tree Refresh
    useEffect(() => {
        const ec = findEC(getChallenge, getCompletion);
        const tree = ec.tree;
        const note = ec.note;
        // trim ` character
        setTree(tree.substring(1, tree.length - 1));
        setTheorems(ec.tt);
        setNote(note?.substring(1, note!.length - 1) || null);
    }, [getChallenge, getCompletion]);

    // Keyboard Listening
    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            switch (e.key) {
                case "ArrowRight":
                    nextEC();
                    break;
                case "ArrowLeft":
                    prevEC();
                    break;
            }
        };
        window.addEventListener("keydown", onKeyDown);
        return () => {
            window.removeEventListener("keydown", onKeyDown);
        };
    });

    return (
        <FullScreen>
            <Horizontal>
                <StyledSpan>Challenge</StyledSpan>
            </Horizontal>
            <Horizontal>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((n) => {
                    return (
                        <SelectButton
                            key={n}
                            onClick={() => {
                                setChallenge(n);
                            }}
                            selected={getChallenge === n}
                        >
                            {n}
                        </SelectButton>
                    );
                })}
            </Horizontal>
            <Horizontal>
                <StyledSpan>Completion</StyledSpan>
            </Horizontal>
            <Horizontal>
                {[1, 2, 3, 4, 5].map((n) => {
                    return (
                        <SelectButton
                            key={n}
                            onClick={() => {
                                setCompletion(n);
                            }}
                            selected={getCompletion === n}
                        >
                            {n}
                        </SelectButton>
                    );
                })}
            </Horizontal>
            <br />
            <Horizontal>
                <span>
                    You Need <b>{getTheorems}</b> Time Theorems
                </span>
            </Horizontal>
            <Horizontal>
                <WrapPre>{getTree}</WrapPre>
                <Button text={getTree}>Copy!</Button>
            </Horizontal>
            <Horizontal>
                <SelectButton onClick={prevEC}>◀ Prev EC</SelectButton>
                <SelectButton onClick={nextEC}>Next EC ▶</SelectButton>
            </Horizontal>
            {getNote && (
                <div>
                    <br />
                    <Horizontal>
                        <span style={{ fontWeight: "bold", fontSize: "1.5em" }}>
                            Note
                        </span>
                    </Horizontal>
                    <Horizontal>
                        <div style={{ width: "50em", textAlign: "center" }}>
                            {getNote}
                        </div>
                    </Horizontal>
                </div>
            )}
        </FullScreen>
    );
};
