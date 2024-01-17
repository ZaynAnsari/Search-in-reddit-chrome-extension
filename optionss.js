window.onload = function(){
document.getElementById("displayText").onclick = async () => {
  const [tab] = await chrome.tabs.query({active: true, currentWindow: true});
  let result;
  try {
    [{result}] = await chrome.scripting.executeScript({
      target: {tabId: tab.id},
      func: () => getSelection().toString()
    });
  } catch (e) {
    return ; // ignoring an unsupported page like chrome://extensions
  }
  document.body.append(chrome.tabs.create({url: 'https://www.reddit.com/search/?q=' + result}));
};
} 

