import { useEffect, useState } from "react";
import { findEC, order } from "../utils/databases/eternitychallenges";
import { CopyButton } from "../components/CopyButton";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";

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
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col xs="auto">
                    <Form.Label htmlFor="challenge">
                        EternityChallenge
                    </Form.Label>
                    <InputGroup id="challenge">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((n) => {
                            return (
                                <Button
                                    key={n}
                                    onClick={() => setChallenge(n)}
                                    variant={`${
                                        getChallenge === n
                                            ? "success"
                                            : "outline-success"
                                    }`}
                                >
                                    {n}
                                </Button>
                            );
                        })}
                    </InputGroup>
                </Col>
                <Col xs="auto">
                    <Form.Label htmlFor="completion">Completion</Form.Label>
                    <InputGroup id="completion">
                        {[1, 2, 3, 4, 5].map((n) => {
                            return (
                                <Button
                                    key={n}
                                    onClick={() => {
                                        setCompletion(n);
                                    }}
                                    variant={`${
                                        getCompletion === n
                                            ? "success"
                                            : "outline-success"
                                    }`}
                                >
                                    {n}
                                </Button>
                            );
                        })}
                    </InputGroup>
                </Col>
            </Row>
            <Row>
                <Col xs="auto">
                    <Form.Label htmlFor="tree">
                        You Need <b>{getTheorems}</b> Time Theorems
                    </Form.Label>
                </Col>
            </Row>
            <InputGroup id="tree">
                <Form.Control
                    as="textarea"
                    style={{ resize: "none" }}
                    readOnly
                    rows={1}
                    value={getTree}
                ></Form.Control>
                <CopyButton text={getTree}>Copy!</CopyButton>
            </InputGroup>
            <Row className="mt-3 justify-content-center">
                <Col xs="auto">
                    <InputGroup className="mt-3">
                        <Button onClick={prevEC}>◀ Prev EC</Button>
                        <Button onClick={nextEC}>Next EC ▶</Button>
                    </InputGroup>
                </Col>
            </Row>
            {getNote && (
                <>
                    <Row className="mt-3">
                        <Col
                            style={{
                                fontWeight: "bold",
                                fontSize: "1.5em",
                                textAlign: "center",
                            }}
                        >
                            Note
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{ width: "50em", textAlign: "center" }}>
                            {getNote}
                        </Col>
                    </Row>
                </>
            )}
        </Container>
    );
};
