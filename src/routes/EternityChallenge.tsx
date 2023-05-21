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

export const EternityChallge = () => {
    const [getChallenge, setChallenge] = useState(1);
    const [getCompletion, setCompletion] = useState(1);

    const [getTree, setTree] = useState("|0");
    const [getTheorems, setTheorems] = useState(0);

    const clamp = (n: number, min: number, max: number) => {
        return Math.max(Math.min(n, max), min);
    };

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

    useEffect(() => {
        const ec = findEC(getChallenge, getCompletion);
        const tree = ec.tree;
        setTree(tree.substring(1, tree.length - 1));
        setTheorems(ec.tt);
    }, [getChallenge, getCompletion]);

    return (
        <FullScreen>
            <Horizontal>
                Challenge:{" "}
                <input
                    type="number"
                    onChange={(e) =>
                        setChallenge(
                            Math.min(
                                Math.max(e.currentTarget.valueAsNumber, 1),
                                12
                            )
                        )
                    }
                    value={getChallenge}
                />
            </Horizontal>
            <Horizontal>
                Completion:{" "}
                <input
                    type="number"
                    onChange={(e) =>
                        setCompletion(
                            Math.min(
                                Math.max(e.currentTarget.valueAsNumber, 1),
                                5
                            )
                        )
                    }
                    value={getCompletion}
                />
            </Horizontal>
            <br />
            <Horizontal>
                <b>{getTheorems}</b>개의 시간정리가 필요합니다
            </Horizontal>
            <Horizontal>
                <WrapPre>{getTree}</WrapPre>
                <Button text={getTree}>Copy!</Button>
            </Horizontal>
            <Horizontal>
                <button onClick={prevEC}>Prev EC</button>
                <button onClick={nextEC}>Next EC</button>
            </Horizontal>
        </FullScreen>
    );
};
