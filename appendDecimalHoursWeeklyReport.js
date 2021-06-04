// Expects time string in format HH:MM:SS
// Returns o float of the hours in decimals.
function timeStringToFloat(time) {
  const hoursMinutes = time.split(/[.:]/);
  const hours = parseInt(hoursMinutes[0], 10);
  const minutes = hoursMinutes[1] ? parseInt(hoursMinutes[1], 10) : 0;
  return hours + minutes / 60;
}

function onMutation(mutations) {
  for (var i = 0, len = mutations.length; i < len; i++) {
    var added = mutations[i].addedNodes;
    for (var j = 0, node; (node = added[j]); j++) {
      if (node.localName === 'td') {
        if (/\d\d:\d\d:\d\d/.test(node.textContent)) {
          // console.log("Got node", node, `children count ${node.children.length}`);
          replaceText(node)
        }
      } else if (node.firstElementChild) {
        // for (const td of node.getElementsByTagName('td')) {
        //   if (/\d\d/.test(td.textContent)) {
        //     // console.log("Got node", node, `children count ${node.children.length}`);
        //   }
        // }
      }
    }
  }
}

function replaceText(el) {
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  for (let node; (node = walker.nextNode());) {
    const text = node.nodeValue;
    const newText = text.replace(/\d\d:\d\d:\d\d/, (match) => {
      return `${match} ${timeStringToFloat(match).toFixed(2)}h`
    });
    if (text !== newText) {
      node.nodeValue = newText;
    }
  }
}

var observer = new MutationObserver(onMutation);
observer.observe(document, {
  childList: true, // report added/removed nodes
  subtree: true,   // observe any descendant elements
});