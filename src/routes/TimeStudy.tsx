import { ChangeEventHandler, useEffect, useState } from "react";
import { trees as generateTrees } from "../lib/tree";
import { getAffordableStudiesFromStudyList } from "../functions/studies";
import { PathButton } from "../components/PathButton";
import { CopyButton } from "../components/CopyButton";
import { Row, Container, Col, Form } from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";

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
        <Container className="mt-5">
            <Row className="justify-content-md-center">
                <Col xs="auto">
                    <h1>Current PATH: {get2ndPath || "active"}</h1>
                </Col>
            </Row>
            <Row className="justify-content-md-center">
                <Col xs="auto">
                    <PathButton
                        color="#ff0100"
                        onClick={() => set2ndPath("active")}
                    >
                        Active
                    </PathButton>
                </Col>
                <Col xs="auto">
                    <PathButton
                        color="#5e33b6"
                        onClick={() => set2ndPath("passive")}
                    >
                        Passive
                    </PathButton>
                </Col>
                <Col xs="auto">
                    <PathButton
                        color="#0080ff"
                        onClick={() => set2ndPath("idle")}
                    >
                        Idle
                    </PathButton>
                </Col>
            </Row>
            <InputGroup>
                <InputGroup.Text>You have</InputGroup.Text>
                <Form.Control
                    type="number"
                    onChange={onTheormsInput}
                    value={getTheorms.toString()}
                />
                <InputGroup.Text>Theorems</InputGroup.Text>
            </InputGroup>
            <InputGroup className="mt-3">
                <Form.Control
                    as="textarea"
                    rows={1}
                    value={getPath}
                    readOnly
                    style={{ resize: "none" }}
                ></Form.Control>
                <CopyButton text={getPath}>Copy!</CopyButton>
            </InputGroup>
        </Container>
    );
};
