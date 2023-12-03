
import TutorialLayout from "../../layouts/tutorial";
import notebookStyles from "../../data/tutorials/styles";
import innerHTML from "../../data/tutorials/exploring-quantum-chemistry-with-gdb1k.js";
import {useEffect} from "react";
import scrollnav from "scrollnav";

const Exploring_Quantum_Chemistry_with_GDB1k = () => {

useEffect(() => {
        document.getElementsByClassName('scroll-nav')[0]?.remove();
        const content = document.querySelector(".notebook");
        const insertTarget = document.querySelector(".notebook");

        if (insertTarget && content) {
            scrollnav.init(content, {
                sections: "h1, h2", insertTarget: insertTarget, insertLocation: "after",
            });
        }

        MathJax?.Hub?.Queue(["Typeset", MathJax.Hub]);
    }, []);

return <div
    className="overflow-x-scroll"
    dangerouslySetInnerHTML={{__html: `${innerHTML.html} ${notebookStyles}`,}}
></div>
}

Exploring_Quantum_Chemistry_with_GDB1k.Layout = TutorialLayout;

export default Exploring_Quantum_Chemistry_with_GDB1k;
