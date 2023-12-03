
import TutorialLayout from "../../layouts/tutorial";
import notebookStyles from "../../data/tutorials/styles";
import innerHTML from "../../data/tutorials/about-node-using-torchdiffeq-in-deepchem.js";
import {useEffect} from "react";
import scrollnav from "scrollnav";

const About_nODE_Using_Torchdiffeq_in_Deepchem = () => {

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

About_nODE_Using_Torchdiffeq_in_Deepchem.Layout = TutorialLayout;

export default About_nODE_Using_Torchdiffeq_in_Deepchem;
