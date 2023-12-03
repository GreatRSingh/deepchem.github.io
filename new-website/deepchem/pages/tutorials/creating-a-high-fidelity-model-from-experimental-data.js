
import TutorialLayout from "../../layouts/tutorial";
import notebookStyles from "../../data/tutorials/styles";
import innerHTML from "../../data/tutorials/creating-a-high-fidelity-model-from-experimental-data.js";
import {useEffect} from "react";
import scrollnav from "scrollnav";

const Creating_a_high_fidelity_model_from_experimental_data = () => {

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

Creating_a_high_fidelity_model_from_experimental_data.Layout = TutorialLayout;

export default Creating_a_high_fidelity_model_from_experimental_data;
