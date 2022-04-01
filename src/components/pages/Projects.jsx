// --Hooks--
import { useLocation } from "react-router-dom";

// --Layout--
import Message from "../layout/Message";

function Projects() {

        const location = useLocation();

        let message = '';

        if (location.state) {
            message =location.state.message;

        }

    return (
        <div className="">
            <h1>Meus Projetos</h1>

            {message && <Message type="success" message={message} />}
            
        </div>
    );
}

export default Projects;