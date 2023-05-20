import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navigation } from "./components/Navitation";
import { Home } from "./routes/Home";
import { TimeStudy } from "./routes/TimeStudy";
import { Footer } from "./components/Footer";
import { EternityChallge } from "./routes/EternityChallenge";

export const App = () => {
    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Navigation />
            <Routes>
                <Route path="/" index Component={Home} />
                <Route path="/ts" Component={TimeStudy} />
                <Route path="/ec" Component={EternityChallge} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
};
