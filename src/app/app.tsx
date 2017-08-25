import * as React from "react";
import ProjectList from "../project/project-list";

interface IProps {
    testText?: string
}

class App extends React.Component<IProps> {
    render() {
        return (
            <div>
                <h1>Project List</h1>
                <ProjectList></ProjectList>
            </div>
        );
    }
}

export default App;