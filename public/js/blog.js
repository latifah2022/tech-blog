async function editFormHandler(event) {
    event.preventDefault();

    const userComment = document.querySelector('#blog-comment').value;
    
    const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
  
  
    const response = await fetch(`/api/comment/${id}`, {
      method: 'POST',
      body: JSON.stringify({
        userReview,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    if (response.ok) {
      document.location.replace(`/blog/${id}`);
    } else {
      alert("can't add comment");
    }
  }
  
  document.querySelector('.comment-form').addEventListener('submit', editFormHandler);