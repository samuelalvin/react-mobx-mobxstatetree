import * as React from "react";
import ProjectList from "../project/project-list";

class App extends React.Component {
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