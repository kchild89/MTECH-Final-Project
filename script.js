$(document).ready(function () {
    let comments = [];

    function displayComment() {
        const commentsContainer = $('.comments-container');
        commentsContainer.empty();
        comments.forEach((comment, index) => {
            const commentElement = $(`
                <div class="comment">
                <img src="Images/profile-pic.png" class="profile-pic" alt="Profile Picture">
                <div class="comment-content">
                    <p><strong>${comment.displayName}</strong></p>
                    <p class="comment-text">${comment.text}</p>
                    <div class="comment-edit-delete">
                        <button class="edit-comment" data-index="${index}">Edit</button>
                        <button class="delete-comment" data-index="${index}">Delete</button>
                    </div>
                </div>
            `);
            commentsContainer.prepend(commentElement);
        });
    }

    function addComment(displayName, text) {
        comments.push({ displayName, text });
        displayComment();
    }

    function deleteComment(index) {
        comments.splice(index, 1);
        displayComment();
    }

    function editComment(index, newText) {
        comments[index].text = newText;
        displayComment();
    }

    $('#submitComment').on('click', function () {
        const displayName = $('#displayName').val();
        const comment = $('#comment').val();
        if (displayName && comment) {
            addComment(displayName, comment);
            $('#displayName').val('');
            $('#comment').val('');
        }
    });

    $(document).on('click', '.delete-comment', function () {
        const index = $(this).data('index');
        deleteComment(index);
    });

    $(document).on('click', '.edit-comment', function () {
        const index = $(this).data('index');
        const commentText = $('.comment-text', $(this).parents('.comment')).text();
        const newText = prompt('Edit comment:', commentText);
        if (newText !== null) {
            editComment(index, newText);
        }
    });
});