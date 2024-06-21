const data = {
  currentUser: {
    image: {
      png: "./assets/images/avatars/image-juliusomo.png",
      webp: "./images/avatars/image-juliusomo.webp",
    },
    username: "juliusomo",
  },
  comments: [
    {
      parent: 0,
      id: 1,
      content:
        "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
      createdAt: "1 month ago",
      score: 12,
      user: {
        image: {
          png: "./assets/images/avatars/image-amyrobson.png",
          webp: "./images/avatars/image-amyrobson.webp",
        },
        username: "amyrobson",
      },
      replies: [],
    },
    {
      parent: 0,
      id: 2,
      content:
        "Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
      createdAt: "2 weeks ago",
      score: 5,
      user: {
        image: {
          png: "./assets/images/avatars/image-maxblagun.png",
          webp: "./images/avatars/image-maxblagun.webp",
        },
        username: "maxblagun",
      },
      replies: [
        {
          parent: 2,
          id: 1,
          content:
            "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
          createdAt: "1 week ago",
          score: 4,
          replyingTo: "maxblagun",
          user: {
            image: {
              png: "./assets/images/avatars/image-ramsesmiron.png",
              webp: "./images/avatars/image-ramsesmiron.webp",
            },
            username: "ramsesmiron",
          },
        },
      ],
    },
  ],
};

const { currentUser } = data;
const commentContainer = document.querySelector(".comment-container");
const modalContainer = document.querySelector(".modal-container");
const mainContainer = document.querySelector(".container");

