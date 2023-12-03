
import TutorialLayout from "../../layouts/tutorial";
import notebookStyles from "../../data/tutorials/styles";
import innerHTML from "../../data/tutorials/creating-models-with-tensorflow-and-pytorch.js";
import {useEffect} from "react";
import scrollnav from "scrollnav";

const Creating_Models_with_TensorFlow_and_PyTorch = () => {

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

Creating_Models_with_TensorFlow_and_PyTorch.Layout = TutorialLayout;

export default Creating_Models_with_TensorFlow_and_PyTorch;
