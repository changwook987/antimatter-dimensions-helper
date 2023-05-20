import { ChangeEventHandler, useEffect, useState } from "react";
import { trees as generateTrees } from "../lib/tree";
import { getAffordableStudiesFromStudyList } from "../functions/studies";
import { PathButton } from "../components/PathButton";
import { FullScreen } from "../components/FullScreen";
import { styled } from "styled-components";
import { Horizontal } from "../components/Horizontal";
import { CopyButton } from "../components/CopyButton";

const WrapPre = styled.pre`
    overflow: scroll;
    width: 80%;
`;

const Button = styled(CopyButton)`
    width: 20%;
`;

export const TimeStudy = () => {
    const [getTrees, setTrees] = useState(generateTrees());
    const [getTheorms, setTheorms] = useState(0);
    const [getPath, setPath] = useState("|0");
    const [get2ndPath, set2ndPath] = useState<string>();

    const onTheormsInput: ChangeEventHandler<HTMLInputElement> = (event) => {
        try {
            const target = event.target as HTMLInputElement;
            const theorms = Math.max(0, parseInt(target.value));
            if (Number.isNaN(theorms)) {
                setTheorms(0);
            } else {
                setTheorms(theorms);
            }
        } catch {
            setTheorms(0);
        }
    };

    const pathRefresh = () => {
        for (const tree of getTrees) {
            if (getTheorms >= tree.requirement) {
                const affordableStudies = getAffordableStudiesFromStudyList(
                    tree.ts,
                    getTheorms
                );
                return setPath(affordableStudies.join(",") + "|0");
            }
        }
        setPath("그런건 웁서용");
    };

    useEffect(() => {
        setTrees(generateTrees(get2ndPath || undefined));
    }, [get2ndPath, getTheorms]);

    useEffect(() => {
        pathRefresh();
    });

    return (
        <FullScreen>
            <h1>Current PATH: {get2ndPath || "active"}</h1>
            <Horizontal>
                <PathButton
                    color="#ff0100"
                    onClick={() => set2ndPath("active")}
                >
                    Active
                </PathButton>
                <PathButton
                    color="#5e33b6"
                    onClick={() => set2ndPath("passive")}
                >
                    Passive
                </PathButton>
                <PathButton color="#0080ff" onClick={() => set2ndPath("idle")}>
                    Idle
                </PathButton>
            </Horizontal>
            <Horizontal>
                You have
                <input
                    type="number"
                    onChange={onTheormsInput}
                    value={getTheorms.toString()}
                />
                Theorems
            </Horizontal>
            <Horizontal>
                <WrapPre>{getPath}</WrapPre>
                <Button text={getPath}>Copy!</Button>
            </Horizontal>
        </FullScreen>
    );
};
