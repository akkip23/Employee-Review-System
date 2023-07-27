//get ul class of static toster message
const notifications = document.querySelector(".notifications");

//object to show message based on user messages
const toastDetails = {
  timer: 5000,
  success: {
    icon: "fa-circle-check",
  },
  error: {
    icon: "fa-circle-xmark",
  },
  warning: {
    icon: "fa-triangle-exclamation",
  },
  info: {
    icon: "fa-circle-info",
  },
  random: {
    icon: "fa-solid fa-star",
  },
};

//remove toast after setTimeout
const removeToast = (toast) => {
  toast.classList.add("hide");
  if (toast.timeoutId) clearTimeout(toast.timeoutId);
  setTimeout(() => toast.remove(), 300);
};

//assign toast messages used for static updates for Ajax call, etc on user task
const createToast = (id, message) => {
  console.log(id, message);
  const { icon } = toastDetails[id];
  const toast = document.createElement("li");
  toast.className = `toast ${id}`;
  toast.innerHTML = `<div class="column">
                         <i class="fa-solid ${icon}"></i>
                         <span>${message}</span>
                      </div>
                      <i class="fa-solid fa-xmark" onclick="removeToast(this.parentElement)"></i>`;
  notifications.appendChild(toast);
  toast.timeoutId = setTimeout(() => removeToast(toast), toastDetails.timer);
};

// buttons.forEach((btn) => {
//   btn.addEventListener("click", () => createToast(btn.id))
// })
