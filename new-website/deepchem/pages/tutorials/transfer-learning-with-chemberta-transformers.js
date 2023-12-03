
import TutorialLayout from "../../layouts/tutorial";
import notebookStyles from "../../data/tutorials/styles";
import innerHTML from "../../data/tutorials/transfer-learning-with-chemberta-transformers.js";
import {useEffect} from "react";
import scrollnav from "scrollnav";

const Transfer_Learning_With_ChemBERTa_Transformers = () => {

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

Transfer_Learning_With_ChemBERTa_Transformers.Layout = TutorialLayout;

export default Transfer_Learning_With_ChemBERTa_Transformers;