let commentTemplate;
let replyTemplate;
const showInitComment = () => {
  // console.log(data.comments);
  data.comments.forEach((comment) => {
    console.log(comment);
    commentTemplate = document
      .getElementById("comment-template")
      .content.cloneNode(true);

    commentTemplate.querySelector(".comment-body").textContent =
      comment.content;
    commentTemplate.querySelector(".username").textContent =
      comment.user.username;
    commentTemplate.querySelector(".user-image").src = comment.user.image.png;
    commentTemplate.querySelector(".comment-date").textContent =
      comment.createdAt;
    commentTemplate.querySelector(".score").textContent = comment.score;
    const replyInputContainer = commentTemplate.querySelector(
      ".reply-input-container"
    );
    const replyInput = replyInputContainer.querySelector(".reply-input");
    const sendReplyBtns =
      replyInputContainer.querySelectorAll(".send-reply-btn");
    const repliesContainer = commentTemplate.querySelector(".reply-container");
    const minusIcons = commentTemplate.querySelectorAll(".minus");
    const plusIcons = commentTemplate.querySelectorAll(".plus");
    const scoreElement = commentTemplate.querySelector(".score");
    const replyBtns = commentTemplate.querySelectorAll(".reply-btn");

    replyBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        document
          .querySelectorAll(".reply-input-container")
          .forEach((container) => {
            if (container !== replyInputContainer) {
              container.classList.add("hide");
            }
          });
        replyInputContainer.classList.toggle("hide");
      });
    });

    // replyInput.value = "@" + comment.user.username;
    sendReplyBtns.forEach((sendReplyBtn) => {
      sendReplyBtn.addEventListener("click", addReply);
      function addReply() {
        const replyText = replyInput.value.trim();
        if (replyText) {
          const reply = {
            id: comment.replies.length + 1,
            content: " " + replyText,
            createdAt: getTime(),
            replyingTo: comment.user.username,
            score: 1,
            user: currentUser,
          };

          comment.replies.push(reply);
          comment.replies;
          renderNewComment(reply, repliesContainer);
        }
        replyInput.value = "@" + comment.user.username;
        replyInputContainer.classList.add("hide");
      }
    });

    plusIcons.forEach((plusIcon) => {
      plusIcon.addEventListener("click", () => {
        comment.score++;
        scoreElement.textContent = comment.score;
      });
    });
    minusIcons.forEach((minusIcon) => {
      minusIcon.addEventListener("click", () => {
        if (comment.score > 0) {
          comment.score--;
          scoreElement.textContent = comment.score;
        }
      });
    });
    commentContainer.appendChild(commentTemplate);

    if (comment.replies.length === 0 || comment.replies.length > 0) {
      comment.replies.forEach((reply) => {
        reply;
        replyTemplate = document
          .getElementById("reply-template")
          .content.cloneNode(true);
        replyTemplate.querySelector(".reply-body").textContent =
          "@" + reply.replyingTo + " " + reply.content;
        replyTemplate.querySelector(".score").textContent = reply.score;
        replyTemplate.querySelector(".reply-date").textContent =
          reply.createdAt;
        replyTemplate.querySelector(".username").textContent =
          reply.user.username;
        replyTemplate.querySelector(".userImage").src = reply.user.image.png;
        const replyBtns = replyTemplate.querySelectorAll(".reply-btn");
        const plusBtns = replyTemplate.querySelectorAll(".plus");
        const minusBtns = replyTemplate.querySelectorAll(".minus");
        const score = replyTemplate.querySelector(".score");
        const subReplyInputContainer = replyTemplate.querySelector(
          ".reply-input-container"
        );
        const subReplyInput =
          subReplyInputContainer.querySelector(".reply-input");
        const subRepliesContainer =
          replyTemplate.querySelector(".reply-container");
        const sendSubReplyBtns =
          replyTemplate.querySelectorAll(".send-reply-btn");

        plusBtns.forEach((plusBtn) => {
          plusBtn.addEventListener("click", () => {
            reply.score++;
            score.textContent = reply.score;
          });
        });
        minusBtns.forEach((minusBtn) => {
          minusBtn.addEventListener("click", () => {
            if (reply.score > 0) {
              reply.score--;
              score.textContent = reply.score;
            }
          });
        });

        replyBtns.forEach((btn) => {
          btn.addEventListener("click", () => {
            document
              .querySelectorAll(".reply-input-container")
              .forEach((container) => {
                if (container !== subReplyInputContainer) {
                  container.classList.add("hide");
                }
              });
            subReplyInputContainer.classList.toggle("hide");
            reply.id;
          });
        });

        subReplyInput.value = "@" + reply.user.username;
        sendSubReplyBtns.forEach((sendSubReplyBtn) => {
          sendSubReplyBtn.addEventListener("click", addSubReply);
          function addSubReply() {
            const subReplyText = subReplyInput.value.trim();
            if (subReplyText) {
              const subReply = {
                id: comment.replies.length + 1,
                content: " " + subReplyText,
                createdAt: getTime(),
                replyingTo: reply.user.username,
                score: 0,
                replies: [],
                user: currentUser,
              };

              comment.replies.push(subReply);
              renderNewComment(subReply, subRepliesContainer);
            }
            subReplyInput.value = "@" + reply.user.username;
            subReplyInputContainer.classList.add("hide");
          }
        });

        repliesContainer;
        if (repliesContainer) {
          repliesContainer.appendChild(replyTemplate);
        }
      });
    }
  });
};

const commentText = document.querySelector(".comment-text");
const sendBtn = document.querySelector(".send-btn");
sendBtn.addEventListener("click", addComment);
function addComment() {
  const newComment = commentText.value.trim();
  if (newComment) {
    commentText.value;
    const nComment = {
      id: data.comments.length + 1,
      content: newComment,
      createdAt: getTime(),
      score: 1,
      replies: [],
      user: currentUser,
    };

    data.comments.push(nComment);
    console.log(data.comments);
    renderNewComment(nComment, commentContainer);
  }
  commentText.value = "";
}
const getTime = () => {
  const date = new Date();
  const options = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  return date.toLocaleTimeString(undefined, options);
};

