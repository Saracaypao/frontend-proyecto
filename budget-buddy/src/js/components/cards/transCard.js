function updateTransactionCard(transaction) {
  const card = document.querySelector("#transaction-card");
  const commentSection = document.querySelector("#transaction-comments");
  if (!card || !commentSection) return;

  const isPublic = transaction.type === "Public";

  // render transaction details in the card
  card.innerHTML = `
    <div class="px-4 py-4 sm:pl-6 sm:pr-4">
      <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h3 class="text-2xl font-semibold text-gray-800 dark:text-white/90">
          ${transaction.tittle}
        </h3>
        <span class="text-sm text-gray-400">Username</span>
      </div>
    </div>
    <div class="border-t border-gray-100 p-4 dark:border-gray-800 sm:p-6 py-4">
      <h4 class="text-xl font-semibold text-gray-800 dark:text-white py-4">
        ${transaction.description}
      </h4>
      <p class="text-3xl font-bold text-gray-900 dark:text-white mt-2">
        ${transaction.amount || "$0.00"}
      </p>
      <div class="grid grid-cols-2 gap-6 mt-6 py-4">
        <div>
          <p class="text-sm text-gray-500 dark:text-gray-400">Date</p>
          <p class="text-base text-gray-800 dark:text-white">${transaction.date}</p>
        </div>
        <div class="text-right">
          <p class="text-sm text-gray-500 dark:text-gray-400">Category</p>
          <p class="text-base text-gray-800 dark:text-white">${transaction.category || "N/A"}</p>
        </div>
      </div>
      <div mt-2>
        <p class="text-sm text-gray-500 dark:text-gray-400">Type</p>
        <p class="text-base text-gray-800 dark:text-white">${transaction.type || "N/A"}</p>
      </div>
    </div>
  `;

  // renderCommentSection outside the card (commentSection, isPublic);
  if (isPublic) {
    commentSection.innerHTML = `
      <div class="mt-4">
        <h4 class="text-lg font-semibold text-gray-800 dark:text-white mb-2">Comments</h4>
        <div id="comment-list" class="w-4/5 flex flex-col gap-2 mb-4">
          <!-- injecting comments -->
        </div>
        <div class="flex flex-col items-start gap-2">
        <textarea
          id="comment-input"
          placeholder="Write a comment..."
          rows="2"
          class="w-2/3 border border-gray-300 rounded-lg p-2 text-sm dark:bg-gray-800 dark:text-white dark:border-gray-700"
        ></textarea>
        <button
          id="submit-comment"
          class="mt-2 inline-block px-4 py-2 rounded-lg bg-[#465fff] text-sm font-medium text-white hover:bg-[#3a52d4]"
        >
          Post Comment
        </button>
        </div>
      </div>
    `;

    const commentInput = document.getElementById("comment-input");
    const submitBtn = document.getElementById("submit-comment");
    const commentList = document.getElementById("comment-list");

    submitBtn.addEventListener("click", () => {
      const text = commentInput.value.trim();
      if (!text) return;

      const commentElement = document.createElement("div");
      commentElement.className = "bg-gray-100 dark:bg-gray-700 rounded-lg p-2 text-sm text-gray-800 dark:text-white";
      commentElement.textContent = text;

      commentList.appendChild(commentElement);
      commentInput.value = "";
    });

  } else {
    commentSection.innerHTML = ""; // only show comments for public transactions
  }
}

// export for the global scope
window.updateTransactionCard = updateTransactionCard;
