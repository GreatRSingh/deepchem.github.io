
import TutorialLayout from "../../layouts/tutorial";
import notebookStyles from "../../data/tutorials/styles";
import innerHTML from "../../data/tutorials/introduction-to-bioinformatics.js";
import {useEffect} from "react";
import scrollnav from "scrollnav";

const Introduction_to_Bioinformatics = () => {

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

Introduction_to_Bioinformatics.Layout = TutorialLayout;

export default Introduction_to_Bioinformatics;