const renderNewComment = (reply, container) => {
  const replyTemplate = document
    .getElementById("reply-template-2")
    .content.cloneNode(true);
  const commentBody = replyTemplate.querySelector(".reply-body");
  commentBody.textContent = reply.content;
  replyTemplate.querySelector(".reply-date").textContent = reply.createdAt;
  replyTemplate.querySelector(".score").textContent = reply.score;
  replyTemplate.querySelector(".username").textContent = reply.user.username;
  const deleteBtns = replyTemplate.querySelectorAll(".delete-btn");
  const plusBtns = replyTemplate.querySelectorAll(".plus");
  const minusBtns = replyTemplate.querySelectorAll(".minus");
  const score = replyTemplate.querySelector(".score");
  const editBtns = replyTemplate.querySelectorAll(".edit-btn");
  const updateBtns = replyTemplate.querySelectorAll(".update-btn");
  const editInputContainer = replyTemplate.querySelector(
    ".edit-input-container"
  );
  const inputContent = editInputContainer.querySelector(".reply-input");

  plusBtns.forEach((plusBtn) => {
    plusBtn.addEventListener("click", () => {
      reply.score++;
      score.textContent = reply.score;
      reply.score;
    });
  });
  minusBtns.forEach((minusBtn) => {
    minusBtn.addEventListener("click", () => {
      if (reply.score > 0) {
        reply.score--;
        score.textContent = reply.score;
      }
    });
  });
  editBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      commentBody.classList.add("hide");
      document
        .querySelectorAll(".edit-input-container")
        .forEach((container) => {
          if (container !== editInputContainer) {
            container.classList.add("hide");
          }
        });
      editInputContainer.classList.remove("hide");
      inputContent.value = reply.content;
    });
  });

  updateBtns.forEach((updateBtn) => {
    updateBtn.addEventListener("click", () => {
      const updatedContent = inputContent.value.trim();
      if (updatedContent) {
        const commentIndex = data.comments.findIndex((c) => c.id === reply.id);
        if (commentIndex !== -1) {
          const replyIndex = data.comments[commentIndex].replies.findIndex(
            (_reply) => _reply.id === reply.id
          );
          replyIndex;

          if (replyIndex !== -1) {
            data.comments[commentIndex].replies[replyIndex].content =
              updatedContent;
            commentBody.textContent = updatedContent;
          } else {
            data.comments[commentIndex].content = updatedContent;
            commentBody.textContent = updatedContent;
          }

          editInputContainer.classList.add("hide");
          commentBody.classList.remove("hide");
        }
      }
    });
  });

  const commentDiv = document.createElement("div");
  commentDiv.appendChild(replyTemplate);
  deleteBtns.forEach((deleteBtn) => {
    deleteBtn.addEventListener("click", () => {
      modalContainer.classList.remove("hide");
      modalContainer.querySelector(".ok-btn").addEventListener("click", () => {
        const commentIndex = data.comments.findIndex((c) => c.id === reply.id);
        if (commentIndex !== -1) {
          const replyIndex = data.comments[commentIndex].replies.findIndex(
            (x) => reply.id === x.id
          );
          data.comments[commentIndex].replies;

          if (replyIndex !== -1) {
            data.comments[commentIndex].replies.splice(replyIndex, 1);
          }
          if (data.comments[commentIndex].replies.length === 0) {
            data.comments.splice(commentIndex, 1);
          }
        }

        commentDiv.remove();
        modalContainer.classList.add("hide");
      });
      modalContainer
        .querySelector(".cancel-btn")
        .addEventListener("click", () => {
          modalContainer.classList.add("hide");
        });
    });
  });

  container.appendChild(commentDiv);
};

// const saveToLocalStorage = () => {
//   localStorage.setItem("commentsData", JSON.stringify(data.comments));
// };
// const loadFromLocalStorage = () => {
//   const storedComments = localStorage.getItem("commentsData");
//   console.log(storedComments);
//   if (storedComments) {
//     data.comments = JSON.parse(storedComments);
//   }
// };

document.addEventListener("DOMContentLoaded", () => {
  // loadFromLocalStorage();
  showInitComment();
});
