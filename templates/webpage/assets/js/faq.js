let blockAnimation = false;

function getContentDiv(nodes) {
  for (let i = 0; nodes.length > i; i++) {
    if (nodes[i].className === 'content') {
        return nodes[i];
    }
  }
}

function toggleFaqContent(elm) {
  blockAnimation = true;
  const contentElm = getContentDiv(elm.childNodes);
  if (!contentElm.style.opacity || contentElm.style.opacity === 0 ||  contentElm.style.opacity === '0') {
    contentElm.style.maxHeight = '1000px';
    contentElm.style.opacity = 1;
    elm.classList.add('active');
  } else {
    contentElm.style.maxHeight = '0px';
    setTimeout(() => {
      elm.classList.remove('active');
      contentElm.style.opacity = 0;
      blockAnimation = false;
    }, 800);
  }
}
