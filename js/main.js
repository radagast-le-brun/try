function handleMath() {
  const node = document.getElementsByTagName('article')[0];
  const mathInline = node.getElementsByClassName('math-inline');
  const hasMath =
    mathInline.length + node.getElementsByClassName('math-block').length > 0;
  if (hasMath) {
    Array.from(mathInline).forEach((item) => handleMathLine(item));
    renderMath(node, node);
  }
}
function highlightFormat() {
  const prettyprintNodes = Array.from(
    document.getElementsByClassName('prettyprint')
  );

  if (prettyprintNodes.length > 0) {
      prettyprintNodes.forEach((item) => hljs.highlightBlock(item));
  }
}
function highlightFormatWrapper() {
  try {
    highlightFormat();
    handleMath();
  } catch (err) {
    console.log(err);
    return 'ERROR';
  }
}

function loadContent(content) {
    if(window.loadContentHandler){
        clearTimeout(loadContentHandler);
    }
    window.loadContentHandler = setTimeout(function(){
        proceedLoadContent(content);
    }, 100);
}

function proceedLoadContent(content) {
  try {
    const node = document.getElementsByTagName('article')[0];
    node.innerText = '';
    node.innerHTML = content;
      if (handleMath) {
          handleMath();
      }
      if (highlightFormat) {highlightFormat();}

      if (window.mermaidHandler) {
          clearTimeout(mermaidHandler);
      }
      window.mermaidHandler = setTimeout(setTimeout(function(){
      const mermaidNodes = document.getElementsByClassName('mermaid');
      if (mermaidNodes.length > 0) {
        mermaid.init({}, mermaidNodes);
      }
    }), 100);
  } catch (err) {
    console.log(err);
    return 'ERROR';
  }
}



function highlightSearch(term) {
  const myHilitor = new Hilitor('post-content');
  myHilitor.apply(term);
}

function locateAnchorName(anchor) {
  const element = document.getElementsByName(anchor)[0];
  if (element) {
    element.scrollIntoView();
  }
}

function locateAnchorId(anchorId) {
  const element = document.getElementById(anchorId);
  if (element) {
    element.scrollIntoView();
  }
}

function triggerCheck(str) {
  if (element.checked) {
    window.location = 'triggerCheck:' + str;
  } else {
    window.location = 'triggerUnCheck:' + str;
  }
}

function triggerCheckGFM(str, element) {
  if (element.checked) {
    window.location = 'triggerCheckGFM:' + str;
  } else {
    window.location = 'triggerUnCheckGFM:' + str;
  }
}

function initMermaid() {
  mermaid.initialize({ startOnLoad: true });
  mermaid.parseError = function (err, hash) {
    console.log(err);
  };
}

document.addEventListener('DOMContentLoaded', function (event) {
  setTimeout(highlightFormatWrapper, 500);
  setTimeout(initMermaid, 1000);
});
