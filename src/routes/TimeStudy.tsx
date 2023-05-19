import { ChangeEventHandler, useEffect, useState } from "react";
import { trees as generateTrees } from "../lib/tree";
import { getAffordableStudiesFromStudyList } from "../functions/studies";
import { PathButton } from "../components/PathButton";

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

    const copyButtonClick = () => {
        navigator.clipboard.writeText(getPath);
    };

    useEffect(() => {
        setTrees(generateTrees(get2ndPath || undefined));
    }, [get2ndPath, getTheorms]);

    useEffect(() => {
        pathRefresh();
    });

    return (
        <div>
            <div>
                <PathButton color="red" onClick={() => set2ndPath("active")}>
                    Active
                </PathButton>
                <PathButton color="blue" onClick={() => set2ndPath("passive")}>
                    Passive
                </PathButton>
                <PathButton color="purple" onClick={() => set2ndPath("idle")}>
                    Idle
                </PathButton>
            </div>
            <input
                type="number"
                onChange={onTheormsInput}
                value={getTheorms.toString()}
            />
            <h1>Current PATH: {get2ndPath || "active"}</h1>
            <div>
                <pre>{getPath}</pre>
                <button onClick={copyButtonClick}>click to copy</button>
            </div>
        </div>
    );
};
