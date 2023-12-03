
import TutorialLayout from "../../layouts/tutorial";
import notebookStyles from "../../data/tutorials/styles";
import innerHTML from "../../data/tutorials/deep-probabilistic-analysis-of-single-cell-omics-data.js";
import {useEffect} from "react";
import scrollnav from "scrollnav";

const Deep_probabilistic_analysis_of_single_cell_omics_data = () => {

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

Deep_probabilistic_analysis_of_single_cell_omics_data.Layout = TutorialLayout;

export default Deep_probabilistic_analysis_of_single_cell_omics_data;
