
import TutorialLayout from "../../layouts/tutorial";
import notebookStyles from "../../data/tutorials/styles";
import innerHTML from "../../data/tutorials/modeling-protein-ligand-interactions-with-atomic-convolutions.js";
import {useEffect} from "react";
import scrollnav from "scrollnav";

const Modeling_Protein_Ligand_Interactions_With_Atomic_Convolutions = () => {

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

Modeling_Protein_Ligand_Interactions_With_Atomic_Convolutions.Layout = TutorialLayout;

export default Modeling_Protein_Ligand_Interactions_With_Atomic_Convolutions;
