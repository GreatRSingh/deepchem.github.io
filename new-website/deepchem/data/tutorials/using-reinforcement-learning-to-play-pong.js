export default{"html": "<main>\n <div class=\"jp-Cell jp-MarkdownCell jp-Notebook-cell\">\n  <div class=\"jp-Cell-inputWrapper\" tabindex=\"0\">\n   <div class=\"jp-Collapser jp-InputCollapser jp-Cell-inputCollapser\">\n   </div>\n   <div class=\"jp-InputArea jp-Cell-inputArea\">\n    <div class=\"jp-InputPrompt jp-InputArea-prompt\">\n    </div>\n    <div class=\"jp-RenderedHTMLCommon jp-RenderedMarkdown jp-MarkdownOutput\" data-mime-type=\"text/markdown\">\n     <h1>\n      Using Reinforcement Learning to Play Pong\n      <a class=\"anchor-link\" href=\"#Using-Reinforcement-Learning-to-Play-Pong\">\n       \u00b6\n      </a>\n     </h1>\n     <p>\n      This tutorial demonstrates using reinforcement learning to train an agent to play Pong.  This task isn't directly related to chemistry, but video games make an excellent demonstration of reinforcement learning techniques.\n     </p>\n     <p>\n      <img alt=\"title\" src=\"assets/pong.png\"/>\n     </p>\n     <h2>\n      Colab\n      <a class=\"anchor-link\" href=\"#Colab\">\n       \u00b6\n      </a>\n     </h2>\n     <p>\n      This tutorial and the rest in this sequence can be done in Google Colab (although the visualization at the end doesn't work correctly on Colab, so you might prefer to run this tutorial locally). If you'd like to open this notebook in colab, you can use the following link.\n     </p>\n     <p>\n      <a href=\"https://colab.research.google.com/github/deepchem/deepchem/blob/master/examples/tutorials/Using_Reinforcement_Learning_to_Play_Pong.ipynb\">\n       <img alt=\"Open In Colab\" src=\"https://colab.research.google.com/assets/colab-badge.svg\"/>\n      </a>\n     </p>\n    </div>\n   </div>\n  </div>\n </div>\n <div class=\"jp-Cell jp-CodeCell jp-Notebook-cell jp-mod-noOutputs\">\n  <div class=\"jp-Cell-inputWrapper\" tabindex=\"0\">\n   <div class=\"jp-Collapser jp-InputCollapser jp-Cell-inputCollapser\">\n   </div>\n   <div class=\"jp-InputArea jp-Cell-inputArea\">\n    <div class=\"jp-InputPrompt jp-InputArea-prompt\">\n     In\u00a0[\u00a0]:\n    </div>\n    <div class=\"jp-CodeMirrorEditor jp-Editor jp-InputArea-editor\" data-type=\"inline\">\n     <div class=\"cm-editor cm-s-jupyter\">\n      <div class=\"highlight hl-ipython3\">\n       <pre class=\"overflow-x-scroll font-mono\"><span></span><span class=\"o\">!</span>pip<span class=\"w\"> </span>install<span class=\"w\"> </span>--pre<span class=\"w\"> </span>deepchem\n<span class=\"kn\">import</span> <span class=\"nn\">deepchem</span>\n<span class=\"n\">deepchem</span><span class=\"o\">.</span><span class=\"n\">__version__</span>\n</pre>\n      </div>\n     </div>\n    </div>\n   </div>\n  </div>\n </div>\n <div class=\"jp-Cell jp-CodeCell jp-Notebook-cell jp-mod-noOutputs\">\n  <div class=\"jp-Cell-inputWrapper\" tabindex=\"0\">\n   <div class=\"jp-Collapser jp-InputCollapser jp-Cell-inputCollapser\">\n   </div>\n   <div class=\"jp-InputArea jp-Cell-inputArea\">\n    <div class=\"jp-InputPrompt jp-InputArea-prompt\">\n     In\u00a0[\u00a0]:\n    </div>\n    <div class=\"jp-CodeMirrorEditor jp-Editor jp-InputArea-editor\" data-type=\"inline\">\n     <div class=\"cm-editor cm-s-jupyter\">\n      <div class=\"highlight hl-ipython3\">\n       <pre class=\"overflow-x-scroll font-mono\"><span></span><span class=\"o\">!</span>pip<span class=\"w\"> </span>install<span class=\"w\"> </span><span class=\"s1\">'gym[atari]'</span>\n</pre>\n      </div>\n     </div>\n    </div>\n   </div>\n  </div>\n </div>\n <div class=\"jp-Cell jp-MarkdownCell jp-Notebook-cell\">\n  <div class=\"jp-Cell-inputWrapper\" tabindex=\"0\">\n   <div class=\"jp-Collapser jp-InputCollapser jp-Cell-inputCollapser\">\n   </div>\n   <div class=\"jp-InputArea jp-Cell-inputArea\">\n    <div class=\"jp-InputPrompt jp-InputArea-prompt\">\n    </div>\n    <div class=\"jp-RenderedHTMLCommon jp-RenderedMarkdown jp-MarkdownOutput\" data-mime-type=\"text/markdown\">\n     <h2>\n      Reinforcement Learning\n      <a class=\"anchor-link\" href=\"#Reinforcement-Learning\">\n       \u00b6\n      </a>\n     </h2>\n     <p>\n      Reinforcement learning involves an\n      <em>\n       agent\n      </em>\n      that interacts with an\n      <em>\n       environment\n      </em>\n      .  In this case, the environment is the video game and the agent is the player.  By trial and error, the agent learns a\n      <em>\n       policy\n      </em>\n      that it follows to perform some task (winning the game).  As it plays, it receives\n      <em>\n       rewards\n      </em>\n      that give it feedback on how well it is doing.  In this case, it receives a positive reward every time it scores a point and a negative reward every time the other player scores a point.\n     </p>\n     <p>\n      The first step is to create an\n      <code>\n       Environment\n      </code>\n      that implements this task.  Fortunately,\nOpenAI Gym already provides an implementation of Pong (and many other tasks appropriate\nfor reinforcement learning).  DeepChem's\n      <code>\n       GymEnvironment\n      </code>\n      class provides an easy way to\nuse environments from OpenAI Gym.  We could just use it directly, but in this case we\nsubclass it and preprocess the screen image a little bit to make learning easier.\n     </p>\n    </div>\n   </div>\n  </div>\n </div>\n <div class=\"jp-Cell jp-CodeCell jp-Notebook-cell jp-mod-noOutputs\">\n  <div class=\"jp-Cell-inputWrapper\" tabindex=\"0\">\n   <div class=\"jp-Collapser jp-InputCollapser jp-Cell-inputCollapser\">\n   </div>\n   <div class=\"jp-InputArea jp-Cell-inputArea\">\n    <div class=\"jp-InputPrompt jp-InputArea-prompt\">\n     In\u00a0[\u00a0]:\n    </div>\n    <div class=\"jp-CodeMirrorEditor jp-Editor jp-InputArea-editor\" data-type=\"inline\">\n     <div class=\"cm-editor cm-s-jupyter\">\n      <div class=\"highlight hl-ipython3\">\n       <pre class=\"overflow-x-scroll font-mono\"><span></span><span class=\"kn\">import</span> <span class=\"nn\">deepchem</span> <span class=\"k\">as</span> <span class=\"nn\">dc</span>\n<span class=\"kn\">import</span> <span class=\"nn\">numpy</span> <span class=\"k\">as</span> <span class=\"nn\">np</span>\n\n<span class=\"k\">class</span> <span class=\"nc\">PongEnv</span><span class=\"p\">(</span><span class=\"n\">dc</span><span class=\"o\">.</span><span class=\"n\">rl</span><span class=\"o\">.</span><span class=\"n\">GymEnvironment</span><span class=\"p\">):</span>\n  <span class=\"k\">def</span> <span class=\"fm\">__init__</span><span class=\"p\">(</span><span class=\"bp\">self</span><span class=\"p\">):</span>\n    <span class=\"nb\">super</span><span class=\"p\">(</span><span class=\"n\">PongEnv</span><span class=\"p\">,</span> <span class=\"bp\">self</span><span class=\"p\">)</span><span class=\"o\">.</span><span class=\"fm\">__init__</span><span class=\"p\">(</span><span class=\"s1\">'Pong-v0'</span><span class=\"p\">)</span>\n    <span class=\"bp\">self</span><span class=\"o\">.</span><span class=\"n\">_state_shape</span> <span class=\"o\">=</span> <span class=\"p\">(</span><span class=\"mi\">80</span><span class=\"p\">,</span> <span class=\"mi\">80</span><span class=\"p\">)</span>\n  \n  <span class=\"nd\">@property</span>\n  <span class=\"k\">def</span> <span class=\"nf\">state</span><span class=\"p\">(</span><span class=\"bp\">self</span><span class=\"p\">):</span>\n    <span class=\"c1\"># Crop everything outside the play area, reduce the image size,</span>\n    <span class=\"c1\"># and convert it to black and white.</span>\n    <span class=\"n\">cropped</span> <span class=\"o\">=</span> <span class=\"n\">np</span><span class=\"o\">.</span><span class=\"n\">array</span><span class=\"p\">(</span><span class=\"bp\">self</span><span class=\"o\">.</span><span class=\"n\">_state</span><span class=\"p\">)[</span><span class=\"mi\">34</span><span class=\"p\">:</span><span class=\"mi\">194</span><span class=\"p\">,</span> <span class=\"p\">:,</span> <span class=\"p\">:]</span>\n    <span class=\"n\">reduced</span> <span class=\"o\">=</span> <span class=\"n\">cropped</span><span class=\"p\">[</span><span class=\"mi\">0</span><span class=\"p\">:</span><span class=\"o\">-</span><span class=\"mi\">1</span><span class=\"p\">:</span><span class=\"mi\">2</span><span class=\"p\">,</span> <span class=\"mi\">0</span><span class=\"p\">:</span><span class=\"o\">-</span><span class=\"mi\">1</span><span class=\"p\">:</span><span class=\"mi\">2</span><span class=\"p\">]</span>\n    <span class=\"n\">grayscale</span> <span class=\"o\">=</span> <span class=\"n\">np</span><span class=\"o\">.</span><span class=\"n\">sum</span><span class=\"p\">(</span><span class=\"n\">reduced</span><span class=\"p\">,</span> <span class=\"n\">axis</span><span class=\"o\">=</span><span class=\"mi\">2</span><span class=\"p\">)</span>\n    <span class=\"n\">bw</span> <span class=\"o\">=</span> <span class=\"n\">np</span><span class=\"o\">.</span><span class=\"n\">zeros</span><span class=\"p\">(</span><span class=\"n\">grayscale</span><span class=\"o\">.</span><span class=\"n\">shape</span><span class=\"p\">)</span>\n    <span class=\"n\">bw</span><span class=\"p\">[</span><span class=\"n\">grayscale</span> <span class=\"o\">!=</span> <span class=\"mi\">233</span><span class=\"p\">]</span> <span class=\"o\">=</span> <span class=\"mi\">1</span>\n    <span class=\"k\">return</span> <span class=\"n\">bw</span>\n\n  <span class=\"k\">def</span> <span class=\"nf\">__deepcopy__</span><span class=\"p\">(</span><span class=\"bp\">self</span><span class=\"p\">,</span> <span class=\"n\">memo</span><span class=\"p\">):</span>\n    <span class=\"k\">return</span> <span class=\"n\">PongEnv</span><span class=\"p\">()</span>\n\n<span class=\"n\">env</span> <span class=\"o\">=</span> <span class=\"n\">PongEnv</span><span class=\"p\">()</span>\n</pre>\n      </div>\n     </div>\n    </div>\n   </div>\n  </div>\n </div>\n <div class=\"jp-Cell jp-MarkdownCell jp-Notebook-cell\">\n  <div class=\"jp-Cell-inputWrapper\" tabindex=\"0\">\n   <div class=\"jp-Collapser jp-InputCollapser jp-Cell-inputCollapser\">\n   </div>\n   <div class=\"jp-InputArea jp-Cell-inputArea\">\n    <div class=\"jp-InputPrompt jp-InputArea-prompt\">\n    </div>\n    <div class=\"jp-RenderedHTMLCommon jp-RenderedMarkdown jp-MarkdownOutput\" data-mime-type=\"text/markdown\">\n     <p>\n      Next we create a model to implement our policy.  This model receives the current state of the environment (the pixels being displayed on the screen at this moment) as its input.  Given that input, it decides what action to perform.  In Pong there are three possible actions at any moment: move the paddle up, move it down, or leave it where it is.  The policy model produces a probability distribution over these actions.  It also produces a\n      <em>\n       value\n      </em>\n      output, which is interpreted as an estimate of how good the current state is.  This turns out to be important for efficient learning.\n     </p>\n     <p>\n      The model begins with two convolutional layers to process the image.  That is followed by a dense (fully connected) layer to provide plenty of capacity for game logic.  We also add a small Gated Recurrent Unit (GRU).  That gives the network a little bit of memory, so it can keep track of which way the ball is moving.  Just from the screen image, you cannot tell whether the ball is moving to the left or to the right, so having memory is important.\n     </p>\n     <p>\n      We concatenate the dense and GRU outputs together, and use them as inputs to two final layers that serve as the\nnetwork's outputs.  One computes the action probabilities, and the other computes an estimate of the\nstate value function.\n     </p>\n     <p>\n      We also provide an input for the initial state of the GRU, and return its final state at the end.  This is required by the learning algorithm.\n     </p>\n    </div>\n   </div>\n  </div>\n </div>\n <div class=\"jp-Cell jp-CodeCell jp-Notebook-cell jp-mod-noOutputs\">\n  <div class=\"jp-Cell-inputWrapper\" tabindex=\"0\">\n   <div class=\"jp-Collapser jp-InputCollapser jp-Cell-inputCollapser\">\n   </div>\n   <div class=\"jp-InputArea jp-Cell-inputArea\">\n    <div class=\"jp-InputPrompt jp-InputArea-prompt\">\n     In\u00a0[\u00a0]:\n    </div>\n    <div class=\"jp-CodeMirrorEditor jp-Editor jp-InputArea-editor\" data-type=\"inline\">\n     <div class=\"cm-editor cm-s-jupyter\">\n      <div class=\"highlight hl-ipython3\">\n       <pre class=\"overflow-x-scroll font-mono\"><span></span><span class=\"kn\">import</span> <span class=\"nn\">tensorflow</span> <span class=\"k\">as</span> <span class=\"nn\">tf</span>\n<span class=\"kn\">from</span> <span class=\"nn\">tensorflow.keras.layers</span> <span class=\"kn\">import</span> <span class=\"n\">Input</span><span class=\"p\">,</span> <span class=\"n\">Concatenate</span><span class=\"p\">,</span> <span class=\"n\">Conv2D</span><span class=\"p\">,</span> <span class=\"n\">Dense</span><span class=\"p\">,</span> <span class=\"n\">Flatten</span><span class=\"p\">,</span> <span class=\"n\">GRU</span><span class=\"p\">,</span> <span class=\"n\">Reshape</span>\n\n<span class=\"k\">class</span> <span class=\"nc\">PongPolicy</span><span class=\"p\">(</span><span class=\"n\">dc</span><span class=\"o\">.</span><span class=\"n\">rl</span><span class=\"o\">.</span><span class=\"n\">Policy</span><span class=\"p\">):</span>\n    <span class=\"k\">def</span> <span class=\"fm\">__init__</span><span class=\"p\">(</span><span class=\"bp\">self</span><span class=\"p\">):</span>\n        <span class=\"nb\">super</span><span class=\"p\">(</span><span class=\"n\">PongPolicy</span><span class=\"p\">,</span> <span class=\"bp\">self</span><span class=\"p\">)</span><span class=\"o\">.</span><span class=\"fm\">__init__</span><span class=\"p\">([</span><span class=\"s1\">'action_prob'</span><span class=\"p\">,</span> <span class=\"s1\">'value'</span><span class=\"p\">,</span> <span class=\"s1\">'rnn_state'</span><span class=\"p\">],</span> <span class=\"p\">[</span><span class=\"n\">np</span><span class=\"o\">.</span><span class=\"n\">zeros</span><span class=\"p\">(</span><span class=\"mi\">16</span><span class=\"p\">)])</span>\n\n    <span class=\"k\">def</span> <span class=\"nf\">create_model</span><span class=\"p\">(</span><span class=\"bp\">self</span><span class=\"p\">,</span> <span class=\"o\">**</span><span class=\"n\">kwargs</span><span class=\"p\">):</span>\n        <span class=\"n\">state</span> <span class=\"o\">=</span> <span class=\"n\">Input</span><span class=\"p\">(</span><span class=\"n\">shape</span><span class=\"o\">=</span><span class=\"p\">(</span><span class=\"mi\">80</span><span class=\"p\">,</span> <span class=\"mi\">80</span><span class=\"p\">))</span>\n        <span class=\"n\">rnn_state</span> <span class=\"o\">=</span> <span class=\"n\">Input</span><span class=\"p\">(</span><span class=\"n\">shape</span><span class=\"o\">=</span><span class=\"p\">(</span><span class=\"mi\">16</span><span class=\"p\">,))</span>\n        <span class=\"n\">conv1</span> <span class=\"o\">=</span> <span class=\"n\">Conv2D</span><span class=\"p\">(</span><span class=\"mi\">16</span><span class=\"p\">,</span> <span class=\"n\">kernel_size</span><span class=\"o\">=</span><span class=\"mi\">8</span><span class=\"p\">,</span> <span class=\"n\">strides</span><span class=\"o\">=</span><span class=\"mi\">4</span><span class=\"p\">,</span> <span class=\"n\">activation</span><span class=\"o\">=</span><span class=\"n\">tf</span><span class=\"o\">.</span><span class=\"n\">nn</span><span class=\"o\">.</span><span class=\"n\">relu</span><span class=\"p\">)(</span><span class=\"n\">Reshape</span><span class=\"p\">((</span><span class=\"mi\">80</span><span class=\"p\">,</span> <span class=\"mi\">80</span><span class=\"p\">,</span> <span class=\"mi\">1</span><span class=\"p\">))(</span><span class=\"n\">state</span><span class=\"p\">))</span>\n        <span class=\"n\">conv2</span> <span class=\"o\">=</span> <span class=\"n\">Conv2D</span><span class=\"p\">(</span><span class=\"mi\">32</span><span class=\"p\">,</span> <span class=\"n\">kernel_size</span><span class=\"o\">=</span><span class=\"mi\">4</span><span class=\"p\">,</span> <span class=\"n\">strides</span><span class=\"o\">=</span><span class=\"mi\">2</span><span class=\"p\">,</span> <span class=\"n\">activation</span><span class=\"o\">=</span><span class=\"n\">tf</span><span class=\"o\">.</span><span class=\"n\">nn</span><span class=\"o\">.</span><span class=\"n\">relu</span><span class=\"p\">)(</span><span class=\"n\">conv1</span><span class=\"p\">)</span>\n        <span class=\"n\">dense</span> <span class=\"o\">=</span> <span class=\"n\">Dense</span><span class=\"p\">(</span><span class=\"mi\">256</span><span class=\"p\">,</span> <span class=\"n\">activation</span><span class=\"o\">=</span><span class=\"n\">tf</span><span class=\"o\">.</span><span class=\"n\">nn</span><span class=\"o\">.</span><span class=\"n\">relu</span><span class=\"p\">)(</span><span class=\"n\">Flatten</span><span class=\"p\">()(</span><span class=\"n\">conv2</span><span class=\"p\">))</span>\n        <span class=\"n\">gru</span><span class=\"p\">,</span> <span class=\"n\">rnn_final_state</span> <span class=\"o\">=</span> <span class=\"n\">GRU</span><span class=\"p\">(</span><span class=\"mi\">16</span><span class=\"p\">,</span> <span class=\"n\">return_state</span><span class=\"o\">=</span><span class=\"kc\">True</span><span class=\"p\">,</span> <span class=\"n\">return_sequences</span><span class=\"o\">=</span><span class=\"kc\">True</span><span class=\"p\">,</span> <span class=\"n\">time_major</span><span class=\"o\">=</span><span class=\"kc\">True</span><span class=\"p\">)(</span>\n            <span class=\"n\">Reshape</span><span class=\"p\">((</span><span class=\"o\">-</span><span class=\"mi\">1</span><span class=\"p\">,</span> <span class=\"mi\">256</span><span class=\"p\">))(</span><span class=\"n\">dense</span><span class=\"p\">),</span> <span class=\"n\">initial_state</span><span class=\"o\">=</span><span class=\"n\">rnn_state</span><span class=\"p\">)</span>\n        <span class=\"n\">concat</span> <span class=\"o\">=</span> <span class=\"n\">Concatenate</span><span class=\"p\">()([</span><span class=\"n\">dense</span><span class=\"p\">,</span> <span class=\"n\">Reshape</span><span class=\"p\">((</span><span class=\"mi\">16</span><span class=\"p\">,))(</span><span class=\"n\">gru</span><span class=\"p\">)])</span>\n        <span class=\"n\">action_prob</span> <span class=\"o\">=</span> <span class=\"n\">Dense</span><span class=\"p\">(</span><span class=\"n\">env</span><span class=\"o\">.</span><span class=\"n\">n_actions</span><span class=\"p\">,</span> <span class=\"n\">activation</span><span class=\"o\">=</span><span class=\"n\">tf</span><span class=\"o\">.</span><span class=\"n\">nn</span><span class=\"o\">.</span><span class=\"n\">softmax</span><span class=\"p\">)(</span><span class=\"n\">concat</span><span class=\"p\">)</span>\n        <span class=\"n\">value</span> <span class=\"o\">=</span> <span class=\"n\">Dense</span><span class=\"p\">(</span><span class=\"mi\">1</span><span class=\"p\">)(</span><span class=\"n\">concat</span><span class=\"p\">)</span>\n        <span class=\"k\">return</span> <span class=\"n\">tf</span><span class=\"o\">.</span><span class=\"n\">keras</span><span class=\"o\">.</span><span class=\"n\">Model</span><span class=\"p\">(</span><span class=\"n\">inputs</span><span class=\"o\">=</span><span class=\"p\">[</span><span class=\"n\">state</span><span class=\"p\">,</span> <span class=\"n\">rnn_state</span><span class=\"p\">],</span> <span class=\"n\">outputs</span><span class=\"o\">=</span><span class=\"p\">[</span><span class=\"n\">action_prob</span><span class=\"p\">,</span> <span class=\"n\">value</span><span class=\"p\">,</span> <span class=\"n\">rnn_final_state</span><span class=\"p\">])</span>\n\n<span class=\"n\">policy</span> <span class=\"o\">=</span> <span class=\"n\">PongPolicy</span><span class=\"p\">()</span>\n</pre>\n      </div>\n     </div>\n    </div>\n   </div>\n  </div>\n </div>\n <div class=\"jp-Cell jp-MarkdownCell jp-Notebook-cell\">\n  <div class=\"jp-Cell-inputWrapper\" tabindex=\"0\">\n   <div class=\"jp-Collapser jp-InputCollapser jp-Cell-inputCollapser\">\n   </div>\n   <div class=\"jp-InputArea jp-Cell-inputArea\">\n    <div class=\"jp-InputPrompt jp-InputArea-prompt\">\n    </div>\n    <div class=\"jp-RenderedHTMLCommon jp-RenderedMarkdown jp-MarkdownOutput\" data-mime-type=\"text/markdown\">\n     <p>\n      We will optimize the policy using the Advantage Actor Critic (A2C) algorithm.  There are lots of hyperparameters we could specify at this point, but the default values for most of them work well on this problem.  The only one we need to customize is the learning rate.\n     </p>\n    </div>\n   </div>\n  </div>\n </div>\n <div class=\"jp-Cell jp-CodeCell jp-Notebook-cell jp-mod-noOutputs\">\n  <div class=\"jp-Cell-inputWrapper\" tabindex=\"0\">\n   <div class=\"jp-Collapser jp-InputCollapser jp-Cell-inputCollapser\">\n   </div>\n   <div class=\"jp-InputArea jp-Cell-inputArea\">\n    <div class=\"jp-InputPrompt jp-InputArea-prompt\">\n     In\u00a0[\u00a0]:\n    </div>\n    <div class=\"jp-CodeMirrorEditor jp-Editor jp-InputArea-editor\" data-type=\"inline\">\n     <div class=\"cm-editor cm-s-jupyter\">\n      <div class=\"highlight hl-ipython3\">\n       <pre class=\"overflow-x-scroll font-mono\"><span></span><span class=\"kn\">from</span> <span class=\"nn\">deepchem.models.optimizers</span> <span class=\"kn\">import</span> <span class=\"n\">Adam</span>\n<span class=\"n\">a2c</span> <span class=\"o\">=</span> <span class=\"n\">dc</span><span class=\"o\">.</span><span class=\"n\">rl</span><span class=\"o\">.</span><span class=\"n\">A2C</span><span class=\"p\">(</span><span class=\"n\">env</span><span class=\"p\">,</span> <span class=\"n\">policy</span><span class=\"p\">,</span> <span class=\"n\">model_dir</span><span class=\"o\">=</span><span class=\"s1\">'model'</span><span class=\"p\">,</span> <span class=\"n\">optimizer</span><span class=\"o\">=</span><span class=\"n\">Adam</span><span class=\"p\">(</span><span class=\"n\">learning_rate</span><span class=\"o\">=</span><span class=\"mf\">0.0002</span><span class=\"p\">))</span>\n</pre>\n      </div>\n     </div>\n    </div>\n   </div>\n  </div>\n </div>\n <div class=\"jp-Cell jp-MarkdownCell jp-Notebook-cell\">\n  <div class=\"jp-Cell-inputWrapper\" tabindex=\"0\">\n   <div class=\"jp-Collapser jp-InputCollapser jp-Cell-inputCollapser\">\n   </div>\n   <div class=\"jp-InputArea jp-Cell-inputArea\">\n    <div class=\"jp-InputPrompt jp-InputArea-prompt\">\n    </div>\n    <div class=\"jp-RenderedHTMLCommon jp-RenderedMarkdown jp-MarkdownOutput\" data-mime-type=\"text/markdown\">\n     <p>\n      Optimize for as long as you have patience to.  By 1 million steps you should see clear signs of learning.  Around 3 million steps it should start to occasionally beat the game's built in AI.  By 7 million steps it should be winning almost every time.  Running on my laptop, training takes about 20 minutes for every million steps.\n     </p>\n    </div>\n   </div>\n  </div>\n </div>\n <div class=\"jp-Cell jp-CodeCell jp-Notebook-cell jp-mod-noOutputs\">\n  <div class=\"jp-Cell-inputWrapper\" tabindex=\"0\">\n   <div class=\"jp-Collapser jp-InputCollapser jp-Cell-inputCollapser\">\n   </div>\n   <div class=\"jp-InputArea jp-Cell-inputArea\">\n    <div class=\"jp-InputPrompt jp-InputArea-prompt\">\n     In\u00a0[\u00a0]:\n    </div>\n    <div class=\"jp-CodeMirrorEditor jp-Editor jp-InputArea-editor\" data-type=\"inline\">\n     <div class=\"cm-editor cm-s-jupyter\">\n      <div class=\"highlight hl-ipython3\">\n       <pre class=\"overflow-x-scroll font-mono\"><span></span><span class=\"c1\"># Change this to train as many steps as you have patience for.</span>\n<span class=\"n\">a2c</span><span class=\"o\">.</span><span class=\"n\">fit</span><span class=\"p\">(</span><span class=\"mi\">1000</span><span class=\"p\">)</span>\n</pre>\n      </div>\n     </div>\n    </div>\n   </div>\n  </div>\n </div>\n <div class=\"jp-Cell jp-MarkdownCell jp-Notebook-cell\">\n  <div class=\"jp-Cell-inputWrapper\" tabindex=\"0\">\n   <div class=\"jp-Collapser jp-InputCollapser jp-Cell-inputCollapser\">\n   </div>\n   <div class=\"jp-InputArea jp-Cell-inputArea\">\n    <div class=\"jp-InputPrompt jp-InputArea-prompt\">\n    </div>\n    <div class=\"jp-RenderedHTMLCommon jp-RenderedMarkdown jp-MarkdownOutput\" data-mime-type=\"text/markdown\">\n     <p>\n      Let's watch it play and see how it does!\n     </p>\n    </div>\n   </div>\n  </div>\n </div>\n <div class=\"jp-Cell jp-CodeCell jp-Notebook-cell jp-mod-noOutputs\">\n  <div class=\"jp-Cell-inputWrapper\" tabindex=\"0\">\n   <div class=\"jp-Collapser jp-InputCollapser jp-Cell-inputCollapser\">\n   </div>\n   <div class=\"jp-InputArea jp-Cell-inputArea\">\n    <div class=\"jp-InputPrompt jp-InputArea-prompt\">\n     In\u00a0[\u00a0]:\n    </div>\n    <div class=\"jp-CodeMirrorEditor jp-Editor jp-InputArea-editor\" data-type=\"inline\">\n     <div class=\"cm-editor cm-s-jupyter\">\n      <div class=\"highlight hl-ipython3\">\n       <pre class=\"overflow-x-scroll font-mono\"><span></span><span class=\"c1\"># This code doesn't work well on Colab</span>\n<span class=\"n\">env</span><span class=\"o\">.</span><span class=\"n\">reset</span><span class=\"p\">()</span>\n<span class=\"k\">while</span> <span class=\"ow\">not</span> <span class=\"n\">env</span><span class=\"o\">.</span><span class=\"n\">terminated</span><span class=\"p\">:</span>\n    <span class=\"n\">env</span><span class=\"o\">.</span><span class=\"n\">env</span><span class=\"o\">.</span><span class=\"n\">render</span><span class=\"p\">()</span>\n    <span class=\"n\">env</span><span class=\"o\">.</span><span class=\"n\">step</span><span class=\"p\">(</span><span class=\"n\">a2c</span><span class=\"o\">.</span><span class=\"n\">select_action</span><span class=\"p\">(</span><span class=\"n\">env</span><span class=\"o\">.</span><span class=\"n\">state</span><span class=\"p\">))</span>\n</pre>\n      </div>\n     </div>\n    </div>\n   </div>\n  </div>\n </div>\n <div class=\"jp-Cell jp-MarkdownCell jp-Notebook-cell\">\n  <div class=\"jp-Cell-inputWrapper\" tabindex=\"0\">\n   <div class=\"jp-Collapser jp-InputCollapser jp-Cell-inputCollapser\">\n   </div>\n   <div class=\"jp-InputArea jp-Cell-inputArea\">\n    <div class=\"jp-InputPrompt jp-InputArea-prompt\">\n    </div>\n    <div class=\"jp-RenderedHTMLCommon jp-RenderedMarkdown jp-MarkdownOutput\" data-mime-type=\"text/markdown\">\n     <h1>\n      Congratulations! Time to join the Community!\n      <a class=\"anchor-link\" href=\"#Congratulations!-Time-to-join-the-Community!\">\n       \u00b6\n      </a>\n     </h1>\n     <p>\n      Congratulations on completing this tutorial notebook! If you enjoyed working through the tutorial, and want to continue working with DeepChem, we encourage you to finish the rest of the tutorials in this series. You can also help the DeepChem community in the following ways:\n     </p>\n     <h2>\n      Star DeepChem on\n      <a href=\"https://github.com/deepchem/deepchem\">\n       GitHub\n      </a>\n      <a class=\"anchor-link\" href=\"#Star-DeepChem-on-GitHub\">\n       \u00b6\n      </a>\n     </h2>\n     <p>\n      This helps build awareness of the DeepChem project and the tools for open source drug discovery that we're trying to build.\n     </p>\n     <h2>\n      Join the DeepChem Gitter\n      <a class=\"anchor-link\" href=\"#Join-the-DeepChem-Gitter\">\n       \u00b6\n      </a>\n     </h2>\n     <p>\n      The DeepChem\n      <a href=\"https://gitter.im/deepchem/Lobby\">\n       Gitter\n      </a>\n      hosts a number of scientists, developers, and enthusiasts interested in deep learning for the life sciences. Join the conversation!\n     </p>\n    </div>\n   </div>\n  </div>\n </div>\n</main>\n"}