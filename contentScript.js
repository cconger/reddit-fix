function hydrateDOM() {
  let comments = document.querySelectorAll(".Comment");

  let commentMap = new Map();

  let currentParent = null;
  for (let i = 0; i < comments.length; i++) {
    let currentComment = comments[i];
    if (currentComment.classList.contains("top-level")) {
      currentParent = currentComment;
      commentMap.set(currentParent, [currentParent])

      if (currentComment.querySelector('.chandy-button') === null) {
        let button = document.createElement('div');
        button.classList.add("chandy-button");
        button.innerText = "[-]";
        ((parentComment) => {
          button.addEventListener('click', function() {
            commentsToHide = commentMap.get(parentComment);
            if (parentComment.classList.contains('chandy-hidden')) {
              button.innerText = "[-]";
              commentsToHide.forEach((c) => {
                c.classList.remove('chandy-hidden');
              });
            } else {
              button.innerText = "[+]";
              commentsToHide.forEach((c) => {
                c.classList.add('chandy-hidden');
              });
            }
          });
        })(currentParent)
        currentParent.children[1].children[0].prepend(button);
      }
    } else {
      let collection = commentMap.get(currentParent)
      if (currentParent.classList.contains('chandy-hidden')) {
        currentComment.classList.add('chandy-hidden');
      }
      collection.push(currentComment)
    }
  }
}

// This is really stupid but I don't want to work out how to hook into loads
setInterval(hydrateDOM, 5000);

hydrateDOM();
