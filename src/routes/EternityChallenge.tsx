import { useEffect, useState } from "react";
import { FullScreen } from "../components/FullScreen";
import { Horizontal } from "../components/Horizontal";
import { findEC } from "../utils/databases/eternitychallenges";
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

    useEffect(() => {
        const tree = findEC(getChallenge, getCompletion).tree;
        setTree(tree.substring(1, tree.length - 1));
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
            <Horizontal>
                <WrapPre>{getTree}</WrapPre>
                <Button text={getTree}>Copy!</Button>
            </Horizontal>
        </FullScreen>
    );
};
