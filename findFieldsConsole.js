function subsInit(d, w) {
  if(!w.prompt) {
    console.log('Prompt not available, choose email first, then username, then password, then done.');
  }
  const selector = d.createElement('div');
  selector.style.width = "100px";
  selector.style.height = "100px";
  selector.style.background = "red";
  selector.style.opacity = 0.3;
  selector.style.border = "1px solid red";
  selector.style.position = "absolute";
  selector.style.pointerEvents = "none";
  let password = "";
  let username = "";
  let email = "";
  let container = "";
  d.querySelector('body').appendChild(selector);

  d.addEventListener('mousemove', function(e){
    const target = e.target;
    if(target.classList.contains('subshq-find-field-console-done-console')) return;
    selector.style.width = `${target.offsetWidth}px`;
    selector.style.height = `${target.offsetHeight}px`;
    const rect = target.getBoundingClientRect();
    selector.style.top = `${rect.top}px`;
    selector.style.left = `${rect.left}px`;
  });
  function getUniqueSelector(el) {
    let unique = "";
    if(el.id){
      return `#${el.id}`;
    } else if(el.classList.length && el.getAttribute('class').indexOf("'") === -1) {
      el.classList
      unique = `${el.tagName.toLowerCase()}.${[...el.classList].join(".")}`;
      unique = unique.replace(/\'/g, `\\\\'`);
      if(d.querySelectorAll(unique).length > 1 && el.parentElement) {
        return `${getUniqueSelector(el.parentElement)} ${unique}`;
      }
      return unique;
    } else {
      unique = el.tagName;
      return `${getUniqueSelector(el.parentElement)} ${unique}`;
    }
  }

  function finished() {
    const code = JSON.stringify(
      {
        "login":{
          url: [location.href],
          container,
          email,
          username,
          password
        }
      }
  , null, 2);
    const pre = d.createElement('pre');
    pre.style.position = "absolute";
    pre.style.top = "0";
    pre.style.height = "300px";
    pre.style.right = "0";
    pre.style.left = "0";
    pre.style.background = "#FFF";
    pre.style.zIndex = 2147483649;
    pre.style.fontFamily = "monospace";
    pre.innerText = code;
    pre.classList.add('subshq-find-field-console-done-console');
    d.querySelector("body").prepend(pre);
  }

  d.addEventListener('click', function(e){
    const target = e.target;
    if(target.classList.contains('subshq-find-field-console-done-console')) return;
    let which;
    if(!w.prompt) {
      console.log("Prompt not available. Alternative route!")
      if(email) {
        if(username) {
          if(password) {
            which = "done"
          } else {
            which = "p";
          }
        } else {
          which = "u";
        }
      } else {
        which = "e";
      }
    } else {
      which = w.prompt("U for username field, E for email field, P for password field, \"DONE\" to finish");
    }
    if(which.toLowerCase() === "p") {
      password = getUniqueSelector(target);
      console.log('Password set');
    } else if(which.toLowerCase() === "u") {
      username = getUniqueSelector(target);
      console.log('Username set');
    } else if(which.toLowerCase() === "e") {
      email = getUniqueSelector(target);
      console.log('Email set');
    } else if(which.toLowerCase() === "done") {
      console.log('Done');
      finished();
      return;
    }
    container = getUniqueSelector(target.closest('form').parentElement);
  });
}

subsInit(document, window);
